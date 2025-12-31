@echo off
setlocal

echo Starting FitPlan Backend Services...
echo ======================================

cd /d "%~dp0"

if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
) else (
    echo ERROR: Virtual environment not found!
    echo Please create a virtual environment first:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    pause
    exit /b 1
)

if not exist logs mkdir logs

echo Starting Auth Service on port 8001...
start "FitPlan Auth Service" /MIN cmd /c "python services\auth_service.py > logs\auth_service.log 2>&1"
timeout /t 2 /nobreak > nul

echo Starting User Service on port 8002...
start "FitPlan User Service" /MIN cmd /c "python services\user_service.py > logs\user_service.log 2>&1"
timeout /t 2 /nobreak > nul

echo Starting Plan Service on port 8003...
start "FitPlan Plan Service" /MIN cmd /c "python services\plan_service.py > logs\plan_service.log 2>&1"
timeout /t 2 /nobreak > nul

echo Starting Tracking Service on port 8004...
start "FitPlan Tracking Service" /MIN cmd /c "python services\tracking_service.py > logs\tracking_service.log 2>&1"
timeout /t 2 /nobreak > nul

echo Starting API Gateway on port 8000...
start "FitPlan API Gateway" /MIN cmd /c "python gateway\main.py > logs\gateway.log 2>&1"
timeout /t 2 /nobreak > nul

echo.
echo ======================================
echo All services started!
echo.
echo Services running:
echo   - API Gateway:       http://localhost:8000
echo   - Auth Service:      http://localhost:8001
echo   - User Service:      http://localhost:8002
echo   - Plan Service:      http://localhost:8003
echo   - Tracking Service:  http://localhost:8004
echo.
echo Swagger Documentation:
echo   - Gateway API Docs:  http://localhost:8000/docs
echo   - Auth API Docs:     http://localhost:8001/docs
echo   - User API Docs:     http://localhost:8002/docs
echo   - Plan API Docs:     http://localhost:8003/docs
echo   - Tracking API Docs: http://localhost:8004/docs
echo.
echo Logs are in: %~dp0logs\
echo.
echo To stop services, run: stop_services.bat
echo.
pause
