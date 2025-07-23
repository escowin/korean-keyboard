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

