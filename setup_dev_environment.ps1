# Korean Keyboard Development Environment Setup
# PowerShell version with advanced features

param(
    [switch]$Force,
    [switch]$SkipChecks,
    [switch]$InstallTools
)

Write-Host "Setting up Korean Keyboard Development Environment" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Green
Write-Host ""

# Check if running as administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Warning "Some components may require administrator privileges."
    Write-Host "Consider running this script as administrator for full setup." -ForegroundColor Yellow
    Write-Host ""
}

# Function to check if a command exists
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Function to get version of a command
function Get-CommandVersion($cmdname) {
    try {
        $version = & $cmdname --version 2>$null
        if ($version) {
            return $version.Split("`n")[0]
        }
    } catch {
        try {
            $version = & $cmdname -version 2>$null
            if ($version) {
                return $version.Split("`n")[0]
            }
        } catch {
            return $null
        }
    }
    return $null
}

# Step 1: Check development tools
if (-not $SkipChecks) {
    Write-Host "Step 1: Checking development tools..." -ForegroundColor Cyan
    Write-Host ""

    $toolsStatus = @{}

    # Check Visual Studio
    Write-Host "Checking Visual Studio..." -ForegroundColor White
    if (Test-Command "cl") {
        $vsVersion = Get-CommandVersion "cl"
        if ($vsVersion -and $vsVersion -match "Microsoft") {
            Write-Host "✓ Visual Studio C++ compiler found" -ForegroundColor Green
            $toolsStatus["Visual Studio"] = $true
        } else {
            Write-Host "⚠ Visual Studio found but C++ tools may not be configured" -ForegroundColor Yellow
            $toolsStatus["Visual Studio"] = $false
        }
    } else {
        Write-Host "✗ Visual Studio C++ compiler not found" -ForegroundColor Red
        Write-Host "  Please install Visual Studio 2019 or later with C++ development tools" -ForegroundColor Red
        Write-Host "  Download: https://visualstudio.microsoft.com/downloads/" -ForegroundColor Red
        $toolsStatus["Visual Studio"] = $false
    }

    # Check CMake
    Write-Host "Checking CMake..." -ForegroundColor White
    if (Test-Command "cmake") {
        $cmakeVersion = Get-CommandVersion "cmake"
        Write-Host "✓ CMake found: $cmakeVersion" -ForegroundColor Green
        $toolsStatus["CMake"] = $true
    } else {
        Write-Host "✗ CMake not found" -ForegroundColor Red
        Write-Host "  Please install CMake 3.16 or later" -ForegroundColor Red
        Write-Host "  Download: https://cmake.org/download/" -ForegroundColor Red
        $toolsStatus["CMake"] = $false
    }

    # Check Git
    Write-Host "Checking Git..." -ForegroundColor White
    if (Test-Command "git") {
        $gitVersion = Get-CommandVersion "git"
        Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
        $toolsStatus["Git"] = $true
    } else {
        Write-Host "✗ Git not found" -ForegroundColor Red
        Write-Host "  Please install Git" -ForegroundColor Red
        Write-Host "  Download: https://git-scm.com/download/win" -ForegroundColor Red
        $toolsStatus["Git"] = $false
    }

    # Check Python
    Write-Host "Checking Python..." -ForegroundColor White
    if (Test-Command "python") {
        $pythonVersion = Get-CommandVersion "python"
        Write-Host "✓ Python found: $pythonVersion" -ForegroundColor Green
        $toolsStatus["Python"] = $true
    } else {
        Write-Host "⚠ Python not found (optional, but recommended)" -ForegroundColor Yellow
        $toolsStatus["Python"] = $false
    }

    Write-Host ""
}

# Step 2: Create directory structure
Write-Host "Step 2: Creating development directory structure..." -ForegroundColor Cyan
Write-Host ""

$directories = @(
    "build",
    "bin", 
    "lib",
    "docs\api",
    "tools",
    ".vscode"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "✓ Created directory: $dir" -ForegroundColor Green
    } else {
        Write-Host "✓ Directory exists: $dir" -ForegroundColor Green
    }
}

Write-Host ""

# Step 3: Create build configuration
Write-Host "Step 3: Setting up build configuration..." -ForegroundColor Cyan
Write-Host ""

$buildConfig = @"
# Build configuration for Korean Keyboard
BUILD_TYPE=Release
CMAKE_GENERATOR=Visual Studio 16 2019
CMAKE_ARCHITECTURE=x64
ENABLE_TESTS=ON
ENABLE_DOCUMENTATION=ON
"@

$buildConfig | Out-File -FilePath "build_config.txt" -Encoding UTF8
Write-Host "✓ Build configuration created" -ForegroundColor Green

# Step 4: Set environment variables
Write-Host "Step 4: Setting up environment variables..." -ForegroundColor Cyan
Write-Host ""

$env:KOREAN_KEYBOARD_ROOT = Get-Location
$env:KOREAN_KEYBOARD_BUILD = Join-Path (Get-Location) "build"
$env:KOREAN_KEYBOARD_BIN = Join-Path (Get-Location) "bin"

Write-Host "✓ Environment variables set:" -ForegroundColor Green
Write-Host "  KOREAN_KEYBOARD_ROOT: $env:KOREAN_KEYBOARD_ROOT" -ForegroundColor White
Write-Host "  KOREAN_KEYBOARD_BUILD: $env:KOREAN_KEYBOARD_BUILD" -ForegroundColor White
Write-Host "  KOREAN_KEYBOARD_BIN: $env:KOREAN_KEYBOARD_BIN" -ForegroundColor White

Write-Host ""

# Step 5: Create VS Code configuration
Write-Host "Step 5: Creating VS Code configuration..." -ForegroundColor Cyan
Write-Host ""

$vscodeConfig = @"
{
  "folders": [
    {
      "name": "Korean Keyboard",
      "path": "."
    }
  ],
  "settings": {
    "cmake.configureOnOpen": true,
    "cmake.buildDirectory": "\${workspaceFolder}/build",
    "cmake.generator": "Visual Studio 16 2019",
    "cmake.preferredGenerators": [
      "Visual Studio 16 2019"
    ],
    "files.associations": {
      "*.h": "cpp",
      "*.cpp": "cpp",
      "*.hpp": "cpp"
    },
    "C_Cpp.default.configurationProvider": "ms-vscode.cmake-tools"
  },
  "extensions": {
    "recommendations": [
      "ms-vscode.cpptools",
      "ms-vscode.cmake-tools",
      "ms-vscode.cpptools-extension-pack"
    ]
  }
}
"@

$vscodeConfig | Out-File -FilePath "korean-keyboard.code-workspace" -Encoding UTF8
Write-Host "✓ VS Code workspace configuration created" -ForegroundColor Green

# Step 6: Create development documentation
Write-Host "Step 6: Creating development documentation..." -ForegroundColor Cyan
Write-Host ""

$devDoc = @"
# Development Environment Setup

## Prerequisites

### Required Tools
- **Visual Studio 2019 or later** with C++ development tools
- **CMake 3.16 or later**
- **Git** for version control

### Optional Tools
- **VS Code** with C++ extensions
- **Python 3.7+** for additional build tools

## Environment Variables

The following environment variables are set:
- `KOREAN_KEYBOARD_ROOT`: Project root directory
- `KOREAN_KEYBOARD_BUILD`: Build directory
- `KOREAN_KEYBOARD_BIN`: Binary output directory

## Quick Start

1. **Build the project**:
   ```bash
   dev.bat build
   ```

2. **Run tests**:
   ```bash
   dev.bat test
   ```

3. **Install keyboard extension**:
   ```bash
   dev.bat install
   ```

## Development Workflow

1. Make changes to source code
2. Run `dev.bat build` to compile
3. Run `dev.bat test` to verify changes
4. Commit changes to git
5. Run `dev.bat install` to test installation

## Troubleshooting

### Common Issues

**CMake not found**:
- Install CMake from https://cmake.org/download/
- Add CMake to your system PATH

**Visual Studio not found**:
- Install Visual Studio 2019+ with C++ development tools
- Run from Visual Studio Developer Command Prompt

**Build failures**:
- Check compiler version compatibility
- Verify all dependencies are installed
- Check build logs in the `build` directory
"@

$devDoc | Out-File -FilePath "docs\DEVELOPMENT.md" -Encoding UTF8
Write-Host "✓ Development documentation created" -ForegroundColor Green

# Step 7: Create build verification script
Write-Host "Step 7: Creating build verification script..." -ForegroundColor Cyan
Write-Host ""

$verifyScript = @"
@echo off
echo Verifying build environment...
echo.

REM Check if we can compile a simple test
echo Compiling test program...
g++ -o build\test_compile test_core.cpp -std=c++17
if %ERRORLEVEL% neq 0 (
  echo ✗ Compilation test failed
  echo Please check your C++ compiler installation
  exit /b 1
)

echo ✓ Compilation test passed

REM Run the test
echo Running test program...
build\test_compile.exe
if %ERRORLEVEL% neq 0 (
  echo ✗ Test execution failed
  exit /b 1
)

echo ✓ Test execution passed
echo.
echo Build environment is ready!
echo You can now run: dev.bat build
"@

$verifyScript | Out-File -FilePath "verify_build.bat" -Encoding ASCII
Write-Host "✓ Build verification script created" -ForegroundColor Green

# Step 8: Final verification
Write-Host "Step 8: Final verification..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Running build verification..." -ForegroundColor White
& .\verify_build.bat

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "Development Environment Setup Complete!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""

# Summary of tools status
Write-Host "Tools Status Summary:" -ForegroundColor Cyan
foreach ($tool in $toolsStatus.Keys) {
    $status = if ($toolsStatus[$tool]) { "✓ Ready" } else { "✗ Missing" }
    $color = if ($toolsStatus[$tool]) { "Green" } else { "Red" }
    Write-Host "  $tool`: $status" -ForegroundColor $color
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Install missing tools (if any)" -ForegroundColor White
Write-Host "2. Run: dev.bat build" -ForegroundColor White
Write-Host "3. Run: dev.bat test" -ForegroundColor White
Write-Host "4. Run: dev.bat install (as administrator)" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see docs\DEVELOPMENT.md" -ForegroundColor White

# Optional: Install tools automatically
if ($InstallTools) {
    Write-Host ""
    Write-Host "Would you like to install missing tools automatically? (y/n)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "Installing missing tools..." -ForegroundColor Cyan
        
        # Install Chocolatey if not present
        if (-not (Test-Command "choco")) {
            Write-Host "Installing Chocolatey package manager..." -ForegroundColor White
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        }
        
        # Install missing tools
        if (-not $toolsStatus["CMake"]) {
            Write-Host "Installing CMake..." -ForegroundColor White
            choco install cmake -y
        }
        
        if (-not $toolsStatus["Git"]) {
            Write-Host "Installing Git..." -ForegroundColor White
            choco install git -y
        }
        
        Write-Host "Tool installation complete!" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 