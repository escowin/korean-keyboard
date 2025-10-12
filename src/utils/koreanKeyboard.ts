/**
 * Korean Keyboard Utilities
 * Main entry point for Korean keyboard functionality
 * Re-exports from modular components
 */

// Re-export from keyboard layout module
export { 
  KEYBOARD_LAYOUT, 
  SHIFT_MAPPINGS, 
  ARCHAIC_TO_MODERN_MAPPING, 
  ARCHAIC_MAPPINGS,
  getArchaicVariants,
  getShiftedCharacter
} from './keyboardLayout.js'

// Re-export from Unicode module
export { 
  UNICODE_RANGES,
  FINAL_TO_INITIAL_MAPPING,
  convertFinalToInitial,
  isConsonant,
  isModernConsonant,
  isVowel,
  isComposedHangulSyllable,
  getInitialConsonantCode,
  getMedialVowelCode,
  getFinalConsonantCode
} from './unicode.js'

// Re-export from composition module
export { 
  composeSyllable,
  canFormComplexMedial,
  canFormComplexFinal,
  decomposeHangulSyllable
} from './composition.js'

// Re-export from input processor module
export { 
  resetCompositionState,
  getCompositionState,
  processKoreanCharacter,
  completeCurrentComposition,
  getCurrentCompositionDisplay,
  processKoreanInput
} from './inputProcessor.js'