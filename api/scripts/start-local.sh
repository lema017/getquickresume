#!/bin/bash

# Script to start DynamoDB local and the API together
# Make sure to run: chmod +x scripts/start-local.sh

echo "🚀 Starting GetQuickResume API Local Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start DynamoDB Local
echo "📦 Starting DynamoDB Local..."
docker run -d \
  --name dynamodb-local \
  -p 8000:8000 \
  amazon/dynamodb-local \
  -jar DynamoDBLocal.jar -sharedDb -inMemory

# Wait for DynamoDB to be ready
echo "⏳ Waiting for DynamoDB Local to be ready..."
sleep 5

# Create tables
echo "🏗️  Creating DynamoDB tables..."
DYNAMODB_ENDPOINT=http://localhost:8000 STAGE=dev REGION=us-east-1 DYNAMODB_TABLE=getquickresume-api-users-dev node scripts/create-tables.js

# Start the API
echo "🚀 Starting Serverless Offline..."
npm run dev

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    docker stop dynamodb-local
    docker rm dynamodb-local
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Keep script running
wait
