/**
 * Korean Keyboard Layout
 * Handles Dubeolsik layout, shift mappings, and archaic variants
 */

import type { KeyboardLayout, ArchaicMappings } from '../types/korean.js';

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
