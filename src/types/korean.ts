/**
 * Type definitions for Korean input system
 */

// Korean character positions in a syllable
export type KoreanPosition = 'initial' | 'medial' | 'final';

// Korean character types
export type KoreanCharacterType = 'consonant' | 'vowel';

// Korean keyboard layout structure
export interface KeyboardLayout {
  row1: string[];
  row2: string[];
  row3: string[];
  row4: string[];
}

// Korean character with metadata
export interface KoreanCharacter {
  /** The actual character */
  char: string;
  /** Unicode code point */
  unicode: number;
  /** Character type (consonant or vowel) */
  type: KoreanCharacterType;
  /** Position in syllable (initial, medial, final) */
  position: KoreanPosition;
  /** Whether this is an archaic character */
  isArchaic: boolean;
  /** Alternative archaic variants */
  archaicVariants?: string[];
}

// Syllable composition state
export interface SyllableComposition {
  initial: string;
  medial: string;
  final: string;
}

// Unicode ranges for Korean characters
export interface KoreanUnicodeRanges {
  INITIAL_CONSONANTS: Record<string, number>;
  MEDIAL_VOWELS: Record<string, number>;
  FINAL_CONSONANTS: Record<string, number>;
}

// Archaic character mappings
export type ArchaicMappings = Record<string, string[]>;

// Keyboard event handlers
export interface KeyboardEventHandlers {
  onKeyPress: (key: string) => void;
  onTextInput: (text: string) => void;
}

// Note data structure
export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

// App state
export interface AppState {
  notes: Note[];
  currentNote: Note | null;
  isKeyboardVisible: boolean;
  noteTitle: string;
  noteContent: string;
}

// Korean input processing result
export interface KoreanInputResult {
  /** The processed text with composed syllables */
  processedText: string;
  /** Whether any Korean characters were processed */
  hasKorean: boolean;
  /** Number of syllables composed */
  syllablesComposed: number;
}

// Keyboard key configuration
export interface KeyboardKey {
  /** The key value */
  value: string;
  /** Display text for the key */
  displayText: string;
  /** Whether this key has archaic variants */
  hasArchaicVariants: boolean;
  /** CSS classes for styling */
  cssClasses: string[];
  /** Whether this is a special key (shift, backspace, etc.) */
  isSpecialKey: boolean;
}

// Long press popup configuration
export interface ArchaicPopup {
  /** The base character */
  baseChar: string;
  /** Available variants */
  variants: string[];
  /** Popup position */
  position: {
    left: number;
    bottom: number;
  };
  /** Whether popup is visible */
  isVisible: boolean;
}

// Korean composition algorithm state
export interface CompositionState {
  /** Current syllable being composed */
  currentSyllable: SyllableComposition;
  /** Buffer for pending characters */
  buffer: string;
  /** Whether we're in composition mode */
  isComposing: boolean;
  /** Last processed character */
  lastChar: string | null;
}

// Keyboard configuration options
export interface KeyboardConfig {
  /** Long press delay in milliseconds */
  longPressDelay: number;
  /** Whether to enable haptic feedback */
  enableHapticFeedback: boolean;
  /** Whether to show visual feedback */
  enableVisualFeedback: boolean;
  /** Auto-save delay in milliseconds */
  autoSaveDelay: number;
  /** Maximum number of notes to keep */
  maxNotes: number;
}

// PWA configuration
export interface PWAConfig {
  /** App name */
  name: string;
  /** Short name */
  shortName: string;
  /** Description */
  description: string;
  /** Theme color */
  themeColor: string;
  /** Background color */
  backgroundColor: string;
  /** Display mode */
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
}

// Error types for Korean input
export enum KoreanInputError {
  INVALID_CHARACTER = 'INVALID_CHARACTER',
  COMPOSITION_FAILED = 'COMPOSITION_FAILED',
  UNICODE_ERROR = 'UNICODE_ERROR',
  POSITION_ERROR = 'POSITION_ERROR'
}

// Korean input error with details
export interface KoreanInputErrorDetails {
  error: KoreanInputError;
  message: string;
  character?: string;
  position?: number;
  context?: string;
}
