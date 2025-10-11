/**
 * Korean Keyboard Utilities
 * Handles Dubeolsik layout, archaic letters, and syllable composition
 */

import type { 
  KeyboardLayout, 
  ArchaicMappings, 
  KoreanUnicodeRanges, 
  CompositionState
} from '../types/korean.js';

// Dubeolsik keyboard layout based on the image
export const KEYBOARD_LAYOUT: KeyboardLayout = {
  row1: ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
  row2: ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'ㆍ'],
  row3: ['shift', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'backspace'],
  row4: ['123', 'emoji', 'space', 'enter']
}

// Archaic letter mappings for long-press functionality
export const ARCHAIC_MAPPINGS: ArchaicMappings = {
  // Consonants with archaic variants
  'ㅂ': ['ㅂ', 'ㅃ', 'ㅸ', 'ㅹ'],
  'ㅈ': ['ㅈ', 'ㅉ', 'ᅎ', 'ᅐ', 'ᅏ', 'ᅑ'],
  'ㄷ': ['ㄷ', 'ㄸ'],
  'ㄱ': ['ㄱ', 'ㄲ'],
  'ㅅ': ['ㅅ', 'ㅆ', 'ㅿ', 'ᄼ', 'ᄾ','ᄽ', 'ᄿ'],
  'ㅁ': ['ㅁ', 'ㅱ'],
  'ㄴ': ['ㄴ', 'ㅥ'],
  'ㅇ': ['ㅇ', 'ㆁ', 'ᅇ'],
  'ㄹ': ['ㄹ', 'ᄙ'],
  'ㅎ': ['ㅎ', 'ㆆ', 'ㆅ'],
  'ㅋ': ['ㅋ'],
  'ㅌ': ['ㅌ'],
  'ㅊ': ['ㅊ', 'ᅔ', 'ᅕ'],
  'ㅍ': ['ㅍ', 'ㆄ'],
  
  // Vowels with archaic variants
  'ㅏ': ['ㅏ'],
  'ㅑ': ['ㅑ'],
  'ㅓ': ['ㅓ'],
  'ㅕ': ['ㅕ'],
  'ㅗ': ['ㅗ'],
  'ㅛ': ['ㅛ'],
  'ㅜ': ['ㅜ'],
  'ㅠ': ['ㅠ'],
  'ㅡ': ['ㅡ'],
  'ㅣ': ['ㅣ'],
  'ㅐ': ['ㅐ', 'ㅒ'],
  'ㅔ': ['ㅔ', 'ㅖ'],
  'ㅚ': ['ㅚ'],
  'ㅟ': ['ㅟ'],
  'ㅢ': ['ㅢ'],
  'ㅘ': ['ㅘ'],
  'ㅝ': ['ㅝ'],
  'ㅙ': ['ㅙ'],
  'ㅞ': ['ㅞ'],
  'ㅒ': ['ㅒ'],
  'ㅖ': ['ㅖ'],
  'ᆞ': ['ᆞ', 'ᆢ']
}

// Unicode ranges for Korean characters
export const UNICODE_RANGES: KoreanUnicodeRanges = {
  // Initial consonants (초성)
  INITIAL_CONSONANTS: {
    'ㄱ': 0x1100, 'ㄲ': 0x1101, 'ㄴ': 0x1102, 'ㄷ': 0x1103, 'ㄸ': 0x1104,
    'ㄹ': 0x1105, 'ㅁ': 0x1106, 'ㅂ': 0x1107, 'ㅃ': 0x1108, 'ㅅ': 0x1109,
    'ㅆ': 0x110A, 'ㅇ': 0x110B, 'ㅈ': 0x110C, 'ㅉ': 0x110D, 'ㅊ': 0x110E,
    'ㅋ': 0x110F, 'ㅌ': 0x1110, 'ㅍ': 0x1111, 'ㅎ': 0x1112, 'ㅸ': 0x1170,
    'ㅿ': 0x113F, 'ㆆ': 0x1146, 'ᅎ': 0x114E, 'ᅏ': 0x114F, 'ᅐ': 0x1150,
    'ᅑ': 0x1151, 'ᄔ': 0x1114, 'ᅇ': 0x1115, 'ᄙ': 0x1116, 'ᄼ': 0x113C,
    'ᄾ': 0x113E, 'ᅙ': 0x1155
  },
  
  // Medial vowels (중성)
  MEDIAL_VOWELS: {
    'ㅏ': 0x1161, 'ㅐ': 0x1162, 'ㅑ': 0x1163, 'ㅒ': 0x1164, 'ㅓ': 0x1165,
    'ㅔ': 0x1166, 'ㅕ': 0x1167, 'ㅖ': 0x1168, 'ㅗ': 0x1169, 'ㅘ': 0x116A,
    'ㅙ': 0x116B, 'ㅚ': 0x116C, 'ㅛ': 0x116D, 'ㅜ': 0x116E, 'ㅝ': 0x116F,
    'ㅞ': 0x1170, 'ㅟ': 0x1171, 'ㅠ': 0x1172, 'ㅡ': 0x1173, 'ㅢ': 0x1174,
    'ㅣ': 0x1175, 'ㆍ': 0x1197
  },
  
  // Final consonants (종성)
  FINAL_CONSONANTS: {
    'ㄱ': 0x11A8, 'ㄲ': 0x11A9, 'ㄳ': 0x11AA, 'ㄴ': 0x11AB, 'ㄵ': 0x11AC,
    'ㄶ': 0x11AD, 'ㄷ': 0x11AE, 'ㄹ': 0x11AF, 'ㄺ': 0x11B0, 'ㄻ': 0x11B1,
    'ㄼ': 0x11B2, 'ㄽ': 0x11B3, 'ㄾ': 0x11B4, 'ㄿ': 0x11B5, 'ㅀ': 0x11B6,
    'ㅁ': 0x11B7, 'ㅂ': 0x11B8, 'ㅄ': 0x11B9, 'ㅅ': 0x11BA, 'ㅆ': 0x11BB,
    'ㅇ': 0x11BC, 'ㅈ': 0x11BD, 'ㅊ': 0x11C0, 'ㅋ': 0x11C1, 'ㅌ': 0x11C2,
    'ㅍ': 0x11C3, 'ㅎ': 0x11C6, 'ㅸ': 0x11B9, 'ㅿ': 0x11BF, 'ㆆ': 0x11C7
  }
}

/**
 * Calculate Unicode for a Korean syllable block
 * @param initial - Initial consonant
 * @param medial - Medial vowel
 * @param final - Final consonant (optional)
 * @returns Composed syllable
 */
export function composeSyllable(initial: string, medial: string, final: string = ''): string {
  // Handle edge cases
  if (!initial && !medial && !final) return ''
  if (!initial && !medial) return final
  if (!initial && !final) return medial
  if (!medial && !final) return initial
  
  const initialCode = initial ? UNICODE_RANGES.INITIAL_CONSONANTS[initial] : null
  const medialCode = medial ? UNICODE_RANGES.MEDIAL_VOWELS[medial] : null
  const finalCode = final ? UNICODE_RANGES.FINAL_CONSONANTS[final] : null
  
  // If we don't have both initial and medial, return as-is
  if (!initialCode || !medialCode) {
    return initial + medial + final
  }
  
  // Base syllable: 가 (0xAC00)
  const base = 0xAC00
  const initialOffset = (initialCode - 0x1100) * 21 * 28
  const medialOffset = (medialCode - 0x1161) * 28
  const finalOffset = finalCode ? (finalCode - 0x11A7) : 0
  
  const syllableCode = base + initialOffset + medialOffset + finalOffset
  return String.fromCharCode(syllableCode)
}

/**
 * Check if a character is a Korean consonant
 * @param char - Character to check
 * @returns Whether the character is a Korean consonant
 */
export function isConsonant(char: string): boolean {
  return char in UNICODE_RANGES.INITIAL_CONSONANTS
}

/**
 * Check if a character is a Korean vowel
 * @param char - Character to check
 * @returns Whether the character is a Korean vowel
 */
export function isVowel(char: string): boolean {
  return char in UNICODE_RANGES.MEDIAL_VOWELS
}

/**
 * Get archaic variants for a character
 * @param char - Base character
 * @returns Array of variants including the base character
 */
export function getArchaicVariants(char: string): string[] {
  return ARCHAIC_MAPPINGS[char] || [char]
}

// Global composition state for Korean input
let compositionState: CompositionState = {
  currentSyllable: { initial: '', medial: '', final: '' },
  buffer: '',
  isComposing: false,
  lastChar: null
}

/**
 * Reset the composition state
 */
export function resetCompositionState(): void {
  compositionState = {
    currentSyllable: { initial: '', medial: '', final: '' },
    buffer: '',
    isComposing: false,
    lastChar: null
  }
}

/**
 * Get the current composition state
 */
export function getCompositionState(): CompositionState {
  return { ...compositionState }
}

/**
 * Process a single Korean character and update composition state
 * @param char - Single Korean character to process
 * @returns Object with processed text and composition status
 */
export function processKoreanCharacter(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  if (!char) return { text: '', isComposing: false }
  
  // Handle non-Korean characters
  if (!isConsonant(char) && !isVowel(char)) {
    // Complete any pending composition
    const result = completeCurrentComposition()
    resetCompositionState()
    return { text: result + char, isComposing: false }
  }
  
  compositionState.lastChar = char
  compositionState.isComposing = true
  
  if (isConsonant(char)) {
    return processConsonant(char)
  } else if (isVowel(char)) {
    return processVowel(char)
  }
  
  return { text: '', isComposing: false }
}

/**
 * Process a consonant character
 */
function processConsonant(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  const { currentSyllable } = compositionState
  
  if (currentSyllable.initial && currentSyllable.medial) {
    // We have initial + medial, this could be final consonant
    if (currentSyllable.final) {
      // Already have final, complete current syllable and start new one
      const completedSyllable = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
      compositionState.currentSyllable = { initial: char, medial: '', final: '' }
      return { text: completedSyllable, isComposing: true, completedSyllable }
    } else {
      // This is the final consonant
      compositionState.currentSyllable.final = char
      return { text: '', isComposing: true }
    }
  } else if (currentSyllable.initial && !currentSyllable.medial) {
    // We have initial but no medial, this could be a double consonant
    // For now, treat as new initial (could be enhanced for double consonants)
    const result = currentSyllable.initial
    compositionState.currentSyllable = { initial: char, medial: '', final: '' }
    return { text: result, isComposing: true }
  } else {
    // This is the initial consonant
    compositionState.currentSyllable.initial = char
    return { text: '', isComposing: true }
  }
}

/**
 * Process a vowel character
 */
function processVowel(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  const { currentSyllable } = compositionState
  
  if (currentSyllable.initial && currentSyllable.medial) {
    // We have initial + medial, complete current syllable and start new one
    const completedSyllable = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
    compositionState.currentSyllable = { initial: '', medial: char, final: '' }
    return { text: completedSyllable, isComposing: true, completedSyllable }
  } else if (currentSyllable.initial) {
    // This is the medial vowel
    compositionState.currentSyllable.medial = char
    return { text: '', isComposing: true }
  } else {
    // Standalone vowel
    return { text: char, isComposing: false }
  }
}

/**
 * Complete the current composition and return the result
 */
export function completeCurrentComposition(): string {
  const { currentSyllable } = compositionState
  if (currentSyllable.initial) {
    return composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  return ''
}

/**
 * Process Korean input and compose syllables (legacy function for backward compatibility)
 * @param input - Raw input string
 * @returns Processed string with composed syllables
 */
export function processKoreanInput(input: string): string {
  if (!input) return ''
  
  let result = ''
  let currentSyllable = { initial: '', medial: '', final: '' }
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    
    if (isConsonant(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // We have initial + medial, this could be final consonant
        if (currentSyllable.final) {
          // Already have final, complete current syllable and start new one
          result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
          currentSyllable = { initial: char, medial: '', final: '' }
        } else {
          // This is the final consonant
          currentSyllable.final = char
        }
      } else if (currentSyllable.initial && !currentSyllable.medial) {
        // We have initial but no medial, this could be a double consonant
        // For now, treat as new initial (could be enhanced for double consonants)
        result += currentSyllable.initial
        currentSyllable = { initial: char, medial: '', final: '' }
      } else {
        // This is the initial consonant
        currentSyllable.initial = char
      }
    } else if (isVowel(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // We have initial + medial, complete current syllable and start new one
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: char, final: '' }
      } else if (currentSyllable.initial) {
        // This is the medial vowel
        currentSyllable.medial = char
      } else {
        // Standalone vowel
        result += char
      }
    } else {
      // Non-Korean character, complete current syllable if any
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
      }
      result += char
    }
  }
  
  // Complete final syllable if any
  if (currentSyllable.initial) {
    result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  
  return result
}
