@echo off
title Push Deepzz Birthday Surprise to GitHub
echo ========================================================
echo   Pushing to https://github.com/xoashwath-p/Birthdaywishes.git ...
echo ========================================================
echo.
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%PATH%"
cd /d "%~dp0"

echo Current Git Status:
git status
echo.
echo Pushing to GitHub main branch...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your project is now live on GitHub!
    echo ========================================================
) else (
    echo.
    echo If prompted, please authenticate with your GitHub credentials or Personal Access Token (PAT).
)
echo.
pause
