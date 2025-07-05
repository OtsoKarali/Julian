#!/bin/bash

# Start backend (FastAPI)
echo "Starting FastAPI backend..."
PYTHONPATH=$(pwd) python -m uvicorn api_backend.main:app --reload --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend (Next.js)
echo "Starting Next.js frontend..."
npm run dev --prefix web-frontend &
FRONTEND_PID=$!

echo "Both services started. Backend PID: $BACKEND_PID, Frontend PID: $FRONTEND_PID"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both services"

# Function to cleanup on exit
cleanup() {
    echo "Stopping services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for both to exit
wait $BACKEND_PID $FRONTEND_PID 