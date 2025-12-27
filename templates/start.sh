#!/bin/bash

# Start script for template generator application

# Parse environment argument (default to dev)
ENV=${1:-dev}

# Validate environment argument
if [ "$ENV" != "dev" ] && [ "$ENV" != "prod" ]; then
  echo "ERROR: Invalid environment argument. Use 'dev' or 'prod'"
  echo "Usage: ./start.sh [dev|prod]"
  exit 1
fi

# Set API base URL based on environment
if [ "$ENV" = "dev" ]; then
  VITE_API_BASE_URL="http://localhost:3001/dev"
  echo "Environment: DEV (using local API)"
else
  VITE_API_BASE_URL="https://api.getquickresume.com"
  echo "Environment: PROD (using production API)"
fi

# Export the variable so it's available to child processes
export VITE_API_BASE_URL

echo "Starting Template Generator Application..."

# First, stop any existing processes
echo "Cleaning up existing processes..."
./stop.sh > /dev/null 2>&1

# Kill any processes on the required ports
echo "Freeing ports 4000 and 5173..."
lsof -ti:4000 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Wait a moment for ports to be released
sleep 2

# Verify ports are free
if lsof -ti:4000 > /dev/null 2>&1; then
  echo "ERROR: Port 4000 is still in use. Please manually kill the process."
  exit 1
fi

if lsof -ti:5173 > /dev/null 2>&1; then
  echo "ERROR: Port 5173 is still in use. Please manually kill the process."
  exit 1
fi

# Check if .env file exists in server directory
if [ ! -f "server/.env" ]; then
  echo "Creating .env file for server..."
  echo "CLAUDE_API_KEY=your_api_key_here" > server/.env
  echo "PORT=4000" >> server/.env
  echo "CORS_ORIGIN=http://localhost:5173" >> server/.env
  echo "Please update server/.env with your Claude API key"
fi

# Install dependencies if node_modules don't exist
if [ ! -d "server/node_modules" ]; then
  echo "Installing server dependencies..."
  cd server && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
  echo "Installing frontend dependencies..."
  cd frontend && npm install && cd ..
fi

# Start server in background on port 4000
echo "Starting server on port 4000..."
cd server
PORT=4000 npm run dev > ../server.log 2>&1 &
SERVER_PID=$!
cd ..

# Wait a bit for server to start
sleep 3

# Verify server started
if ! ps -p $SERVER_PID > /dev/null 2>&1; then
  echo "ERROR: Server failed to start. Check server.log for details."
  exit 1
fi

# Check if server is listening on port 4000
if ! lsof -ti:4000 > /dev/null 2>&1; then
  echo "WARNING: Server process started but not listening on port 4000 yet..."
  sleep 2
  if ! lsof -ti:4000 > /dev/null 2>&1; then
    echo "ERROR: Server is not listening on port 4000. Check server.log for details."
    kill $SERVER_PID 2>/dev/null || true
    exit 1
  fi
fi

# Start frontend in background on port 5173
echo "Starting frontend on port 5173..."
echo "API Base URL: $VITE_API_BASE_URL"
cd frontend
VITE_API_BASE_URL=$VITE_API_BASE_URL npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a bit for frontend to start
sleep 3

# Verify frontend started
if ! ps -p $FRONTEND_PID > /dev/null 2>&1; then
  echo "ERROR: Frontend failed to start. Check frontend.log for details."
  kill $SERVER_PID 2>/dev/null || true
  exit 1
fi

# Check if frontend is listening on port 5173
if ! lsof -ti:5173 > /dev/null 2>&1; then
  echo "WARNING: Frontend process started but not listening on port 5173 yet..."
  sleep 2
  if ! lsof -ti:5173 > /dev/null 2>&1; then
    echo "WARNING: Frontend may be using a different port. Check frontend.log for details."
  fi
fi

# Save PIDs to file for stop script
echo $SERVER_PID > .server.pid
echo $FRONTEND_PID > .frontend.pid

echo ""
echo "=========================================="
echo "Application started successfully!"
echo "=========================================="
echo "Server PID: $SERVER_PID (port 4000)"
echo "Frontend PID: $FRONTEND_PID (port 5173)"
echo ""
echo "View logs:"
echo "  Server:   tail -f server.log"
echo "  Frontend: tail -f frontend.log"
echo ""
echo "Access the application at: http://localhost:5173"
echo ""

