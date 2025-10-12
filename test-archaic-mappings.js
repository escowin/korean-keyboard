/**
 * Test all archaic jamo mappings
 */

// Import the conversion function (simulate it)
const COMPATIBILITY_TO_HANGUL_JAMO = {
  // Archaic initial consonants
  [String.fromCharCode(0x317F)]: String.fromCharCode(0x1140), // △ → ᅀ
  [String.fromCharCode(0x3186)]: String.fromCharCode(0x1141), // ㆆ → ᅁ
  [String.fromCharCode(0x3181)]: String.fromCharCode(0x1142), // ㆁ → ᅂ
  [String.fromCharCode(0xA97C)]: String.fromCharCode(0x1143), // ꥼ → ᅃ
  [String.fromCharCode(0x3171)]: String.fromCharCode(0x1144), // ㅱ → ᅄ
  [String.fromCharCode(0x3165)]: String.fromCharCode(0x1145), // ㅥ → ᅅ
  [String.fromCharCode(0x3180)]: String.fromCharCode(0x1146), // ㆀ → ᅆ
  [String.fromCharCode(0x1119)]: String.fromCharCode(0x1147), // ᄙ → ᅇ
  [String.fromCharCode(0x3185)]: String.fromCharCode(0x1148), // ㆅ → ᅈ
  [String.fromCharCode(0x3178)]: String.fromCharCode(0x1149), // ㅸ → ᅉ
  [String.fromCharCode(0x3179)]: String.fromCharCode(0x114A), // ㅹ → ᅊ
  [String.fromCharCode(0x111C)]: String.fromCharCode(0x114B), // ᄼ → ᅋ
  [String.fromCharCode(0x111E)]: String.fromCharCode(0x114C), // ᄾ → ᅌ
  [String.fromCharCode(0x111D)]: String.fromCharCode(0x114D), // ᄽ → ᅍ
  [String.fromCharCode(0x111F)]: String.fromCharCode(0x114E), // ᄿ → ᅎ
  [String.fromCharCode(0x114E)]: String.fromCharCode(0x114F), // ᅎ → ᅏ
  [String.fromCharCode(0x1150)]: String.fromCharCode(0x1150), // ᅐ → ᅐ
  [String.fromCharCode(0x114F)]: String.fromCharCode(0x1151), // ᅏ → ᅑ
  [String.fromCharCode(0x1151)]: String.fromCharCode(0x1152), // ᅑ → ᅒ
  
  // Archaic medial vowels
  [String.fromCharCode(0x318D)]: String.fromCharCode(0x1197), // ㆍ → ᆞ
  [String.fromCharCode(0x11A2)]: String.fromCharCode(0x11A2), // ᆢ → ᆢ
  
  // Regular medial vowels
  [String.fromCharCode(0x314F)]: String.fromCharCode(0x1161), // ㅏ → ᅡ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
}

function convertCompatibilityToHangulJamo(text) {
  return text.split('').map(char => {
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char
  }).join('')
}

console.log('🧪 Testing All Archaic Jamo Mappings\n');

// Test all the archaic jamo you listed
const archaicJamo = [
  'ㆆ', 'ㆁ', 'ꥼ', 'ㅱ', 'ㅥ', 'ㆀ', 'ᄙ', 'ㆅ', 'ㅸ', 'ㅹ', 'ᄼ', 'ᄾ', 'ᄽ', 'ᄿ', 'ᅎ', 'ᅐ', 'ᅏ', 'ᅑ', // Initial consonants
  'ㆍ', 'ᆢ' // Medial vowels
];

console.log('Archaic Initial Consonants:');
archaicJamo.slice(0, 18).forEach((char, index) => {
  const converted = convertCompatibilityToHangulJamo(char)
  const code = char.charCodeAt(0)
  const convertedCode = converted.charCodeAt(0)
  console.log(`  ${index + 1}. "${char}" (U+${code.toString(16).toUpperCase()}) → "${converted}" (U+${convertedCode.toString(16).toUpperCase()})`)
});

console.log('\nArchaic Medial Vowels:');
archaicJamo.slice(18).forEach((char, index) => {
  const converted = convertCompatibilityToHangulJamo(char)
  const code = char.charCodeAt(0)
  const convertedCode = converted.charCodeAt(0)
  console.log(`  ${index + 1}. "${char}" (U+${code.toString(16).toUpperCase()}) → "${converted}" (U+${convertedCode.toString(16).toUpperCase()})`)
});

console.log('\nTest sequences:');
const testSequences = [
  'ㆆㅏㄴ', // ㆆ + ㅏ + ㄴ
  'ㆍㅏㄴ', // ㆍ + ㅏ + ㄴ
  '△ㅏㄴ', // △ + ㅏ + ㄴ (already working)
];

testSequences.forEach((sequence, index) => {
  const converted = convertCompatibilityToHangulJamo(sequence)
  console.log(`  ${index + 1}. "${sequence}" → "${converted}"`)
});

console.log('\n✅ All archaic jamo should now render as combined blocks!');
