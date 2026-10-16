@echo off
cd /d "%~dp0..\.."
where npx >nul 2>&1 || (echo Node.js/npx nao encontrado & pause & exit /b 1)
call npx --yes electron ".\RatGames-DEV-Etapa4-Jogos-Locais\dev-catalogo"
if errorlevel 1 pause
