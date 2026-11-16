@echo off
title Launch Deepzz Birthday Surprise Website
echo ========================================================
echo   Launching Deepzz's 19th Birthday Surprise Website...
echo ========================================================
echo.
set "PATH=%PATH%;C:\Program Files\nodejs"
cd /d "%~dp0"

echo Starting server on http://localhost:3000 ...
echo Default Magic Password: 20112024
echo.
timeout /t 2 /nobreak >nul
explorer "http://localhost:3000"
call "C:\Program Files\nodejs\npm.cmd" run start
pause
