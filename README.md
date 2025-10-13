# 옛정음필기: Archaic Korean Keyboard PWA

A Progressive Web App (PWA) notetaking application with a built-in Korean keyboard that supports archaic Korean letters (옛한글). The app features a Dubeolsik (두벌식; 2-set) keyboard layout with long-press functionality to access modern & archaic letter variants.

## Features

### 🎯 **Korean Keyboard with Archaic Letters**
- **Dubeolsik Layout**: Standard Korean keyboard layout with long-press variants
- **Complete Korean Support**: Syllable composition, complex medials & finals, archaic jamos
- **16+ Archaic Letters**: ㅸ, ㅿ, ㆆ, ᅎ, ᅏ, ᅐ, ᅑ, ᄔ, ᅇ, ᄙ, and more
- **Future**: Hanja conversion and Middle Korean tonal mark input

### 📝 **Notetaking Features**
- **Rich Text Editor**: Full-featured editor with Korean input support
- **Note Management**: Create, edit, save, and delete notes with auto-save
- **Local Storage**: All notes stored locally in browser
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 📱 **Progressive Web App**
- **Offline Support**: Works without internet connection
- **Installable**: Can be installed as a native app on any device
- **Cross-platform**: Works on Windows, macOS, Linux, iOS, and Android
- **Auto-deployment**: GitHub Pages with GitHub Actions CI/CD

## Keyboard Layout

The keyboard follows the standard Dubeolsik layout:

```
Row 1: ㅿ ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ
Row 2: ㆆ ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ㆍ
Row 3: ⇧ ㆁ ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ ⌫
Row 4: 123 漢 스페이스 ← → ↵
```

### Letter Variants

Hold down any key for 500ms to see available variants:
- **ㅂ**: ㅂ ㅃ ㅸ ㅹ
- **ㅈ**: ㅈ ㅉ ᅎ ᅏ ᅐ ᅑ
- **ㄷ**: ㄷ ㄸ | **ㄱ**: ㄱ ㄲ | **ㅅ**: ㅅ ㅆ | **ㅊ**: ㅊ ᄼ ᄾ

## Installation

### Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:escowin/archaic-korean-keyboard.git
   cd archaic-korean-keyboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy**
   - Copy the `dist/` folder to your web server
   - Ensure HTTPS is enabled for PWA functionality

### PWA Installation

1. **On Desktop**:
   - Open the app in Chrome, Edge, or Firefox
   - Click the install button in the address bar
   - Or use the browser menu: "Install Korean Keyboard PWA"

2. **On Mobile**:
   - Open the app in Safari (iOS) or Chrome (Android)
   - Tap "Add to Home Screen" when prompted
   - Or use the browser menu: "Add to Home Screen"

## Usage

### Basic Notetaking

1. **Create a new note**: Click the "New Note" button
2. **Edit title**: Click on the title field and type
3. **Write content**: Use the text area to write your notes
4. **Save**: Notes are automatically saved, or click "Save" manually
5. **Delete**: Click "Delete" to remove a note

### Korean Input

1. **Standard Korean**: Type normally using the keyboard
2. **Variant Letters**: Hold down any key for 500ms to see variants, then tap the desired letter
3. **Syllable Composition**: The app automatically combines jamo into proper Korean syllables

### Keyboard Controls

- **⇧**: Shift key for accessing shifted letters
- **⌫**: Backspace | **스페이스**: Space | **↵**: Newline
- **123**: Numbers/symbols (planned) | **😊**: Hanja conversion (planned)
- **Hide/Show Keyboard**: Toggle keyboard visibility

## Technical Details

### Architecture

- **Frontend**: React 19.2.0 with TypeScript 5.9.3
- **Build Tool**: Vite 5.0.0 with PWA support
- **Storage**: LocalStorage for note persistence
- **Deployment**: GitHub Pages with GitHub Actions CI/CD

### Korean Input Processing

The app implements a sophisticated Korean input system:

1. **Jamo Recognition**: Identifies consonants and vowels
2. **Syllable Composition**: Uses Unicode algorithms to compose syllables
3. **Complex Medials**: Supports diphthongs (ㅘ, ㅙ, ㅚ, ㅝ, ㅞ, ㅟ, ㅢ)
4. **Complex Finals**: Supports consonant clusters (ㄺ, ㄻ, ㄼ, ㄽ, ㄾ, ㄿ, ㅀ, etc.)
5. **Archaic Support**: Maps archaic letters to proper Unicode ranges
6. **Final-to-Initial Transition**: Properly handles final consonants becoming initials

### Unicode Support

- **Initial Consonants**: 0x1100-0x1112, 0x113F, 0x1146, 0x114E-0x1151, 0x1155, 0x1170
- **Medial Vowels**: 0x1161-0x1175, 0x1197
- **Final Consonants**: 0x11A8-0x11C7
- **Syllable Blocks**: 0xAC00-0xD7AF

## Browser Support

- **Chrome**: 88+ (recommended) | **Firefox**: 85+ | **Safari**: 14+ | **Edge**: 88+
- **Mobile**: iOS 14+ Safari | Android 8+ Chrome

## Development

### Project Structure

```
korean-keyboard/
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions deployment
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── favicon.svg            # App icon
├── src/
│   ├── components/
│   │   └── KoreanKeyboard.tsx # Keyboard component
│   ├── utils/
│   │   ├── koreanKeyboard.ts  # Main Korean input utilities
│   │   ├── unicode.ts         # Unicode mappings and conversions
│   │   ├── keyboardLayout.ts  # Keyboard layout and variants
│   │   ├── composition.ts     # Syllable composition logic
│   │   └── inputProcessor.ts  # Input processing pipeline
│   ├── types/
│   │   └── korean.ts          # TypeScript type definitions
│   ├── styles/
│   │   ├── main.css           # Base styles
│   │   ├── keyboard.css       # Keyboard styles
│   │   └── noteapp.css        # App styles
│   ├── App.tsx                # Main app component
│   └── main.tsx               # Entry point
├── docs/
│   ├── development-plan.md    # Development roadmap
│   └── bugs-issues.md         # Issue tracking
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

### Adding New Features

1. **New Archaic Letters**: Add to `VARIANT_MAPPINGS` in `keyboardLayout.ts`, update Unicode ranges in `unicode.ts`
2. **Keyboard Layout Changes**: Modify `KEYBOARD_LAYOUT` in `keyboardLayout.ts`, update CSS styles
3. **New App Features**: Add components in `src/components/`, update styles in `src/styles/`
4. **Future Features**: 123 Button (numbers/symbols), Hanja conversion, Middle Korean input

### Code Style

- **TypeScript**: Strict type checking with comprehensive interfaces
- **React**: Functional components with hooks
- **CSS**: Utility-first approach with custom properties
- **Comments**: Comprehensive documentation for Korean input logic

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push and submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Korean linguistics community** for letter mappings and standards
- **Unicode Consortium** for Korean letter specifications
- **Wikipedia** for comprehensive Hangul documentation
- **Contributors** who help improve this project

## Support

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Community**: Join discussions in GitHub Discussions
- **Help**: Include browser info and steps to reproduce for bug reports

---

**Korean Keyboard PWA** - Bringing the beauty of 옛한글 to modern web applications.

*Last updated: October 2025*