@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo KORTEKS otokurulum
echo Yapimci: SERDAR KAPTAN
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0KUR.ps1"
if errorlevel 1 pause
