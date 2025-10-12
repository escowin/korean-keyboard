/**
 * Test the fixed Unicode mappings
 */

// Simulate the new conversion functions
const COMPATIBILITY_TO_HANGUL_JAMO_INITIAL = {
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x1100), // ㄱ → ᄀ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x1101), // ㄲ → ᄁ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x1102), // ㄴ → ᄂ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x1103), // ㄷ → ᄃ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x1105), // ㄹ → ᄅ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x1106), // ㅁ → ᄆ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x1107), // ㅂ → ᄇ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x1109), // ㅅ → ᄉ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x110A), // ㅆ → ᄊ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x110B), // ㅇ → ᄋ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x110C), // ㅈ → ᄌ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x110E), // ㅊ → ᄎ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x110F), // ㅋ → ᄏ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x1110), // ㅌ → ᄐ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x1111), // ㅍ → ᄑ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1112), // ㅎ → ᄒ
  [String.fromCharCode(0x314E)]: String.fromCharCode(0x1112), // ㅎ → ᄒ (alternative Unicode)
}

const COMPATIBILITY_TO_HANGUL_JAMO_FINAL = {
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x11A8), // ㄱ → ᆨ
  [String.fromCharCode(0x3132)]: String.fromCharCode(0x11A9), // ㄲ → ᆩ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  [String.fromCharCode(0x3137)]: String.fromCharCode(0x11AE), // ㄷ → ᆮ
  [String.fromCharCode(0x3138)]: String.fromCharCode(0x11AF), // ㄹ → ᆯ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x11B7), // ㅁ → ᆷ
  [String.fromCharCode(0x3142)]: String.fromCharCode(0x11B8), // ㅂ → ᆸ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x11BA), // ㅅ → ᆺ
  [String.fromCharCode(0x3146)]: String.fromCharCode(0x11BB), // ㅆ → ᆻ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x11BC), // ㅇ → ᆼ
  [String.fromCharCode(0x3148)]: String.fromCharCode(0x11BD), // ㅈ → ᆽ
  [String.fromCharCode(0x3149)]: String.fromCharCode(0x11BE), // ㅊ → ᆾ
  [String.fromCharCode(0x314A)]: String.fromCharCode(0x11BF), // ㅋ → ᆿ
  [String.fromCharCode(0x314B)]: String.fromCharCode(0x11C0), // ㅌ → ᇀ
  [String.fromCharCode(0x314C)]: String.fromCharCode(0x11C1), // ㅍ → ᇁ
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x11C2), // ㅎ → ᇂ
}

const COMPATIBILITY_TO_HANGUL_JAMO_MEDIAL = {
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
}

function convertToHangulJamoInitial(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char
}

function convertToHangulJamoFinal(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char] || char
}

function convertToHangulJamoMedial(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_MEDIAL[char] || char
}

console.log('🧪 Testing Fixed Unicode Mappings\n');

// Test basic modern Korean
const testCases = [
  { input: 'ㅎㅗㅅ', expected: '홋', description: 'Basic: ㅎ+ㅗ+ㅅ' },
  { input: 'ㄱㅏㄴ', expected: '간', description: 'Basic: ㄱ+ㅏ+ㄴ' },
  { input: 'ㅂㅏㅁ', expected: '밤', description: 'Basic: ㅂ+ㅏ+ㅁ' },
]

for (const testCase of testCases) {
  console.log(`\nTest: ${testCase.description}`);
  console.log(`Input: "${testCase.input}"`);
  
  const initial = convertToHangulJamoInitial(testCase.input[0]);
  const medial = convertToHangulJamoMedial(testCase.input[1]);
  const final = convertToHangulJamoFinal(testCase.input[2]);
  
  console.log(`Converted: "${initial}${medial}${final}"`);
  
  // Calculate composition
  const initialOffset = initial.charCodeAt(0) - 0x1100;
  const medialOffset = medial.charCodeAt(0) - 0x1161;
  const finalOffset = final.charCodeAt(0) - 0x11A8 + 1;
  
  const base = 0xAC00;
  const composedCode = base + (initialOffset * 588) + (medialOffset * 28) + finalOffset;
  const composedChar = String.fromCharCode(composedCode);
  
  console.log(`Composition: ${initialOffset} + ${medialOffset} + ${finalOffset} = ${composedCode} (U+${composedCode.toString(16).toUpperCase()})`);
  console.log(`Result: "${composedChar}"`);
  console.log(`Expected: "${testCase.expected}"`);
  console.log(`Match: ${composedChar === testCase.expected ? '✅' : '❌'}`);
}

console.log('\n✅ Test complete!');
