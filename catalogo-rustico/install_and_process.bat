@echo off
set PYTHON=c:\Users\nigonzalezc\AppData\Local\Programs\Python\Python311\python.exe
"%PYTHON%" -m pip install Pillow --quiet
"%PYTHON%" procesar_imagenes.py
pause
