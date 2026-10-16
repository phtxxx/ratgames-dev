@echo off
setlocal
cd /d "%~dp0.."
if not exist "node_modules\.bin\electron.cmd" (
 echo ERRO: Electron nao encontrado em codigo-fonte\node_modules.
 echo Execute na pasta codigo-fonte: npm install --ignore-scripts NAO e recomendado sem revisar as dependencias.
 pause
 exit /b 1
)
if not exist ".build-src\ui\videos\arena-roblox.jpg" (
 echo ERRO: Recursos de video nao encontrados em codigo-fonte\.build-src\ui\videos.
 pause
 exit /b 1
)
call "node_modules\.bin\electron.cmd" "dev-catalogo"
if errorlevel 1 pause
