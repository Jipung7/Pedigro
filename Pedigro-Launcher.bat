@echo off
rem ========================================================
rem Pedigro Standalone Portable Launcher (Windows Desktop)
rem Author: Jipung (Lone Steed Studio)
rem License: MIT
rem ========================================================
title Pedigro - Sistem Pemuliaan & Uji Varietas Tanaman

set APP_PATH=%~dp0index.html

rem Try Microsoft Edge in App Mode (Dedicated window, no browser chrome)
if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="file:///%APP_PATH%"
    exit /b 0
)

if exist "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" (
    start "" "%ProgramFiles%\Microsoft\Edge\Application\msedge.exe" --app="file:///%APP_PATH%"
    exit /b 0
)

rem Try Google Chrome in App Mode
if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="file:///%APP_PATH%"
    exit /b 0
)

if exist "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" (
    start "" "%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe" --app="file:///%APP_PATH%"
    exit /b 0
)

rem Fallback: Open with default system browser
start "" "%APP_PATH%"
exit /b 0
