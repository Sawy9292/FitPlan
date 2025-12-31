#!/bin/bash

# Start all FitPlan backend services
# This script will start each microservice and the API gateway in background

BACKEND_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$BACKEND_DIR"

# Activate virtual environment
source venv/bin/activate

# Create log directory
mkdir -p logs

echo "Starting FitPlan Backend Services..."
echo "======================================"

# Start Auth Service (Port 8001)
echo "Starting Auth Service on port 8001..."
python services/auth_service.py > logs/auth_service.log 2>&1 &
echo $! > logs/auth_service.pid
sleep 2

# Start User Service (Port 8002)
echo "Starting User Service on port 8002..."
python services/user_service.py > logs/user_service.log 2>&1 &
echo $! > logs/user_service.pid
sleep 2

# Start Plan Service (Port 8003)
echo "Starting Plan Service on port 8003..."
python services/plan_service.py > logs/plan_service.log 2>&1 &
echo $! > logs/plan_service.pid
sleep 2

# Start Tracking Service (Port 8004)
echo "Starting Tracking Service on port 8004..."
python services/tracking_service.py > logs/tracking_service.log 2>&1 &
echo $! > logs/tracking_service.pid
sleep 2

# Start API Gateway (Port 8000)
echo "Starting API Gateway on port 8000..."
python gateway/main.py > logs/gateway.log 2>&1 &
echo $! > logs/gateway.pid
sleep 2

echo ""
echo "======================================"
echo "All services started!"
echo ""
echo "Services running:"
echo "  - API Gateway:       http://localhost:8000"
echo "  - Auth Service:      http://localhost:8001"
echo "  - User Service:      http://localhost:8002"
echo "  - Plan Service:      http://localhost:8003"
echo "  - Tracking Service:  http://localhost:8004"
echo ""
echo "Logs are in: $BACKEND_DIR/logs/"
echo ""
echo "To stop services, run: ./stop_services.sh"
echo ""
echo "To check service status:"
echo "  - API Gateway health: curl http://localhost:8000/api/health"
echo "  - View logs: tail -f logs/gateway.log"
