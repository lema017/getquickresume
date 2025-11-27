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