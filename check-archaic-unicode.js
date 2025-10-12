/**
 * Check the Unicode values for archaic initial consonants
 */

console.log('🔍 Checking Archaic Initial Consonant Unicode Values\n');

// Check Compatibility Jamo vs Hangul Jamo
const archaicChars = ['ㅿ', 'ㆀ', 'ㆁ', 'ꥼ', 'ㅸ', 'ㅱ'];

archaicChars.forEach(char => {
  const compatCode = char.charCodeAt(0);
  console.log(`"${char}" (Compatibility Jamo): U+${compatCode.toString(16).toUpperCase()}`);
});

console.log('\nExpected Hangul Jamo values:');
console.log('ㅿ → ᅀ (U+1140)');
console.log('ㆀ → ᅇ (U+1147)');
console.log('ㆁ → ᅌ (U+114C)');
console.log('ꥼ → ꥼ (U+A97C)');
console.log('ㅸ → ᄫ (U+112B)');
console.log('ㅱ → ᄝ (U+111D)');

console.log('\nRange check:');
console.log('Valid range: 0x1100-0x1159 (or 0xA97C)');
console.log('0x1140 (ᅀ):', 0x1140 >= 0x1100 && 0x1140 <= 0x1159 ? '✅' : '❌');
console.log('0x1147 (ᅇ):', 0x1147 >= 0x1100 && 0x1147 <= 0x1159 ? '✅' : '❌');
console.log('0x114C (ᅌ):', 0x114C >= 0x1100 && 0x114C <= 0x1159 ? '✅' : '❌');
console.log('0xA97C (ꥼ):', 0xA97C === 0xA97C ? '✅' : '❌');
console.log('0x112B (ᄫ):', 0x112B >= 0x1100 && 0x112B <= 0x1159 ? '✅' : '❌');
console.log('0x111D (ᄝ):', 0x111D >= 0x1100 && 0x111D <= 0x1159 ? '✅' : '❌');

console.log('\n✅ Check complete!');
