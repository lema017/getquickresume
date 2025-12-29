#!/bin/bash

# Script para iniciar tanto el frontend como el backend en desarrollo

echo "🚀 Iniciando GetQuickResume en modo desarrollo..."

# Función para matar procesos en puertos específicos
kill_port() {
    local port=$1
    local service_name=$2
    
    echo "🔍 Verificando puerto $port para $service_name..."
    
    # Buscar procesos usando el puerto (múltiples métodos)
    local pids=$(lsof -ti:$port 2>/dev/null)
    
    # Si lsof no encuentra nada, intentar con netstat (macOS/Linux)
    if [ -z "$pids" ]; then
        pids=$(netstat -anv 2>/dev/null | grep ":$port " | awk '{print $9}' | sort -u | grep -v "^$" || true)
    fi
    
    # Si aún no hay PIDs, intentar con fuser (Linux)
    if [ -z "$pids" ] && command -v fuser &> /dev/null; then
        pids=$(fuser $port/tcp 2>/dev/null | awk '{print $1}' || true)
    fi
    
    if [ ! -z "$pids" ]; then
        echo "⚠️  Encontrados procesos en puerto $port: $pids"
        echo "🛑 Matando procesos anteriores en puerto $port..."
        
        # Matar cada proceso individualmente para mejor control
        for pid in $pids; do
            if kill -0 $pid 2>/dev/null; then
                echo "   Matando proceso $pid..."
                kill -TERM $pid 2>/dev/null || true
            fi
        done
        
        # Esperar un momento para que los procesos terminen gracefully
        sleep 2
        
        # Verificar si aún hay procesos y forzar cierre si es necesario
        local remaining_pids=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$remaining_pids" ]; then
            echo "⚠️  Algunos procesos persisten, forzando cierre..."
            for pid in $remaining_pids; do
                if kill -0 $pid 2>/dev/null; then
                    echo "   Forzando cierre del proceso $pid..."
                    kill -9 $pid 2>/dev/null || true
                fi
            done
            sleep 1
        fi
        
        # Verificación final
        local final_check=$(lsof -ti:$port 2>/dev/null)
        if [ ! -z "$final_check" ]; then
            echo "❌ Advertencia: Algunos procesos aún están usando el puerto $port"
            echo "   PIDs restantes: $final_check"
            echo "   Puede que necesites matarlos manualmente: kill -9 $final_check"
        else
            echo "✅ Puerto $port liberado completamente"
        fi
    else
        echo "✅ Puerto $port está disponible"
    fi
}

# Función para matar procesos de Node.js específicos
kill_node_processes() {
    echo "🔍 Buscando procesos de Node.js relacionados..."
    
    # Matar procesos de Vite (frontend)
    local vite_pids=$(pgrep -f "vite" 2>/dev/null)
    if [ ! -z "$vite_pids" ]; then
        echo "🛑 Matando procesos de Vite: $vite_pids"
        kill -9 $vite_pids 2>/dev/null
    fi
    
    # Matar procesos de serverless (backend)
    local serverless_pids=$(pgrep -f "serverless" 2>/dev/null)
    if [ ! -z "$serverless_pids" ]; then
        echo "🛑 Matando procesos de Serverless: $serverless_pids"
        kill -9 $serverless_pids 2>/dev/null
    fi
    
    # Matar procesos de npm run dev
    local npm_dev_pids=$(pgrep -f "npm run dev" 2>/dev/null)
    if [ ! -z "$npm_dev_pids" ]; then
        echo "🛑 Matando procesos de npm run dev: $npm_dev_pids"
        kill -9 $npm_dev_pids 2>/dev/null
    fi
    
    sleep 2
}

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    
    # Matar procesos específicos si existen
    if [ ! -z "$FRONTEND_PID" ]; then
        kill -9 $FRONTEND_PID 2>/dev/null
    fi
    if [ ! -z "$BACKEND_PID" ]; then
        kill -9 $BACKEND_PID 2>/dev/null
    fi
    
    # Liberar puertos
    kill_port 3000 "Frontend"
    kill_port 3001 "Backend API Gateway"
    kill_port 3002 "Backend Lambda"
    
    echo "✅ Servicios detenidos"
    exit
}

# Función para obtener parámetros SSM de AWS
fetch_ssm_parameter() {
    local param_name=$1
    local param_path="/getquickresume/dev/$param_name"
    local region="us-east-1"
    
    # Intentar obtener el parámetro
    local value=$(aws ssm get-parameter \
        --name "$param_path" \
        --region "$region" \
        --with-decryption \
        --query 'Parameter.Value' \
        --output text 2>/dev/null)
    
    if [ $? -eq 0 ] && [ ! -z "$value" ]; then
        echo "$value"
        return 0
    else
        echo ""
        return 1
    fi
}

# Función para crear archivo .env para frontend
create_frontend_env() {
    echo ""
    echo "📝 Configurando variables de entorno del frontend..."
    
    # Verificar que AWS CLI esté disponible
    if ! command -v aws &> /dev/null; then
        echo "⚠️  AWS CLI no está instalado o no está en PATH"
        echo "   No se pueden obtener parámetros SSM automáticamente"
        echo "   Por favor, crea manualmente el archivo .env con las siguientes variables:"
        echo "   - VITE_API_URL=http://localhost:3001/dev"
        echo "   - VITE_GOOGLE_CLIENT_ID=<tu-google-client-id>"
        echo "   - VITE_LINKEDIN_CLIENT_ID=<tu-linkedin-client-id>"
        echo "   - VITE_PADDLE_CLIENT_TOKEN=<tu-paddle-client-token>"
        echo "   - VITE_PADDLE_ENVIRONMENT=<sandbox|production>"
        echo ""
        return 1
    fi
    
    # Verificar credenciales de AWS
    if ! aws sts get-caller-identity &> /dev/null; then
        echo "⚠️  No se pueden verificar las credenciales de AWS"
        echo "   Ejecuta 'aws configure' o configura las variables de entorno de AWS"
        echo "   Continuando sin crear .env automáticamente..."
        echo ""
        return 1
    fi
    
    # Obtener parámetros de SSM
    echo "🔐 Obteniendo parámetros de AWS SSM..."
    
    local google_client_id=$(fetch_ssm_parameter "google-client-id")
    local linkedin_client_id=$(fetch_ssm_parameter "linkedin-client-id")
    local paddle_client_token=$(fetch_ssm_parameter "paddle-client-token")
    local paddle_environment=$(fetch_ssm_parameter "paddle-environment")
    
    # Validar parámetros críticos
    local has_errors=false
    
    if [ -z "$google_client_id" ]; then
        echo "❌ Error: No se pudo obtener GOOGLE_CLIENT_ID de SSM"
        echo "   Parámetro: /getquickresume/dev/google-client-id"
        has_errors=true
    fi
    
    if [ -z "$linkedin_client_id" ]; then
        echo "⚠️  Advertencia: No se pudo obtener LINKEDIN_CLIENT_ID de SSM"
        echo "   Parámetro: /getquickresume/dev/linkedin-client-id"
        echo "   Continuando sin este parámetro..."
    fi
    
    if [ -z "$paddle_environment" ]; then
        echo "⚠️  Advertencia: No se pudo obtener PADDLE_ENVIRONMENT de SSM"
        echo "   Parámetro: /getquickresume/dev/paddle-environment"
        echo "   Usando valor por defecto: sandbox"
        paddle_environment="sandbox"
    fi
    
    if [ "$has_errors" = true ]; then
        echo ""
        echo "❌ No se pudo crear el archivo .env debido a errores críticos"
        echo "   Por favor, verifica que los parámetros SSM existan en AWS"
        echo "   o crea el archivo .env manualmente"
        echo ""
        return 1
    fi
    
    # Crear archivo .env
    local env_file=".env"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    cat > "$env_file" << EOF
# Auto-generated by start-dev.sh - DO NOT EDIT MANUALLY
# Generated at: $timestamp
# This file is excluded from git (.gitignore)

VITE_API_URL=http://localhost:3001/dev
VITE_GOOGLE_CLIENT_ID=$google_client_id
EOF

    # Agregar parámetros opcionales si existen
    if [ ! -z "$linkedin_client_id" ]; then
        echo "VITE_LINKEDIN_CLIENT_ID=$linkedin_client_id" >> "$env_file"
    fi
    
    if [ ! -z "$paddle_client_token" ]; then
        echo "VITE_PADDLE_CLIENT_TOKEN=$paddle_client_token" >> "$env_file"
    fi
    
    echo "VITE_PADDLE_ENVIRONMENT=$paddle_environment" >> "$env_file"
    
    echo "✅ Archivo .env creado exitosamente"
    echo "   Ubicación: $(pwd)/$env_file"
    echo ""
    
    return 0
}

# Capturar Ctrl+C para limpiar procesos
trap cleanup SIGINT

echo "🧹 Limpiando procesos anteriores..."

# Matar procesos de Node.js relacionados
kill_node_processes

# Liberar puertos específicos necesarios para el desarrollo
echo ""
echo "🔌 Liberando puertos necesarios..."
kill_port 3000 "Frontend (Vite)"
kill_port 3001 "Backend API (Serverless Offline - API Gateway)"
kill_port 3002 "Backend API (Serverless Offline - Lambda)"

# Verificar que los puertos estén realmente libres antes de continuar
echo ""
echo "🔍 Verificación final de puertos..."
port_3000_free=true
port_3001_free=true
port_3002_free=true

if lsof -ti:3000 > /dev/null 2>&1; then
    echo "❌ Puerto 3000 aún está en uso"
    port_3000_free=false
fi

if lsof -ti:3001 > /dev/null 2>&1; then
    echo "❌ Puerto 3001 aún está en uso"
    port_3001_free=false
fi

if lsof -ti:3002 > /dev/null 2>&1; then
    echo "❌ Puerto 3002 aún está en uso"
    port_3002_free=false
fi

if [ "$port_3000_free" = false ] || [ "$port_3001_free" = false ] || [ "$port_3002_free" = false ]; then
    echo ""
    echo "⚠️  Advertencia: Algunos puertos aún están en uso."
    echo "   Puedes continuar, pero puede haber conflictos."
    echo "   Presiona Enter para continuar o Ctrl+C para cancelar..."
    read -r
fi

echo ""

# Crear archivo .env para frontend con variables de SSM
create_frontend_env

# Si falló la creación del .env pero no es crítico, continuar con advertencia
if [ $? -ne 0 ]; then
    echo "⚠️  Continuando sin archivo .env automático"
    echo "   Asegúrate de tener las variables de entorno configuradas manualmente"
    echo ""
fi

echo ""
echo "📡 Iniciando API backend en puerto 3001..."

# Verificar que el directorio api existe
if [ ! -d "api" ]; then
    echo "❌ Error: Directorio 'api' no encontrado"
    exit 1
fi

# Cambiar al directorio del API y construir
cd api

# Construir el API antes de iniciar
echo "🔨 Construyendo API..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error al construir el API"
    exit 1
fi

echo "✅ API construido exitosamente"

# Iniciar backend en background
npm run dev &
BACKEND_PID=$!

# Esperar un poco para que el backend se inicie
echo "⏳ Esperando que el backend se inicie..."
sleep 8

# Verificar que el backend esté funcionando
if ! curl -s http://localhost:3001/dev/health > /dev/null 2>&1; then
    echo "⚠️  Backend no responde, pero continuando..."
fi

echo "🌐 Iniciando frontend en puerto 3000..."

# Cambiar al directorio raíz y iniciar frontend
cd /Users/home/Development/getquickresume

# Verificar que el directorio existe
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json no encontrado en el directorio raíz"
    exit 1
fi

# Iniciar frontend en background
npm run dev -- --port 3000 &
FRONTEND_PID=$!

# Esperar un poco para que el frontend se inicie
echo "⏳ Esperando que el frontend se inicie..."
sleep 5

echo ""
echo "✅ Servicios iniciados:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:3001"
echo ""
echo "📊 Estado de los puertos:"
echo "   Puerto 3000: $(lsof -ti:3000 > /dev/null 2>&1 && echo "✅ En uso" || echo "❌ Libre")"
echo "   Puerto 3001: $(lsof -ti:3001 > /dev/null 2>&1 && echo "✅ En uso" || echo "❌ Libre")"
echo "   Puerto 3002: $(lsof -ti:3002 > /dev/null 2>&1 && echo "✅ En uso" || echo "❌ Libre")"
echo ""
echo "Presiona Ctrl+C para detener ambos servicios"

# Función para monitorear procesos
monitor_processes() {
    while true; do
        # Verificar si el frontend sigue corriendo
        if ! kill -0 $FRONTEND_PID 2>/dev/null; then
            echo "❌ Frontend se detuvo inesperadamente"
            cleanup
        fi
        
        # Verificar si el backend sigue corriendo
        if ! kill -0 $BACKEND_PID 2>/dev/null; then
            echo "❌ Backend se detuvo inesperadamente"
            cleanup
        fi
        
        sleep 5
    done
}

# Iniciar monitoreo en background
monitor_processes &
MONITOR_PID=$!

# Esperar a que ambos procesos terminen
wait $FRONTEND_PID $BACKEND_PID

# Limpiar proceso de monitoreo
kill $MONITOR_PID 2>/dev/null