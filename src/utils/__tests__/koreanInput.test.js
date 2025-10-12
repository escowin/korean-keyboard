/**
 * Tests for Korean input processing and archaic jamo rendering
 */

import { processKoreanInput, composeSyllable } from '../koreanKeyboard.js'

describe('Korean Input Processing', () => {
  describe('Modern Korean', () => {
    test('should compose simple syllables correctly', () => {
      expect(processKoreanInput('ㄱㅏㄴ')).toBe('간')
      expect(processKoreanInput('ㅅㅗㅎ')).toBe('솧')
      expect(processKoreanInput('ㅂㅏㅁ')).toBe('밤')
    })

    test('should handle complex medials correctly', () => {
      expect(processKoreanInput('ㅎㅗㅏ')).toBe('화')
      expect(processKoreanInput('ㅂㅜㅓ')).toBe('붜')
    })

    test('should handle complex finals correctly', () => {
      expect(processKoreanInput('ㄷㅏㄹㄱ')).toBe('닭')
      expect(processKoreanInput('ㅇㅏㄴㅈ')).toBe('앉')
    })
  })

  describe('Archaic Korean', () => {
    test('should handle archaic jamo as separate characters', () => {
      // Test archaic initial consonant
      const result = processKoreanInput('ᅀㅏㄴ')
      console.log('Archaic result:', result)
      expect(result).toBe('ᅀㅏㄴ')
    })

    test('should detect archaic jamo in composition', () => {
      // Test that archaic jamo trigger the "outside valid range" behavior
      const result = composeSyllable('ᅀ', 'ㅏ', 'ㄴ')
      console.log('Archaic composition result:', result)
      expect(result).toBe('ᅀㅏㄴ')
    })
  })

  describe('Unicode Values', () => {
    test('should verify archaic jamo Unicode values', () => {
      const archaicInitial = 'ᅀ'
      const medial = 'ㅏ'
      const final = 'ㄴ'
      
      console.log('ᅀ Unicode:', archaicInitial.charCodeAt(0), '0x' + archaicInitial.charCodeAt(0).toString(16))
      console.log('ㅏ Unicode:', medial.charCodeAt(0), '0x' + medial.charCodeAt(0).toString(16))
      console.log('ㄴ Unicode:', final.charCodeAt(0), '0x' + final.charCodeAt(0).toString(16))
      
      expect(archaicInitial.charCodeAt(0)).toBe(4416) // U+1140
      expect(medial.charCodeAt(0)).toBe(4449) // U+1161
      expect(final.charCodeAt(0)).toBe(4523) // U+11AB
    })
  })
})
