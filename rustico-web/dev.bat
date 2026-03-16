@echo off
title Rustico Web — Dev Server
SET PATH=C:\Program Files\nodejs;%PATH%
cd /d "%~dp0"
echo.
echo  ================================
echo   Rustico Web — iniciando...
echo  ================================
echo.
node node_modules\next\dist\bin\next dev
pause
