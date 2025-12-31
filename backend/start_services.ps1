Write-Host "Starting FitPlan Backend Services..." -ForegroundColor Green
Write-Host "======================================"

$BackendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $BackendDir

if (Test-Path "venv\Scripts\Activate.ps1") {
    & "$BackendDir\venv\Scripts\Activate.ps1"
} else {
    Write-Host "ERROR: Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please create a virtual environment first:"
    Write-Host "  python -m venv venv"
    Write-Host "  .\venv\Scripts\Activate.ps1"
    Write-Host "  pip install -r requirements.txt"
    pause
    exit 1
}

New-Item -ItemType Directory -Force -Path logs | Out-Null

Write-Host "Starting Auth Service on port 8001..."
$auth = Start-Process python -ArgumentList "services\auth_service.py" -RedirectStandardOutput "logs\auth_service.log" -RedirectStandardError "logs\auth_service_error.log" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

Write-Host "Starting User Service on port 8002..."
$user = Start-Process python -ArgumentList "services\user_service.py" -RedirectStandardOutput "logs\user_service.log" -RedirectStandardError "logs\user_service_error.log" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

Write-Host "Starting Plan Service on port 8003..."
$plan = Start-Process python -ArgumentList "services\plan_service.py" -RedirectStandardOutput "logs\plan_service.log" -RedirectStandardError "logs\plan_service_error.log" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

Write-Host "Starting Tracking Service on port 8004..."
$tracking = Start-Process python -ArgumentList "services\tracking_service.py" -RedirectStandardOutput "logs\tracking_service.log" -RedirectStandardError "logs\tracking_service_error.log" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

Write-Host "Starting API Gateway on port 8000..."
$gateway = Start-Process python -ArgumentList "gateway\main.py" -RedirectStandardOutput "logs\gateway.log" -RedirectStandardError "logs\gateway_error.log" -WindowStyle Hidden -PassThru
Start-Sleep -Seconds 2

$auth.Id, $user.Id, $plan.Id, $tracking.Id, $gateway.Id | Out-File "logs\services.pids"

Write-Host ""
Write-Host "======================================"
Write-Host "All services started!" -ForegroundColor Green
Write-Host ""
Write-Host "Services running:"
Write-Host "  - API Gateway:       http://localhost:8000" -ForegroundColor Cyan
Write-Host "  - Auth Service:      http://localhost:8001" -ForegroundColor Cyan
Write-Host "  - User Service:      http://localhost:8002" -ForegroundColor Cyan
Write-Host "  - Plan Service:      http://localhost:8003" -ForegroundColor Cyan
Write-Host "  - Tracking Service:  http://localhost:8004" -ForegroundColor Cyan
Write-Host ""
Write-Host "Swagger Documentation:"
Write-Host "  - Gateway API Docs:  http://localhost:8000/docs" -ForegroundColor Yellow
Write-Host "  - Auth API Docs:     http://localhost:8001/docs" -ForegroundColor Yellow
Write-Host "  - User API Docs:     http://localhost:8002/docs" -ForegroundColor Yellow
Write-Host "  - Plan API Docs:     http://localhost:8003/docs" -ForegroundColor Yellow
Write-Host "  - Tracking API Docs: http://localhost:8004/docs" -ForegroundColor Yellow
Write-Host ""
Write-Host "Logs are in: $BackendDir\logs\" -ForegroundColor Gray
Write-Host ""
Write-Host "To stop services, run: .\stop_services.ps1" -ForegroundColor Magenta
Write-Host ""
