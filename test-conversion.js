/**
 * Test the conversion function directly
 */

// Import the conversion function (simulate it since we can't import ES modules in Node)
const COMPATIBILITY_TO_HANGUL_JAMO = {
  // Medial vowels
  [String.fromCharCode(0x314F)]: String.fromCharCode(0x1161), // ㅏ → ᅡ
  [String.fromCharCode(0x3150)]: String.fromCharCode(0x1162), // ㅐ → ᅢ
  [String.fromCharCode(0x3151)]: String.fromCharCode(0x1163), // ㅑ → ᅣ
  [String.fromCharCode(0x3152)]: String.fromCharCode(0x1164), // ㅒ → ᅤ
  [String.fromCharCode(0x3153)]: String.fromCharCode(0x1165), // ㅓ → ᅥ
  [String.fromCharCode(0x3154)]: String.fromCharCode(0x1166), // ㅔ → ᅦ
  [String.fromCharCode(0x3155)]: String.fromCharCode(0x1167), // ㅕ → ᅧ
  [String.fromCharCode(0x3156)]: String.fromCharCode(0x1168), // ㅖ → ᅨ
  [String.fromCharCode(0x3157)]: String.fromCharCode(0x1169), // ㅗ → ᅩ
  [String.fromCharCode(0x3158)]: String.fromCharCode(0x116A), // ㅘ → ᅪ
  [String.fromCharCode(0x3159)]: String.fromCharCode(0x116B), // ㅙ → ᅫ
  [String.fromCharCode(0x315A)]: String.fromCharCode(0x116C), // ㅚ → ᅬ
  [String.fromCharCode(0x315B)]: String.fromCharCode(0x116D), // ㅛ → ᅭ
  [String.fromCharCode(0x315C)]: String.fromCharCode(0x116E), // ㅜ → ᅮ
  [String.fromCharCode(0x315D)]: String.fromCharCode(0x116F), // ㅝ → ᅯ
  [String.fromCharCode(0x315E)]: String.fromCharCode(0x1170), // ㅞ → ᅰ
  [String.fromCharCode(0x315F)]: String.fromCharCode(0x1171), // ㅟ → ᅱ
  [String.fromCharCode(0x3160)]: String.fromCharCode(0x1172), // ㅠ → ᅲ
  [String.fromCharCode(0x3161)]: String.fromCharCode(0x1173), // ㅡ → ᅳ
  [String.fromCharCode(0x3162)]: String.fromCharCode(0x1174), // ㅢ → ᅴ
  [String.fromCharCode(0x3163)]: String.fromCharCode(0x1175), // ㅣ → ᅵ
  
  // Final consonants
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x11A8), // ㄱ → ᆨ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x11A9), // ㄲ → ᆩ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x11AE), // ㄷ → ᆮ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x11AF), // ㄹ → ᆯ
  [String.fromCharCode(0x3139)]: String.fromCharCode(0x11B7), // ㅁ → ᆷ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x11B8), // ㅂ → ᆸ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x11B9), // ㅃ → ᆹ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x11BA), // ㅅ → ᆺ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x11BB), // ㅆ → ᆻ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x11BC), // ㅇ → ᆼ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x11BD), // ㅈ → ᆽ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x11BE), // ㅊ → ᆾ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x11BF), // ㅋ → ᆿ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x11C0), // ㅌ → ᇀ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x11C1), // ㅍ → ᇁ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x11C2), // ㅎ → ᇂ
  [String.fromCharCode(0x314E)]: String.fromCharCode(0x11C2), // ㅎ → ᇂ (alternative)
}

function convertCompatibilityToHangulJamo(text) {
  return text.split('').map(char => {
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char // Return original if no mapping exists
  }).join('')
}

console.log('🧪 Testing Unicode Conversion Function\n');

// Test cases
const testCases = [
  'ᅀㅏㄴ',  // Archaic sequence
  'ㅏㄴ',    // Just medial + final
  'ᅀ',       // Just archaic initial
  'ㅏ',      // Just medial
  'ㄴ',      // Just final
  '한',      // Regular Korean (should be unchanged)
  'ABC',     // English (should be unchanged)
];

testCases.forEach((testCase, index) => {
  console.log(`Test ${index + 1}: "${testCase}"`);
  
  // Show character breakdown
  testCase.split('').forEach((char, charIndex) => {
    const code = char.charCodeAt(0);
    const hex = '0x' + code.toString(16).toUpperCase().padStart(4, '0');
    console.log(`  ${charIndex + 1}. "${char}" = ${hex} (${code})`);
  });
  
  // Convert
  const converted = convertCompatibilityToHangulJamo(testCase);
  console.log(`  Input:  "${testCase}"`);
  console.log(`  Output: "${converted}"`);
  
  // Show what changed
  if (testCase !== converted) {
    console.log(`  Changes:`);
    testCase.split('').forEach((char, charIndex) => {
      const convertedChar = converted[charIndex];
      if (char !== convertedChar) {
        console.log(`    "${char}" (U+${char.charCodeAt(0).toString(16)}) → "${convertedChar}" (U+${convertedChar.charCodeAt(0).toString(16)})`);
      }
    });
  } else {
    console.log(`  No changes needed`);
  }
  
  console.log('');
});

console.log('🎯 Expected result for "ᅀㅏㄴ":');
console.log('  ᅀ (U+1140) → ᅀ (U+1140) [unchanged - already Hangul Jamo]');
console.log('  ㅏ (U+314F) → ᅡ (U+1161) [converted - Compatibility to Hangul Jamo]');
console.log('  ㄴ (U+3134) → ᆫ (U+11AB) [converted - Compatibility to Hangul Jamo]');
console.log('  Final: "ᅀᅡᆫ" (all Hangul Jamo - should render as combined block)');
