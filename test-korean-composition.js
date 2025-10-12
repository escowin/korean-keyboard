/**
 * Comprehensive automated test for Korean composition issues
 */

// Import the necessary functions (simulate them)
const COMPATIBILITY_TO_HANGUL_JAMO = {
  // Regular medial vowels
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
  
  // Regular final consonants
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
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1112), // ㅎ → ᄒ (Compatibility to Hangul Jamo initial)
  
  // Archaic final consonants
  [String.fromCharCode(0x11EB)]: String.fromCharCode(0x11EB), // ᇫ → ᇫ (archaic final consonant)
  [String.fromCharCode(0x25B2)]: String.fromCharCode(0x11EB), // ▲ → ᇫ (triangle to archaic final consonant)
}

function convertCompatibilityToHangulJamo(text) {
  return text.split('').map(char => {
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char
  }).join('')
}

// Test cases for Korean composition
const testCases = [
  // Basic modern Korean
  { input: 'ㅎㅗㅅ', expected: '홯', description: 'Basic modern Korean: ㅎ+ㅗ+ㅅ' },
  { input: 'ㄱㅏㄴ', expected: '간', description: 'Basic modern Korean: ㄱ+ㅏ+ㄴ' },
  { input: 'ㅂㅏㅁ', expected: '밤', description: 'Basic modern Korean: ㅂ+ㅏ+ㅁ' },
  
  // Complex medials
  { input: 'ㅎㅗㅏ', expected: '화', description: 'Complex medial: ㅎ+ㅗ+ㅏ' },
  { input: 'ㄱㅗㅏ', expected: '과', description: 'Complex medial: ㄱ+ㅗ+ㅏ' },
  { input: 'ㅂㅜㅓ', expected: '붜', description: 'Complex medial: ㅂ+ㅜ+ㅓ' },
  
  // Complex finals
  { input: 'ㄷㅏㄹㄱ', expected: '닭', description: 'Complex final: ㄷ+ㅏ+ㄹ+ㄱ' },
  { input: 'ㅅㅏㄹㅁ', expected: '삶', description: 'Complex final: ㅅ+ㅏ+ㄹ+ㅁ' },
  { input: 'ㅂㅏㄹㅂ', expected: '밟', description: 'Complex final: ㅂ+ㅏ+ㄹ+ㅂ' },
  
  // Archaic jamo
  { input: '△ㅏㄴ', expected: 'ᅀᅡᆫ', description: 'Archaic initial: △+ㅏ+ㄴ' },
  { input: 'ㆆㅏㄴ', expected: 'ᅙᅡᆫ', description: 'Archaic initial: ㆆ+ㅏ+ㄴ' },
  { input: 'ㅸㅏㄴ', expected: 'ᄫᅡᆫ', description: 'Archaic initial: ㅸ+ㅏ+ㄴ' },
  { input: 'ㅱㅏㄴ', expected: 'ᄝᅡᆫ', description: 'Archaic initial: ㅱ+ㅏ+ㄴ' },
  { input: 'ㅥㅏㄴ', expected: 'ᄔᅡᆫ', description: 'Archaic initial: ㅥ+ㅏ+ㄴ' },
  
  // Archaic medials
  { input: 'ㅎㆍㄴ', expected: 'ᄒᆞᆫ', description: 'Archaic medial: ㅎ+ㆍ+ㄴ' },
  { input: 'ㄱᆢㄴ', expected: 'ᄀᆢᆫ', description: 'Archaic medial: ㄱ+ᆢ+ㄴ' },
  
  // Mixed archaic and modern
  { input: '△ㅗㅅ', expected: 'ᅀᅩᆺ', description: 'Mixed archaic: △+ㅗ+ㅅ' },
  { input: 'ㆆㅗㅅ', expected: 'ᅙᅩᆺ', description: 'Mixed archaic: ㆆ+ㅗ+ㅅ' },
  
  // Problematic cases from console logs
  { input: 'ㅗㅅㅎ', expected: 'ᅙᅩᆺ', description: 'Problematic case: ㅗ+ㅅ+ㅎ' },
  { input: '로△', expected: '됐', description: 'Problematic case: 로+△' },
]

console.log('🧪 Comprehensive Korean Composition Test\n');
console.log('=' * 60);

let passedTests = 0;
let failedTests = 0;
const failedCases = [];

for (let i = 0; i < testCases.length; i++) {
  const testCase = testCases[i];
  console.log(`\nTest ${i + 1}: ${testCase.description}`);
  console.log(`Input: "${testCase.input}"`);
  console.log(`Expected: "${testCase.expected}"`);
  
  // Analyze input characters
  console.log('Input analysis:');
  testCase.input.split('').forEach((char, index) => {
    const code = char.charCodeAt(0);
    console.log(`  ${index}: "${char}" (U+${code.toString(16).toUpperCase()})`);
  });
  
  // Convert to Hangul Jamo
  const converted = convertCompatibilityToHangulJamo(testCase.input);
  console.log(`Converted: "${converted}"`);
  
  // Analyze converted characters
  console.log('Converted analysis:');
  converted.split('').forEach((char, index) => {
    const code = char.charCodeAt(0);
    console.log(`  ${index}: "${char}" (U+${code.toString(16).toUpperCase()})`);
  });
  
  // Calculate composition
  if (converted.length >= 2) {
    const initial = converted[0];
    const medial = converted[1];
    const final = converted[2] || '';
    
    if (initial && medial) {
      const initialOffset = initial.charCodeAt(0) - 0x1100;
      const medialOffset = medial.charCodeAt(0) - 0x1161;
      const finalOffset = final ? (final.charCodeAt(0) - 0x11A8 + 1) : 0;
      
      const base = 0xAC00;
      const composedCode = base + (initialOffset * 588) + (medialOffset * 28) + finalOffset;
      const composedChar = String.fromCharCode(composedCode);
      
      console.log(`Composition calculation:`);
      console.log(`  Initial offset: ${initialOffset}`);
      console.log(`  Medial offset: ${medialOffset}`);
      console.log(`  Final offset: ${finalOffset}`);
      console.log(`  Composed code: ${composedCode} (U+${composedCode.toString(16).toUpperCase()})`);
      console.log(`  Composed char: "${composedChar}"`);
      
      // Check result
      if (composedChar === testCase.expected) {
        console.log('✅ PASS');
        passedTests++;
      } else {
        console.log('❌ FAIL');
        console.log(`  Expected: "${testCase.expected}"`);
        console.log(`  Got: "${composedChar}"`);
        failedTests++;
        failedCases.push({
          ...testCase,
          actual: composedChar,
          converted: converted
        });
      }
    } else {
      console.log('❌ FAIL - Missing initial or medial');
      failedTests++;
      failedCases.push({
        ...testCase,
        actual: 'MISSING_COMPONENTS',
        converted: converted
      });
    }
  } else {
    console.log('❌ FAIL - Input too short');
    failedTests++;
    failedCases.push({
      ...testCase,
      actual: 'TOO_SHORT',
      converted: converted
    });
  }
}

console.log('\n' + '=' * 60);
console.log(`\n📊 Test Results:`);
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📈 Success Rate: ${((passedTests / testCases.length) * 100).toFixed(1)}%`);

if (failedCases.length > 0) {
  console.log('\n🔍 Failed Cases Analysis:');
  failedCases.forEach((failedCase, index) => {
    console.log(`\n${index + 1}. ${failedCase.description}`);
    console.log(`   Input: "${failedCase.input}"`);
    console.log(`   Expected: "${failedCase.expected}"`);
    console.log(`   Actual: "${failedCase.actual}"`);
    console.log(`   Converted: "${failedCase.converted}"`);
  });
  
  console.log('\n🔧 Recommendations:');
  console.log('1. Check Unicode mappings in COMPATIBILITY_TO_HANGUL_JAMO');
  console.log('2. Verify character detection logic in App.tsx');
  console.log('3. Fix visual rendering delay in React state updates');
  console.log('4. Ensure consistent archaic jamo detection');
}

console.log('\n✅ Test complete!');
