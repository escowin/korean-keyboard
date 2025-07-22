@echo off
echo Installing Korean Archaic Keyboard Extension...
echo This script requires administrator privileges.

REM Check if running as administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Error: This script must be run as administrator.
    echo Right-click on install.bat and select "Run as administrator"
    pause
    exit /b 1
)

REM Check if build exists
if not exist "build\bin\Release\KoreanArchaicKeyboard.dll" (
    echo Error: KoreanArchaicKeyboard.dll not found.
    echo Please run build.bat first to build the project.
    pause
    exit /b 1
)

echo Copying KoreanArchaicKeyboard.dll to System32...
copy "build\bin\Release\KoreanArchaicKeyboard.dll" "C:\Windows\System32\" /Y
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to copy DLL to System32
    pause
    exit /b 1
)

echo Registering KoreanArchaicKeyboard.dll...
regsvr32 "C:\Windows\System32\KoreanArchaicKeyboard.dll" /s
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to register DLL
    pause
    exit /b 1
)

echo.
echo Installation completed successfully!
echo.
echo Next steps:
echo 1. Go to Windows Settings ^> Time ^& Language ^> Language
echo 2. Add Korean language if not already added
echo 3. Click on Korean ^> Options ^> Add a keyboard
echo 4. Select "Korean Archaic Keyboard"
echo 5. Switch to the new keyboard layout
echo.
echo Usage:
echo - Type normally for modern Korean
echo - Use [Fn] + K/T/G/Q for archaic letters
echo - Press [Ctrl] + [Alt] + A to toggle archaic mode
echo.
pause 