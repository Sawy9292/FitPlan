@echo off
setlocal

echo Stopping FitPlan Backend Services...
echo ======================================

taskkill /FI "WINDOWTITLE eq FitPlan API Gateway*" /F >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopped API Gateway
) else (
    echo API Gateway was not running
)

taskkill /FI "WINDOWTITLE eq FitPlan Tracking Service*" /F >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopped Tracking Service
) else (
    echo Tracking Service was not running
)

taskkill /FI "WINDOWTITLE eq FitPlan Plan Service*" /F >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopped Plan Service
) else (
    echo Plan Service was not running
)

taskkill /FI "WINDOWTITLE eq FitPlan User Service*" /F >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopped User Service
) else (
    echo User Service was not running
)

taskkill /FI "WINDOWTITLE eq FitPlan Auth Service*" /F >nul 2>&1
if %errorlevel% equ 0 (
    echo Stopped Auth Service
) else (
    echo Auth Service was not running
)

echo.
echo ======================================
echo All services stopped!
echo.
pause
