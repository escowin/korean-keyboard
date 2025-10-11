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

// Shift mappings for Dubeolsik layout
export const SHIFT_MAPPINGS: Record<string, string> = {
  // Standard Dubeolsik shift mappings
  'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ',
  'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ',
  
  // Archaic variants unique to this keyboard
  'ㄴ': 'ᄔ', 'ㄹ': 'ᄙ', 'ㅇ': 'ᅇ', 'ㅎ': 'ᅘ', 'ㆍ': 'ᆢ'
}

// Mapping from archaic consonants to modern equivalents for composition
export const ARCHAIC_TO_MODERN_MAPPING: Record<string, string> = {
  'ㅸ': 'ㅂ', 'ㅿ': 'ㅅ', 'ㆆ': 'ㅇ', 'ᅎ': 'ㅈ', 'ᅏ': 'ㅈ', 
  'ᅐ': 'ㅈ', 'ᅑ': 'ㅈ', 'ᄔ': 'ㄴ', 'ᅇ': 'ㅇ', 'ᄙ': 'ㄹ', 
  'ᄼ': 'ㅅ', 'ᄾ': 'ㅅ', 'ᅙ': 'ㅎ'
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
  'ㆍ': ['ㆍ', 'ᆢ']
}

// Unicode ranges for Korean characters
export const UNICODE_RANGES: KoreanUnicodeRanges = {
  // Initial consonants (초성) - Modern Korean only
  INITIAL_CONSONANTS: {
    'ㄱ': 0x1100, 'ㄲ': 0x1101, 'ㄴ': 0x1102, 'ㄷ': 0x1103, 'ㄸ': 0x1104,
    'ㄹ': 0x1105, 'ㅁ': 0x1106, 'ㅂ': 0x1107, 'ㅃ': 0x1108, 'ㅅ': 0x1109,
    'ㅆ': 0x110A, 'ㅇ': 0x110B, 'ㅈ': 0x110C, 'ㅉ': 0x110D, 'ㅊ': 0x110E,
    'ㅋ': 0x110F, 'ㅌ': 0x1110, 'ㅍ': 0x1111, 'ㅎ': 0x1112
  },
  
  // Archaic initial consonants (some can be used in syllable composition)
  ARCHAIC_INITIAL_CONSONANTS: {
    'ㅸ': 0x1170, 'ㅿ': 0x113F, 'ㆆ': 0x1146, 'ᅎ': 0x114E, 'ᅏ': 0x114F, 
    'ᅐ': 0x1150, 'ᅑ': 0x1151, 'ᄔ': 0x1114, 'ᅇ': 0x1115, 'ᄙ': 0x1116, 
    'ᄼ': 0x113C, 'ᄾ': 0x113E, 'ᅙ': 0x1155
  },
  
  // Medial vowels (중성)
  MEDIAL_VOWELS: {
    'ㅏ': 0x1161, 'ㅐ': 0x1162, 'ㅑ': 0x1163, 'ㅒ': 0x1164, 'ㅓ': 0x1165,
    'ㅔ': 0x1166, 'ㅕ': 0x1167, 'ㅖ': 0x1168, 'ㅗ': 0x1169, 'ㅘ': 0x116A,
    'ㅙ': 0x116B, 'ㅚ': 0x116C, 'ㅛ': 0x116D, 'ㅜ': 0x116E, 'ㅝ': 0x116F,
    'ㅞ': 0x1170, 'ㅟ': 0x1171, 'ㅠ': 0x1172, 'ㅡ': 0x1173, 'ㅢ': 0x1174,
    'ㅣ': 0x1175, 'ㆍ': 0x1197, 'ᆢ': 0x11A2
  },
  
  // Final consonants (종성) - Correct Unicode mappings
  FINAL_CONSONANTS: {
    'ㄱ': 0x11A8, 'ㄲ': 0x11A9, 'ㄳ': 0x11AA, 'ㄴ': 0x11AB, 'ㄵ': 0x11AC,
    'ㄶ': 0x11AD, 'ㄷ': 0x11AE, 'ㄸ': 0x11AE, 'ㄹ': 0x11AF, 'ㄺ': 0x11B0, 
    'ㄻ': 0x11B1, 'ㄼ': 0x11B2, 'ㄽ': 0x11B3, 'ㄾ': 0x11B4, 'ㄿ': 0x11B5, 
    'ㅀ': 0x11B6, 'ㅁ': 0x11B7, 'ㅂ': 0x11B8, 'ㅃ': 0x11B8, 'ㅄ': 0x11B9, 
    'ㅅ': 0x11BA, 'ㅆ': 0x11BB, 'ㅇ': 0x11BC, 'ㅈ': 0x11BD, 'ㅉ': 0x11BD, 
    'ㅊ': 0x11BE, 'ㅋ': 0x11BF, 'ㅌ': 0x11C0, 'ㅍ': 0x11C1, 'ㅎ': 0x11C2,
    'ㅸ': 0x11B9, 'ㅿ': 0x11BF, 'ㆆ': 0x11C7
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
  
  // Get Unicode codes using the new helper function
  const initialCode = initial ? getJamoUnicodeCode(initial) : null
  const medialCode = medial ? getJamoUnicodeCode(medial) : null
  const finalCode = final ? getJamoUnicodeCode(final) : null
  
  console.log('🔤 composeSyllable called with:', { initial, medial, final })
  console.log('   Unicode codes:', { initialCode, medialCode, finalCode })
  console.log('   Using getJamoUnicodeCode for all jamo characters')
  
  // If we don't have both initial and medial, return as-is
  if (!initialCode || !medialCode) {
    console.log('   Missing initial or medial, returning as-is')
    return initial + medial + final
  }
  
  // Validate that the initial consonant is in a valid range for composition
  // Standard range: 0x1100-0x1112, Extended range: 0x1113-0x1116 (for some archaic characters)
  if (initialCode < 0x1100 || initialCode > 0x1116) {
    console.log('   ❌ Initial consonant outside valid composition range:', initialCode, 'returning as-is')
    return initial + medial + final
  }
  
  console.log('   ✅ Initial consonant in valid range, proceeding with composition')
  
  // Base syllable: 가 (0xAC00)
  const base = 0xAC00
  const initialOffset = (initialCode - 0x1100) * 21 * 28
  const medialOffset = (medialCode - 0x1161) * 28
  const finalOffset = finalCode ? (finalCode - 0x11A8) : 0
  
  console.log('   📊 Composition calculation:')
  console.log('     base:', base, '(0xAC00)')
  console.log('     initialOffset:', initialOffset, '(initialCode - 0x1100) * 21 * 28')
  console.log('     medialOffset:', medialOffset, '(medialCode - 0x1161) * 28')
  console.log('     finalOffset:', finalOffset, finalCode ? '(finalCode - 0x11A8)' : '0')
  
  const syllableCode = base + initialOffset + medialOffset + finalOffset
  const result = String.fromCharCode(syllableCode)
  console.log('   🎯 Composed syllable:', result, 'code:', syllableCode, '(0x' + syllableCode.toString(16) + ')')
  
  // Debug specific case: ㅅㅗㅎ should be 솧
  if (initial === 'ㅅ' && medial === 'ㅗ' && final === 'ㅎ') {
    console.log('   🧪 DEBUG: ㅅㅗㅎ composition test')
    console.log('     Expected: 솧 (0x' + (0xAC00 + (0x1109 - 0x1100) * 21 * 28 + (0x1169 - 0x1161) * 28 + (0x11C2 - 0x11A8)).toString(16) + ')')
    console.log('     Actual: ' + result + ' (0x' + syllableCode.toString(16) + ')')
  }
  
  // Debug final consonant mapping
  if (final && finalCode) {
    console.log('   🔍 Final consonant mapping:', final, '->', finalCode, '(0x' + finalCode.toString(16) + ')')
  }
  
  return result
}

/**
 * Check if a character is a Korean consonant (modern or archaic)
 * @param char - Character to check
 * @returns Whether the character is a Korean consonant
 */
export function isConsonant(char: string): boolean {
  return char in UNICODE_RANGES.INITIAL_CONSONANTS || char in UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS
}

/**
 * Check if a character is a modern Korean consonant (can be used in syllable composition)
 * @param char - Character to check
 * @returns Whether the character is a modern Korean consonant
 */
export function isModernConsonant(char: string): boolean {
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

/**
 * Get the shifted character for a given key
 * @param char - Base character
 * @returns Shifted character or the original if no shift mapping exists
 */
export function getShiftedCharacter(char: string): string {
  return SHIFT_MAPPINGS[char] || char
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
  console.log('🔤 processKoreanCharacter called with:', char)
  console.log('   Current composition state:', compositionState)
  console.log('   Is consonant:', isConsonant(char))
  console.log('   Is vowel:', isVowel(char))
  
  if (!char) return { text: '', isComposing: false }
  
  // Handle non-Korean characters
  if (!isConsonant(char) && !isVowel(char)) {
    console.log('   Non-Korean character, completing composition')
    // Complete any pending composition
    const result = completeCurrentComposition()
    resetCompositionState()
    console.log('   Completed composition result:', result)
    return { text: result + char, isComposing: false }
  }
  
  compositionState.lastChar = char
  compositionState.isComposing = true
  
  if (isConsonant(char)) {
    console.log('   Processing as consonant')
    return processConsonant(char)
  } else if (isVowel(char)) {
    console.log('   Processing as vowel')
    return processVowel(char)
  }
  
  return { text: '', isComposing: false }
}

/**
 * Process a consonant character
 */
function processConsonant(char: string): { text: string; isComposing: boolean; completedSyllable?: string } {
  const { currentSyllable } = compositionState
  console.log('   Processing consonant:', char, 'current syllable:', currentSyllable)
  
  // Check if this is a valid consonant for syllable composition (modern or archaic)
  if (!isConsonant(char)) {
    console.log('   Not a valid consonant, completing composition')
    // Not a consonant, complete any pending composition first
    const completedText = completeCurrentComposition()
    resetCompositionState()
    return { text: completedText + char, isComposing: false }
  }
  
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
    // We have initial but no medial, this new consonant should complete the previous syllable
    const completedSyllable = completeCurrentComposition()
    resetCompositionState()
    compositionState.currentSyllable = { initial: char, medial: '', final: '' }
    return { text: completedSyllable, isComposing: true, completedSyllable }
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
 * Get the current composition display (what should be shown in the textarea)
 */
export function getCurrentCompositionDisplay(): string {
  const { currentSyllable } = compositionState
  console.log('📺 getCurrentCompositionDisplay called, current syllable:', currentSyllable)
  console.log('📺 Composition state:', compositionState)
  
  if (currentSyllable.initial) {
    // If we have a complete syllable, compose it
    if (currentSyllable.medial) {
      const composed = composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
      console.log('   ✅ Composed syllable:', composed)
      return composed
    } else {
      // Show the initial consonant as-is while composing
      console.log('   🔤 Showing initial consonant:', currentSyllable.initial)
      return currentSyllable.initial
    }
  }
  console.log('   ❌ No composition to display')
  return ''
}

/**
 * Check if a character is a composed Hangul syllable
 * @param char - Character to check
 * @returns True if the character is a composed Hangul syllable
 */
function isComposedHangulSyllable(char: string): boolean {
  const code = char.charCodeAt(0)
  // Hangul Syllables range: 0xAC00-0xD7AF
  return code >= 0xAC00 && code <= 0xD7AF
}

/**
 * Get the Unicode code for a Jamo character (either Compatibility or Jamo)
 * @param char - Jamo character
 * @returns Unicode code or null if not found
 */
function getJamoUnicodeCode(char: string): number | null {
  // First try to find in our existing mappings (Compatibility Jamo)
  if (UNICODE_RANGES.INITIAL_CONSONANTS[char]) {
    return UNICODE_RANGES.INITIAL_CONSONANTS[char]
  }
  if (UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[char]) {
    return UNICODE_RANGES.ARCHAIC_INITIAL_CONSONANTS[char]
  }
  if (UNICODE_RANGES.MEDIAL_VOWELS[char]) {
    return UNICODE_RANGES.MEDIAL_VOWELS[char]
  }
  if (UNICODE_RANGES.FINAL_CONSONANTS[char]) {
    return UNICODE_RANGES.FINAL_CONSONANTS[char]
  }
  
  // If not found, return the character's Unicode code directly
  // This handles cases where we have actual Jamo characters
  const code = char.charCodeAt(0)
  console.log(`🔍 getJamoUnicodeCode: "${char}" not in mappings, using direct code: ${code}`)
  return code
}

/**
 * Decompose a composed Hangul syllable into its components
 * @param syllable - Composed Hangul syllable
 * @returns Object with initial, medial, final components
 */
function decomposeHangulSyllable(syllable: string): { initial: string, medial: string, final: string } {
  const code = syllable.charCodeAt(0)
  const base = 0xAC00
  const initialOffset = Math.floor((code - base) / (21 * 28))
  const medialOffset = Math.floor(((code - base) % (21 * 28)) / 28)
  const finalOffset = (code - base) % 28
  
  const initialCode = 0x1100 + initialOffset
  const medialCode = 0x1161 + medialOffset
  const finalCode = finalOffset > 0 ? 0x11A8 + finalOffset : null
  
  console.log(`🔍 Decomposing "${syllable}" (${code}):`)
  console.log(`   Offsets: initial=${initialOffset}, medial=${medialOffset}, final=${finalOffset}`)
  console.log(`   Codes: initial=${initialCode} (${String.fromCharCode(initialCode)}), medial=${medialCode} (${String.fromCharCode(medialCode)}), final=${finalCode}`)
  
  return {
    initial: String.fromCharCode(initialCode),
    medial: String.fromCharCode(medialCode),
    final: finalCode ? String.fromCharCode(finalCode) : ''
  }
}

/**
 * Process Korean input and compose syllables (legacy function for backward compatibility)
 * @param input - Raw input string
 * @returns Processed string with composed syllables
 */
export function processKoreanInput(input: string): string {
  console.log('🔍 processKoreanInput called with:', input)
  if (!input) return ''
  
  let result = ''
  let currentSyllable = { initial: '', medial: '', final: '' }
  
  for (let i = 0; i < input.length; i++) {
    const char = input[i]
    console.log(`🔍 Processing char ${i}: "${char}" (${isConsonant(char) ? 'consonant' : isVowel(char) ? 'vowel' : isComposedHangulSyllable(char) ? 'composed-syllable' : 'other'})`)
    console.log(`   Current syllable:`, currentSyllable)
    
    if (isComposedHangulSyllable(char)) {
      // Handle composed Hangul syllable
      console.log(`   ✅ Composed syllable "${char}", decomposing and handling`)
      
      // Complete any current syllable first
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
      }
      
      // Decompose the syllable
      const decomposed = decomposeHangulSyllable(char)
      console.log(`   📝 Decomposed "${char}" to:`, decomposed)
      
      // If it has no final, we can add a final consonant to it
      if (!decomposed.final) {
        // This syllable can accept a final consonant
        currentSyllable = decomposed
        console.log(`   ✅ Syllable "${char}" can accept final consonant`)
      } else {
        // This syllable already has a final, add it to result
        result += char
        console.log(`   ✅ Syllable "${char}" already complete, adding to result`)
      }
    } else if (isConsonant(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // We have initial + medial, this could be final consonant
        if (currentSyllable.final) {
          // Already have final, complete current syllable and start new one
          console.log(`   ✅ Completing syllable with final, starting new with "${char}"`)
          result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
          currentSyllable = { initial: char, medial: '', final: '' }
        } else {
          // This is the final consonant
          console.log(`   ✅ Adding final consonant "${char}"`)
          currentSyllable.final = char
        }
      } else if (currentSyllable.initial && !currentSyllable.medial) {
        // We have initial but no medial, this could be a double consonant
        // For now, treat as new initial (could be enhanced for double consonants)
        console.log(`   ✅ No medial found, treating "${char}" as new initial`)
        result += currentSyllable.initial
        currentSyllable = { initial: char, medial: '', final: '' }
      } else {
        // This is the initial consonant
        console.log(`   ✅ Setting initial consonant "${char}"`)
        currentSyllable.initial = char
      }
    } else if (isVowel(char)) {
      if (currentSyllable.initial && currentSyllable.medial) {
        // We have initial + medial, complete current syllable and start new one
        console.log(`   ✅ Completing syllable, starting new with vowel "${char}"`)
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: char, final: '' }
      } else if (currentSyllable.initial) {
        // This is the medial vowel
        console.log(`   ✅ Adding medial vowel "${char}"`)
        currentSyllable.medial = char
      } else {
        // Standalone vowel
        console.log(`   ✅ Standalone vowel "${char}"`)
        result += char
      }
    } else {
      // Non-Korean character, complete current syllable if any
      console.log(`   ✅ Non-Korean character "${char}", completing syllable if any`)
      if (currentSyllable.initial) {
        result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
        currentSyllable = { initial: '', medial: '', final: '' }
      }
      result += char
    }
    
    console.log(`   Result so far: "${result}"`)
    console.log(`   Updated syllable:`, currentSyllable)
  }
  
  // Complete final syllable if any
  if (currentSyllable.initial) {
    console.log('🔍 Completing final syllable:', currentSyllable)
    result += composeSyllable(currentSyllable.initial, currentSyllable.medial, currentSyllable.final)
  }
  
  console.log('🔍 processKoreanInput result:', result)
  return result
}
