/**
 * Korean Keyboard Layout
 * Handles Dubeolsik layout, shift mappings, and archaic variants
 */

import type { KeyboardLayout, VariantMappings } from '../types/korean.js';

// Dubeolsik keyboard layout based on the image
export const KEYBOARD_LAYOUT: KeyboardLayout = {
  row1: ['ㅿ', 'ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'],
  row2: ['ㆆ', 'ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ', 'ㆍ'],
  row3: ['shift','ㆁ', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', 'backspace'],
  row4: ['123', 'emoji', 'space', '←', '→', 'enter']
}

// Shift mappings for Dubeolsik layout
export const SHIFT_MAPPINGS: Record<string, string> = {
  // Standard Dubeolsik shift mappings
  'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ',
  'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ',
  
  // Archaic variants unique to this keyboard
  'ㄴ': 'ㅥ', 'ㄹ': 'ᄙ', 'ㅇ': 'ㆀ', 'ㅎ': 'ㆅ', 
  'ㆆ': 'ꥼ', 'ㅁ': 'ㅱ', 'ㅍ': 'ㆄ', 'ㆍ': 'ᆢ'
}

// Mapping from archaic consonants to modern equivalents for composition
export const ARCHAIC_TO_MODERN_MAPPING: Record<string, string> = {
  'ㅸ': 'ㅂ', 'ㅹ': 'ㅂ', 'ᅐ': 'ㅈ', 'ᅑ': 'ㅈ', 'ᅎ': 'ㅈ', 'ᅏ': 'ㅈ',
  'ᄼ': 'ㅅ', 'ᄾ': 'ㅅ', 'ㅱ': 'ㅁ', 'ᄔ': 'ㄴ', 'ᄙ': 'ㄹ',
  'ㆀ': 'ㅇ', 'ㆅ': 'ㅎ', 'ᅔ': 'ㅊ', 'ᅕ': 'ㅊ',
  'ㆄ': 'ㅍ'
}

// Variant letter mappings for long-press functionality
export const VARIANT_MAPPINGS: VariantMappings = {
  // Consonants
  'ㅂ': ['ㅂ', 'ㅃ', 'ㅸ', 'ㅹ'],
  'ㅈ': ['ㅈ', 'ㅉ', 'ᅎ', 'ᅐ', 'ᅏ', 'ᅑ'],
  'ㄷ': ['ㄷ', 'ㄸ'],
  'ㄱ': ['ㄱ', 'ㄲ'],
  'ㅅ': ['ㅅ', 'ㅆ', 'ᄼ', 'ᄾ', 'ᄽ', 'ᄿ'],
  'ㅁ': ['ㅁ', 'ㅱ'],
  'ㄴ': ['ㄴ', 'ㅥ'],
  'ㅇ': ['ㅇ', 'ㆀ'],
  'ㄹ': ['ㄹ', 'ᄙ'],
  'ㆆ': ['ㆆ', 'ꥼ'],
  'ㅎ': ['ㅎ', 'ㆅ'],
  'ㅋ': ['ㅋ'],
  'ㅌ': ['ㅌ'],
  'ㅊ': ['ㅊ', 'ᅔ', 'ᅕ'],
  'ㅍ': ['ㅍ', 'ㆄ'],
  
  // Vowels
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

/**
 * Get archaic variants for a character
 * @param char - Base character
 * @returns Array of variants including the base character
 */
export function getArchaicVariants(char: string): string[] {
  return VARIANT_MAPPINGS[char] || [char]
}

/**
 * Get the shifted character for a given key
 * @param char - Base character
 * @returns Shifted character or the original if no shift mapping exists
 */
export function getShiftedCharacter(char: string): string {
  return SHIFT_MAPPINGS[char] || char
}
