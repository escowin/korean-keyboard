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
  VARIANT_MAPPINGS,
  getArchaicVariants,
  getShiftedCharacter
} from './keyboardLayout.js'

// Re-export from Unicode module
export { 
  UNICODE_RANGES,
  FINAL_TO_INITIAL_MAPPING,
  COMPATIBILITY_TO_HANGUL_JAMO_INITIAL,
  COMPATIBILITY_TO_HANGUL_JAMO_FINAL,
  COMPATIBILITY_TO_HANGUL_JAMO_VOWEL,
  convertFinalToInitial,
  convertCompatibilityToHangulJamoByContext,
  isConsonant,
  isModernConsonant,
  isVowel
} from './unicode.js'

// Re-export from composition module
export { 
  composeSyllable,
  canFormComplexMedial,
  canFormComplexFinal,
  decomposeComplexFinal
} from './composition.js'

// Re-export from input processor module
export { 
  processKoreanInput
} from './inputProcessor.js'