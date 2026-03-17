@echo off
cd /d "%~dp0"
echo.
echo  Iniciando servidor para Rustico Preview...
echo.
start "" "http://localhost:8181/preview-publicaciones.html"
node server-preview.js
pause
