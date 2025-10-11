/**
 * Core Korean Input Package
 * Exports for multi-platform Korean keyboard applications
 */

// Main processor class
export { KoreanInputProcessor, koreanInputProcessor } from './KoreanInputProcessor.js';

// Types
export type {
  KoreanCharacter,
  SyllableComposition,
  KoreanInputResult,
  KoreanInputError,
  KoreanInputErrorDetails,
  CompositionState,
  KoreanPosition,
  KoreanCharacterType,
  KeyboardLayout,
  ArchaicMappings,
  KoreanUnicodeRanges,
  KeyboardEventHandlers,
  Note,
  AppState,
  KeyboardKey,
  ArchaicPopup,
  KeyboardConfig,
  PWAConfig
} from '../types/korean.js';

// Utilities (re-exported for convenience)
export {
  KEYBOARD_LAYOUT,
  ARCHAIC_MAPPINGS,
  UNICODE_RANGES,
  composeSyllable,
  isConsonant,
  isVowel,
  getArchaicVariants,
  processKoreanInput
} from '../utils/koreanKeyboard.js';

// Version info
export const VERSION = '1.0.0';
export const PACKAGE_NAME = '@korean-keyboard/core';
