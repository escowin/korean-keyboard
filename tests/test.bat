@echo off
echo Running Korean Archaic Keyboard Tests...

REM Check if test executable exists
if not exist "build\bin\Release\TestJamoProcessor.exe" (
    echo Error: TestJamoProcessor.exe not found.
    echo Please run build.bat first to build the project.
    pause
    exit /b 1
)

echo Starting test application...
echo.
echo This will test:
echo - Archaic jamo detection
echo - Jamo composition algorithm
echo - Unicode mapping
echo - Position-aware processing
echo.

cd build\bin\Release
TestJamoProcessor.exe

echo.
echo Test completed. Check the output above for results.
pause 