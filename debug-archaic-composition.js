/**
 * Debug archaic composition formula issues
 */

console.log('🔍 Debugging Archaic Composition Formula Issues\n');

// Test the standard composition formula with archaic initials
function testComposition(initial, medial, final, description) {
  const initialCode = initial.charCodeAt(0);
  const medialCode = medial.charCodeAt(0);
  const finalCode = final ? final.charCodeAt(0) : null;
  
  console.log(`\n${description}`);
  console.log(`Input: ${initial} + ${medial} + ${final}`);
  console.log(`Unicode codes: initial=${initialCode} (0x${initialCode.toString(16)}), medial=${medialCode} (0x${medialCode.toString(16)}), final=${finalCode} (0x${finalCode.toString(16)})`);
  
  // Standard Korean composition formula
  const base = 0xAC00;
  const initialOffset = (initialCode - 0x1100) * 21 * 28;
  const medialOffset = (medialCode - 0x1161) * 28;
  const finalOffset = finalCode ? (finalCode - 0x11A8 + 1) : 0;
  
  const syllableCode = base + initialOffset + medialOffset + finalOffset;
  const result = String.fromCharCode(syllableCode);
  
  console.log(`Formula: ${base} + (${initialCode} - 0x1100) * 21 * 28 + (${medialCode} - 0x1161) * 28 + ${finalOffset}`);
  console.log(`Result: ${syllableCode} (0x${syllableCode.toString(16)}) = "${result}"`);
  
  // Check if result is in valid Korean syllable range
  const isValidKorean = syllableCode >= 0xAC00 && syllableCode <= 0xD7AF;
  console.log(`Valid Korean syllable: ${isValidKorean ? '✅' : '❌'}`);
  
  return { result, isValidKorean, syllableCode };
}

// Test with standard modern Korean (should work)
console.log('=== STANDARD MODERN KOREAN (should work) ===');
testComposition('ᄒ', 'ᅩ', 'ᆯ', 'Standard: ᄒ + ᅩ + ᆯ');

// Test with archaic initials (problematic)
console.log('\n=== ARCHAIC INITIALS (problematic) ===');
testComposition('ᅀ', 'ᅩ', 'ᆯ', 'Archaic: ᅀ + ᅩ + ᆯ');
testComposition('ᅇ', 'ᅡ', 'ᆫ', 'Archaic: ᅇ + ᅡ + ᆫ');
testComposition('ᅌ', 'ᅥ', 'ᆷ', 'Archaic: ᅌ + ᅥ + ᆷ');

// Check the ranges
console.log('\n=== UNICODE RANGE ANALYSIS ===');
console.log('Standard initial range: 0x1100-0x1112 (19 characters)');
console.log('Archaic initial range: 0x1113-0x1159 (71 characters)');
console.log('Total initial range: 0x1100-0x1159 (90 characters)');
console.log('Korean syllable range: 0xAC00-0xD7AF (11,172 characters)');

// Calculate maximum possible syllable code
const maxInitial = 0x1159;
const maxMedial = 0x1175;
const maxFinal = 0x11C2;
const maxSyllableCode = 0xAC00 + (maxInitial - 0x1100) * 21 * 28 + (maxMedial - 0x1161) * 28 + (maxFinal - 0x11A8 + 1);
console.log(`Maximum possible syllable code: ${maxSyllableCode} (0x${maxSyllableCode.toString(16)})`);
console.log(`Within Korean range: ${maxSyllableCode <= 0xD7AF ? '✅' : '❌'}`);

console.log('\n✅ Debug complete!');
