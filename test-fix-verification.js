/**
 * Test the fix for 호ᇫ composition
 */

// Import the conversion function (simulate it)
const COMPATIBILITY_TO_HANGUL_JAMO = {
  // Regular medial vowels
  [String.fromCharCode(0x314F)]: String.fromCharCode(0x1161), // ㅏ → ᅡ
  [String.fromCharCode(0x1169)]: String.fromCharCode(0x1169), // ᅩ → ᅩ (already in Hangul Jamo)
  
  // Regular final consonants
  [String.fromCharCode(0x3134)]: String.fromCharCode(0x11AB), // ㄴ → ᆫ
  
  // Fixed mappings
  [String.fromCharCode(0x314D)]: String.fromCharCode(0x1112), // ㅎ → ᄒ (Compatibility to Hangul Jamo initial)
  [String.fromCharCode(0x11EB)]: String.fromCharCode(0x11EB), // ᇫ → ᇫ (archaic final consonant)
}

function convertCompatibilityToHangulJamo(text) {
  return text.split('').map(char => {
    const hangulChar = COMPATIBILITY_TO_HANGUL_JAMO[char]
    return hangulChar || char
  }).join('')
}

console.log('🧪 Testing Fix for 호ᇫ Composition\n');

// Test the problematic input from console logs
const problematicInput = '호▲'  // This is what the console shows
console.log('Problematic input from console:', problematicInput);
console.log('Character breakdown:');
problematicInput.split('').forEach((char, index) => {
  console.log(`  ${index + 1}. "${char}" (U+${char.charCodeAt(0).toString(16).toUpperCase()})`);
});

// Convert using our mapping
const converted = convertCompatibilityToHangulJamo(problematicInput)
console.log('\nAfter conversion:', converted);
console.log('Converted character breakdown:');
converted.split('').forEach((char, index) => {
  console.log(`  ${index + 1}. "${char}" (U+${char.charCodeAt(0).toString(16).toUpperCase()})`);
});

// Now test the expected input
const expectedInput = '호ᇫ'
console.log('\nExpected input:', expectedInput);
console.log('Expected character breakdown:');
expectedInput.split('').forEach((char, index) => {
  console.log(`  ${index + 1}. "${char}" (U+${char.charCodeAt(0).toString(16).toUpperCase()})`);
});

// Check if they match after conversion
console.log('\nComparison:');
console.log(`  Problematic input converted: "${converted}"`);
console.log(`  Expected input:             "${expectedInput}"`);
console.log(`  Match: ${converted === expectedInput ? '✅' : '❌'}`);

// Test composition calculation
if (converted === expectedInput) {
  console.log('\n✅ Input conversion is correct, composition should work!');
  
  // Calculate the composition
  const initial = converted[0]  // ᄒ
  const medial = converted[1]   // ᅩ  
  const final = converted[2]    // ᇫ
  
  const initialOffset = initial.charCodeAt(0) - 0x1100  // 18
  const medialOffset = medial.charCodeAt(0) - 0x1161    // 8
  const finalOffset = final.charCodeAt(0) - 0x11A8 + 1  // 68
  
  const base = 0xAC00
  const composedCode = base + (initialOffset * 588) + (medialOffset * 28) + finalOffset
  const composedChar = String.fromCharCode(composedCode)
  
  console.log(`\nComposition result: "${composedChar}" (U+${composedCode.toString(16).toUpperCase()})`);
  console.log(`Expected result: "홼" (U+D67C)`);
  console.log(`Match: ${composedChar === '홼' ? '✅' : '❌'}`);
} else {
  console.log('\n❌ Input conversion still has issues');
}

console.log('\n✅ Test complete!');
