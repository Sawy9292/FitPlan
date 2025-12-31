Write-Host "Stopping FitPlan Backend Services..." -ForegroundColor Yellow
Write-Host "======================================"

$BackendDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $BackendDir

$pidsFile = "logs\services.pids"

if (Test-Path $pidsFile) {
    $pids = Get-Content $pidsFile
    foreach ($pid in $pids) {
        if ($pid -match '^\d+$') {
            try {
                $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                if ($process) {
                    Stop-Process -Id $pid -Force
                    Write-Host "Stopped service (PID: $pid)" -ForegroundColor Green
                }
            } catch {
                Write-Host "Could not stop PID: $pid (already stopped)" -ForegroundColor Gray
            }
        }
    }
    Remove-Item $pidsFile -Force
} else {
    Write-Host "No PID file found. Attempting to stop by port..." -ForegroundColor Gray
    
    $ports = @(8000, 8001, 8002, 8003, 8004)
    foreach ($port in $ports) {
        $connections = netstat -ano | Select-String ":$port.*LISTENING"
        if ($connections) {
            foreach ($conn in $connections) {
                $pid = ($conn -split '\s+')[-1]
                try {
                    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                    Write-Host "Stopped service on port $port (PID: $pid)" -ForegroundColor Green
                } catch {
                    Write-Host "Could not stop service on port $port" -ForegroundColor Red
                }
            }
        }
    }
}

Get-Process python -ErrorAction SilentlyContinue | Where-Object {
    $_.MainWindowTitle -match "FitPlan"
} | ForEach-Object {
    Stop-Process -Id $_.Id -Force
    Write-Host "Stopped service: $($_.MainWindowTitle)" -ForegroundColor Green
}

Write-Host ""
Write-Host "======================================"
Write-Host "All services stopped!" -ForegroundColor Green
Write-Host ""
