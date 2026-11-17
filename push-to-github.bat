@echo off
title Push Deepzz Birthday Surprise to GitHub
echo ========================================================
echo   Target Repository: https://github.com/xoashwath-p/Birthdaywishes.git
echo ========================================================
echo.
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%PATH%"
cd /d "%~dp0"

echo Ensuring remote origin is set to xoashwath-p...
git remote set-url origin https://github.com/xoashwath-p/Birthdaywishes.git
git remote -v

echo.
echo Current Git Status:
git status

echo.
echo Pushing to https://github.com/xoashwath-p/Birthdaywishes.git (main branch)...
git push -u origin main

echo.
if %ERRORLEVEL% EQU 0 (
    echo ========================================================
    echo   SUCCESS! Your project is now live on GitHub:
    echo   https://github.com/xoashwath-p/Birthdaywishes
    echo ========================================================
) else (
    echo.
    echo If prompted, please authenticate in your browser with your xoashwath-p account.
)
echo.
pause
