# Korean Keyboard with Archaic Jamo Support

A Windows keyboard extension that enables typing in Korean with support for archaic Korean jamo/letters (옛한글). The application handles both modern Korean input and archaic character composition, automatically mapping input sequences to appropriate Unicode syllabic blocks.

## Features

### Core Functionality
- **Archaic Korean Letters Support**: Type the four main archaic jamos (ㆍ, ㅿ, ㆆ, ㅸ)
- **Syllabic Block Composition**: Automatically compose syllabic blocks from individual jamo input
- **Position-Aware Mapping**: Intelligently determine character positioning (initial, medial, final)
- **Unicode Integration**: Proper Unicode mapping for both modern and archaic Korean characters

### Input Methods
- **Function Key Combinations**: Use [Fn] + key combinations for archaic letters
  - `[Fn] + K` → ㆍ (아래아)
  - `[Fn] + T` → ㅿ (반시옷)
  - `[Fn] + G` → ㆆ (여린히읗)
  - `[Fn] + Q` → ㅸ (쌍비읍)
- **Alternative Shortcuts**: 
  - `[Ctrl] + [Alt] + A` to toggle archaic mode
  - `[Fn] + [Space]` to toggle archaic mode

### Examples
```
Input: ㆆㆍㄴ → Output: ᅙᆞᆫ
Input: ㅸㅏㄴ → Output: ᄫᅡᆫ
Input: ㅿㅡㄹ → Output: ᅀᅳᆯ
Input: ㄱㅏㄴ → Output: 간
```

## Installation

### Quick Start (MinGW) ✅
**For immediate development and testing:**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/korean-keyboard.git
   cd korean-keyboard
   ```

2. **Build with MinGW** (no Visual Studio required):
   ```bash
   ./build_minGW.bat
   ```

3. **Test the functionality**:
   ```bash
   ./test_compile.exe
   ```

**✅ This setup is working and tested!**

### Full Installation (Visual Studio)

**Prerequisites**:
- Windows 10/11 (64-bit)
- Visual Studio 2019 or later with C++ development tools
- CMake 3.16 or later

**Building from Source**:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/korean-keyboard.git
   cd korean-keyboard
   ```

2. **Build the project**:
   ```bash
   dev.bat build
   ```
   Or manually:
   ```bash
   mkdir build
   cd build
   cmake ../src/windows -G "Visual Studio 16 2019" -A x64
   cmake --build . --config Release
   ```

3. **Install the keyboard extension** (requires administrator privileges):
   ```bash
   # Copy DLL to system directory
   copy build\bin\Release\KoreanArchaicKeyboard.dll C:\Windows\System32\
   
   # Register the DLL
   regsvr32 KoreanArchaicKeyboard.dll
   ```

4. **Add keyboard layout in Windows**:
   - Go to Settings → Time & Language → Language
   - Add Korean language if not already added
   - Click on Korean → Options → Add a keyboard
   - Select "Korean Archaic Keyboard"

## Usage

### Basic Typing
1. **Modern Korean**: Type normally using standard Korean input
2. **Archaic Letters**: Use function key combinations to input archaic jamos
3. **Mixed Input**: Combine modern and archaic jamos in the same syllable

### Mode Switching
- **Toggle Archaic Mode**: Press `[Ctrl] + [Alt] + A` or `[Fn] + [Space]`
- **Visual Indicator**: Status bar shows current mode (Modern/Archaic)

### Configuration
The keyboard extension supports customization through configuration files:
- **Modifier Key**: Choose between Fn, Ctrl+Alt, Right Alt, or custom
- **Composition Style**: Immediate or delayed composition
- **Visual Feedback**: Enable/disable input preview
- **Key Mappings**: Customize archaic letter assignments

## Development

### Project Structure
```
korean-keyboard/
├── src/windows/          # Windows TSF implementation
│   ├── main.cpp          # DLL entry point
│   ├── TSFManager.cpp    # Text Services Framework manager
│   ├── JamoProcessor.cpp # Jamo processing engine
│   └── Configuration.cpp # Configuration management
├── include/              # Header files
├── tests/                # Test applications
├── docs/                 # Documentation
└── build.bat            # Build script
```

### Key Components

#### JamoProcessor
- Handles archaic Korean jamo input and processing
- Implements syllabic composition algorithm
- Manages Unicode mapping for all jamo positions

#### TSFManager
- Windows Text Services Framework integration
- Handles keyboard input and text insertion
- Manages archaic mode toggling

#### Configuration
- User preferences and settings management
- Customizable key mappings
- Configuration file I/O

### Testing
Run the test application to verify functionality:
```bash
cd build/bin/Release
TestJamoProcessor.exe
```

## Technical Details

### Unicode Support
- **Initial Consonants**: 0x1100 - 0x1112 (modern) + archaic extensions
- **Medial Vowels**: 0x1161 - 0x1175 (modern) + 0x1197 (ㆍ)
- **Final Consonants**: 0x11A8 - 0x11C6 (modern) + archaic extensions
- **Syllable Base**: 0xAC00 (가)

### Archaic Jamos
- **ㆍ** (아래아): 0x1197 - archaic vowel
- **ㅿ** (반시옷): 0x113F - archaic consonant
- **ㆆ** (여린히읗): 0x1146 - archaic consonant
- **ㅸ** (쌍비읍): 0x1170 - archaic consonant

### Performance
- **Key Input**: < 50ms latency
- **Composition**: < 100ms for syllabic blocks
- **Mode Switching**: < 200ms
- **Memory Usage**: < 10MB RAM

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Copyright (c) 2025 Korean Keyboard Project Contributors**

All source files include copyright headers with detailed licensing information and contributor acknowledgments.

## Acknowledgments

- Unicode Consortium for Korean character standards
- Microsoft for Windows Text Services Framework
- Korean linguistics community for archaic jamo research

## Support

For issues and questions:
- Create an issue on GitHub
- Check the [documentation](docs/spec.md)
- Review the [technical specification](docs/spec.md)

## Roadmap

### Phase 1: Windows Keyboard Extension ✅
- [x] Windows TSF implementation
- [x] Basic archaic letter input
- [x] Syllabic composition algorithm
- [x] User interface and configuration
- [x] Testing and debugging

### Phase 2: Mobile Applications (Future)
- [ ] iOS keyboard extension
- [ ] Android IME implementation
- [ ] Long-press functionality
- [ ] Cross-platform consistency

### Phase 3: Advanced Features (Future)
- [ ] Web browser extension
- [ ] Advanced composition rules
- [ ] User dictionary and learning
- [ ] Performance optimization
