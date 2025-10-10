/**
 * Simple test utilities for Korean keyboard functionality
 */

import { 
  composeSyllable, 
  isConsonant, 
  isVowel, 
  processKoreanInput,
  getArchaicVariants 
} from './koreanKeyboard.js'

export function runTests() {
  console.log('🧪 Running Korean Keyboard Tests...')
  
  // Test syllable composition
  console.log('Testing syllable composition:')
  console.log('ㄱ + ㅏ =', composeSyllable('ㄱ', 'ㅏ')) // 가
  console.log('ㅂ + ㅏ + ㄴ =', composeSyllable('ㅂ', 'ㅏ', 'ㄴ')) // 반
  console.log('ㅎ + ㅏ + ㄴ =', composeSyllable('ㅎ', 'ㅏ', 'ㄴ')) // 한
  
  // Test character type detection
  console.log('\nTesting character type detection:')
  console.log('ㄱ is consonant:', isConsonant('ㄱ')) // true
  console.log('ㅏ is vowel:', isVowel('ㅏ')) // true
  console.log('a is consonant:', isConsonant('a')) // false
  
  // Test archaic variants
  console.log('\nTesting archaic variants:')
  console.log('ㅂ variants:', getArchaicVariants('ㅂ')) // ['ㅂ', 'ㅃ', 'ㅸ', 'ㅹ']
  console.log('ㅈ variants:', getArchaicVariants('ㅈ')) // ['ㅈ', 'ㅉ', 'ᅎ', 'ᅏ', 'ᅐ', 'ᅑ']
  console.log('ㅏ variants:', getArchaicVariants('ㅏ')) // ['ㅏ']
  
  // Test input processing
  console.log('\nTesting input processing:')
  console.log('ㄱㅏㄴ =', processKoreanInput('ㄱㅏㄴ')) // 간
  console.log('ㅎㅏㄴㄱㅡㄹ =', processKoreanInput('ㅎㅏㄴㄱㅡㄹ')) // 한글
  console.log('ㅂㅏㄴㅅㅣㅇㅗㅅ =', processKoreanInput('ㅂㅏㄴㅅㅣㅇㅗㅅ')) // 반시옷
  console.log('ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇ요 =', processKoreanInput('ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇ요')) // 안녕하세요
  
  console.log('\n✅ All tests completed!')
}

// Run tests if this module is loaded directly
if (typeof window !== 'undefined') {
  // Browser environment
  window.runKoreanKeyboardTests = runTests
} else {
  // Node.js environment
  runTests()
}
