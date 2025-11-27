#!/bin/bash

# Script to kill any running API processes and start the API in debug mode
# Usage: ./start-debug.sh

echo "🚀 Starting GetQuickResume API Debug Mode"
echo "========================================"

# Change to API directory
cd "$(dirname "$0")/api" || {
    echo "❌ Error: Could not find api directory"
    exit 1
}

echo "📁 Working directory: $(pwd)"

# Function to kill processes
kill_processes() {
    echo "🛑 Stopping any running API processes..."
    
    # Kill serverless offline processes
    if pgrep -f "serverless offline" > /dev/null; then
        echo "   Killing serverless offline processes..."
        pkill -f "serverless offline"
        sleep 2
    fi
    
    # Kill any processes using port 3001 (API Gateway)
    if lsof -i :3001 > /dev/null 2>&1; then
        echo "   Killing processes on port 3001..."
        lsof -ti :3001 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
    
    # Kill any processes using port 3002 (Lambda)
    if lsof -i :3002 > /dev/null 2>&1; then
        echo "   Killing processes on port 3002..."
        lsof -ti :3002 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
    
    # Kill any processes using port 9229 (Debug)
    if lsof -i :9229 > /dev/null 2>&1; then
        echo "   Killing processes on port 9229..."
        lsof -ti :9229 | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
    
    echo "✅ All API processes stopped"
}

# Function to check if DynamoDB Local is running
check_dynamodb() {
    echo "🔍 Checking DynamoDB Local..."
    
    if ! docker ps | grep -q "dynamodb-local"; then
        echo "⚠️  DynamoDB Local not running. Starting it..."
        docker run -d \
            --name dynamodb-local \
            -p 8000:8000 \
            amazon/dynamodb-local \
            -jar DynamoDBLocal.jar -sharedDb -inMemory
        
        if [ $? -eq 0 ]; then
            echo "✅ DynamoDB Local started successfully"
            sleep 3
        else
            echo "❌ Failed to start DynamoDB Local"
            echo "   Please ensure Docker is running and try again"
            exit 1
        fi
    else
        echo "✅ DynamoDB Local is already running"
    fi
}

# Function to create tables if needed
create_tables() {
    echo "🏗️  Setting up DynamoDB tables..."
    
    DYNAMODB_ENDPOINT=http://localhost:8000 \
    STAGE=dev \
    REGION=us-east-1 \
    DYNAMODB_TABLE=getquickresume-api-users-dev \
    node scripts/create-tables.js
    
    if [ $? -eq 0 ]; then
        echo "✅ DynamoDB tables ready"
    else
        echo "⚠️  Warning: Table creation had issues, but continuing..."
    fi
}

# Function to start API in debug mode
start_api() {
    echo "🚀 Starting API in debug mode..."
    echo "   Debug port: 9229"
    echo "   API Gateway: http://localhost:3001"
    echo "   Lambda: http://localhost:3002"
    echo ""
    echo "💡 To attach debugger:"
    echo "   1. Press F5 in VS Code/Cursor"
    echo "   2. Select 'Attach to Serverless Offline'"
    echo "   3. Set breakpoints in api/src/handlers/auth.ts"
    echo ""
    echo "🧪 Test endpoints:"
    echo "   curl -X GET http://localhost:3001/dev/api/auth/validate"
    echo "   curl -X POST http://localhost:3001/dev/api/auth/google -H 'Content-Type: application/json' -d '{\"token\": \"test\"}'"
    echo ""
    echo "Press Ctrl+C to stop the API"
    echo "========================================"
    
    # Start the API in debug mode
    npm run offline:debug
}

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    kill_processes
    echo "✅ Cleanup complete"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Main execution
main() {
    # Kill any running processes
    kill_processes
    
    # Check and start DynamoDB if needed
    check_dynamodb
    
    # Create tables
    create_tables
    
    # Start API in debug mode
    start_api
}

# Run main function
main
