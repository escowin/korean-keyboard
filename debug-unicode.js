/**
 * Debug script to check what Unicode characters we're actually dealing with
 */

console.log('🔍 Unicode Debug Analysis\n');

// Test the actual characters from the app
const testChars = ['ᅀ', 'ㅏ', 'ㄴ'];

console.log('Input characters:');
testChars.forEach((char, index) => {
    const code = char.charCodeAt(0);
    const hex = '0x' + code.toString(16).toUpperCase().padStart(4, '0');
    console.log(`  ${index + 1}. "${char}" = ${hex} (${code})`);
});

console.log('\nUnicode ranges:');
console.log('  Hangul Jamo: 0x1100-0x11FF');
console.log('  Hangul Compatibility Jamo: 0x3130-0x318F');

console.log('\nCharacter analysis:');
testChars.forEach((char, index) => {
    const code = char.charCodeAt(0);
    let range = '';
    if (code >= 0x1100 && code <= 0x11FF) {
        range = 'Hangul Jamo (should combine)';
    } else if (code >= 0x3130 && code <= 0x318F) {
        range = 'Hangul Compatibility Jamo (won\'t combine)';
    } else {
        range = 'Other range';
    }
    console.log(`  "${char}": ${range}`);
});

console.log('\nExpected conversion:');
console.log('  ᅀ (U+1140) → ᅀ (U+1140) [already Hangul Jamo]');
console.log('  ㅏ (U+314F) → ᅡ (U+1161) [Compatibility → Hangul Jamo]');
console.log('  ㄴ (U+3134) → ᆫ (U+11AB) [Compatibility → Hangul Jamo]');

console.log('\nFinal expected sequence: ᅀᅡᆫ (all Hangul Jamo)');
