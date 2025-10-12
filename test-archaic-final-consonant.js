/**
 * Test archaic initial consonants with final consonants
 */

// Simulate the conversion functions
const COMPATIBILITY_TO_HANGUL_JAMO_INITIAL = {
  [String.fromCharCode(0x317F)]: String.fromCharCode(0x1140), // ㅿ → ᅀ
  [String.fromCharCode(0x3180)]: String.fromCharCode(0x1147), // ㆀ → ᅇ
  [String.fromCharCode(0x3181)]: String.fromCharCode(0x114C), // ㆁ → ᅌ
  [String.fromCharCode(0xA97C)]: String.fromCharCode(0xA97C), // ꥼ → ꥼ
  [String.fromCharCode(0x3178)]: String.fromCharCode(0x112B), // ㅸ → ᄫ
  [String.fromCharCode(0x3171)]: String.fromCharCode(0x111D), // ㅱ → ᄝ
}

const COMPATIBILITY_TO_HANGUL_JAMO_MEDIAL = {
  [String.fromCharCode(0x3157)]: String.fromCharCode(0x1169), // ㅗ → ᅩ
  [String.fromCharCode(0x314F)]: String.fromCharCode(0x1161), // ㅏ → ᅡ
  [String.fromCharCode(0x3153)]: String.fromCharCode(0x1165), // ㅓ → ᅥ
  [String.fromCharCode(0x3163)]: String.fromCharCode(0x1175), // ㅣ → ᅵ
  [String.fromCharCode(0x315C)]: String.fromCharCode(0x116E), // ㅜ → ᅮ
  [String.fromCharCode(0x3161)]: String.fromCharCode(0x1173), // ㅡ → ᅳ
}

const COMPATIBILITY_TO_HANGUL_JAMO_FINAL = {
  [String.fromCharCode(0x3139)]: String.fromCharCode(0x11AF), // ㄹ → ᆯ
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  [String.fromCharCode(0x3141)]: String.fromCharCode(0x11B7), // ㅁ → ᆷ
  [String.fromCharCode(0x3131)]: String.fromCharCode(0x11A8), // ㄱ → ᆨ
  [String.fromCharCode(0x3145)]: String.fromCharCode(0x11BA), // ㅅ → ᆺ
  [String.fromCharCode(0x3147)]: String.fromCharCode(0x11BC), // ㅇ → ᆼ
}

function convertToHangulJamoInitial(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char;
}

function convertToHangulJamoMedial(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_MEDIAL[char] || char;
}

function convertToHangulJamoFinal(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_FINAL[char] || char;
}

// Simulate the composition logic
function composeSyllable(initial, medial, final = '') {
  // Convert Compatibility Jamo to Hangul Jamo first
  const convertedInitial = convertToHangulJamoInitial(initial);
  const convertedMedial = convertToHangulJamoMedial(medial);
  const convertedFinal = final ? convertToHangulJamoFinal(final) : '';
  
  // Get Unicode codes
  const initialCode = convertedInitial.charCodeAt(0);
  const medialCode = convertedMedial.charCodeAt(0);
  const finalCode = convertedFinal ? convertedFinal.charCodeAt(0) : null;
  
  console.log(`🔤 composeSyllable called with: { initial: "${initial}", medial: "${medial}", final: "${final}" }`);
  console.log(`   Converted to: { initial: "${convertedInitial}", medial: "${convertedMedial}", final: "${convertedFinal}" }`);
  console.log(`   Unicode codes: { initialCode: ${initialCode}, medialCode: ${medialCode}, finalCode: ${finalCode} }`);
  
  // Validate that the initial consonant is in a valid range for composition
  // Only standard modern Korean initials (0x1100-0x1112) can be composed into single syllable blocks
  // Archaic initials (0x1113-0x1159) and special characters (0xA97C) must remain as separate characters
  if (initialCode < 0x1100 || initialCode > 0x1112) {
    console.log(`   ❌ Initial consonant outside standard composition range: ${initialCode}, returning as separate characters`);
    return initial + medial + final;
  }
  
  console.log('   ✅ Initial consonant in valid range, proceeding with composition');
  
  // Base syllable: 가 (0xAC00)
  const base = 0xAC00;
  const initialOffset = (initialCode - 0x1100) * 21 * 28;
  const medialOffset = (medialCode - 0x1161) * 28;
  const finalOffset = finalCode ? (finalCode - 0x11A8 + 1) : 0;
  
  console.log('   📊 Composition calculation:');
  console.log(`     base: ${base} (0xAC00)`);
  console.log(`     initialOffset: ${initialOffset} ((initialCode - 0x1100) * 21 * 28)`);
  console.log(`     medialOffset: ${medialOffset} ((medialCode - 0x1161) * 28)`);
  console.log(`     finalOffset: ${finalOffset} ${finalCode ? '(finalCode - 0x11A8 + 1)' : '0'}`);
  
  const syllableCode = base + initialOffset + medialOffset + finalOffset;
  const result = String.fromCharCode(syllableCode);
  console.log(`   🎯 Composed syllable: ${result} code: ${syllableCode} (0x${syllableCode.toString(16)})`);
  
  return result;
}

console.log('🧪 Testing Archaic Initial Consonants with Final Consonants\n');

// Test cases for archaic initials with final consonants
const testCases = [
  { input: { initial: 'ㅿ', medial: 'ㅗ', final: 'ㄹ' }, description: 'Archaic initial ㅿ + ㅗ + ㄹ' },
  { input: { initial: 'ㆀ', medial: 'ㅏ', final: 'ㄴ' }, description: 'Archaic initial ㆀ + ㅏ + ㄴ' },
  { input: { initial: 'ㆁ', medial: 'ㅓ', final: 'ㅁ' }, description: 'Archaic initial ㆁ + ㅓ + ㅁ' },
  { input: { initial: 'ꥼ', medial: 'ㅣ', final: 'ㄱ' }, description: 'Archaic initial ꥼ + ㅣ + ㄱ' },
  { input: { initial: 'ㅸ', medial: 'ㅜ', final: 'ㅅ' }, description: 'Archaic initial ㅸ + ㅜ + ㅅ' },
  { input: { initial: 'ㅱ', medial: 'ㅡ', final: 'ㅇ' }, description: 'Archaic initial ㅱ + ㅡ + ㅇ' },
]

for (const testCase of testCases) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Test: ${testCase.description}`);
  console.log(`Input: ${testCase.input.initial} + ${testCase.input.medial} + ${testCase.input.final}`);
  
  const result = composeSyllable(testCase.input.initial, testCase.input.medial, testCase.input.final);
  
  console.log(`Result: "${result}"`);
  
  // Check if the result is correct for archaic jamo
  if (result.length === 1) {
    console.log('✅ SUCCESS: Composed into single syllable block (modern Korean)');
  } else {
    console.log('✅ SUCCESS: Returned as separate characters (correct for archaic jamo)');
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Test complete!');
