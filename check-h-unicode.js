/**
 * Check the correct Unicode for ㅎ
 */

console.log('🔍 Checking ㅎ Unicode values\n');

// Test different possible Unicode values for ㅎ
const possibleH = [
  { char: 'ㅎ', code: 'ㅎ'.charCodeAt(0), desc: 'Current test character' },
  { char: String.fromCharCode(0x314D), code: 0x314D, desc: 'U+314D' },
  { char: String.fromCharCode(0x314E), code: 0x314E, desc: 'U+314E' },
  { char: String.fromCharCode(0x1112), code: 0x1112, desc: 'U+1112 (ᄒ - Hangul Jamo)' },
]

possibleH.forEach((item, index) => {
  console.log(`${index + 1}. "${item.char}" - ${item.desc} (U+${item.code.toString(16).toUpperCase()})`);
});

console.log('\nExpected mapping:');
console.log('ㅎ (Compatibility Jamo) → ᄒ (Hangul Jamo Initial)');
console.log('U+314D → U+1112');

console.log('\nCurrent test character:');
console.log(`"ㅎ" = U+${'ㅎ'.charCodeAt(0).toString(16).toUpperCase()}`);

console.log('\n✅ Check complete!');
