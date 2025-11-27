#!/bin/bash

# Stop script for template generator application

echo "Stopping Template Generator Application..."

# Read PIDs from file and kill processes
if [ -f ".server.pid" ]; then
  SERVER_PID=$(cat .server.pid)
  if ps -p $SERVER_PID > /dev/null 2>&1; then
    echo "Stopping server (PID: $SERVER_PID)..."
    kill $SERVER_PID 2>/dev/null || true
    sleep 1
    # Force kill if still running
    if ps -p $SERVER_PID > /dev/null 2>&1; then
      kill -9 $SERVER_PID 2>/dev/null || true
    fi
  fi
  rm -f .server.pid
fi

if [ -f ".frontend.pid" ]; then
  FRONTEND_PID=$(cat .frontend.pid)
  if ps -p $FRONTEND_PID > /dev/null 2>&1; then
    echo "Stopping frontend (PID: $FRONTEND_PID)..."
    kill $FRONTEND_PID 2>/dev/null || true
    sleep 1
    # Force kill if still running
    if ps -p $FRONTEND_PID > /dev/null 2>&1; then
      kill -9 $FRONTEND_PID 2>/dev/null || true
    fi
  fi
  rm -f .frontend.pid
fi

# Kill any processes on the required ports (more aggressive cleanup)
echo "Killing any remaining processes on ports 4000 and 5173..."
lsof -ti:4000 | xargs kill -9 2>/dev/null || true
lsof -ti:5173 | xargs kill -9 2>/dev/null || true

# Also kill any node processes that might be related (be careful with this)
# Kill ts-node-dev processes that might be running the server
pkill -f "ts-node-dev.*server.ts" 2>/dev/null || true
# Kill vite processes
pkill -f "vite.*frontend" 2>/dev/null || true

# Wait a moment for processes to die
sleep 1

# Verify ports are free
if lsof -ti:4000 > /dev/null 2>&1; then
  echo "WARNING: Port 4000 is still in use"
else
  echo "Port 4000 is free"
fi

if lsof -ti:5173 > /dev/null 2>&1; then
  echo "WARNING: Port 5173 is still in use"
else
  echo "Port 5173 is free"
fi

echo "Application stopped!"

