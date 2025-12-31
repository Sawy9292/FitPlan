#!/bin/bash

# Stop all FitPlan backend services

BACKEND_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$BACKEND_DIR"

echo "Stopping FitPlan Backend Services..."
echo "======================================"

# Function to stop a service
stop_service() {
    local name=$1
    local pidfile="logs/${name}.pid"
    
    if [ -f "$pidfile" ]; then
        local pid=$(cat "$pidfile")
        if ps -p $pid > /dev/null 2>&1; then
            echo "Stopping $name (PID: $pid)..."
            kill $pid
            sleep 1
            # Force kill if still running
            if ps -p $pid > /dev/null 2>&1; then
                echo "Force stopping $name..."
                kill -9 $pid
            fi
        else
            echo "$name was not running (PID file stale)"
        fi
        rm -f "$pidfile"
    else
        echo "No PID file found for $name"
    fi
}

# Stop services in reverse order
stop_service "gateway"
stop_service "tracking_service"
stop_service "plan_service"
stop_service "user_service"
stop_service "auth_service"

echo ""
echo "======================================"
echo "All services stopped!"
echo ""
