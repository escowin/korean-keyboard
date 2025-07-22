@echo off
echo Building Korean Archaic Keyboard Extension...

REM Create build directory
if not exist build mkdir build
cd build

REM Configure with CMake
echo Configuring with CMake...
cmake .. -G "Visual Studio 16 2019" -A x64
if %ERRORLEVEL% neq 0 (
    echo CMake configuration failed!
    pause
    exit /b 1
)

REM Build the project
echo Building project...
cmake --build . --config Release
if %ERRORLEVEL% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo Build completed successfully!
echo Output files are in build/bin/Release/

REM Copy DLL to system directory for testing (requires admin)
echo.
echo To install the keyboard extension (requires administrator privileges):
echo 1. Copy KoreanArchaicKeyboard.dll to C:\Windows\System32\
echo 2. Register the DLL with: regsvr32 KoreanArchaicKeyboard.dll
echo 3. Add the keyboard layout in Windows Language settings

pause 