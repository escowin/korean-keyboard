/**
 * Debug the 'ㅎ' character issue
 */

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
}

function convertToHangulJamoInitial(char) {
  return COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[char] || char
}

console.log('🔍 Debugging ㅎ character issue\n');

const hChar = 'ㅎ';
console.log(`Input character: "${hChar}"`);
console.log(`Unicode: U+${hChar.charCodeAt(0).toString(16).toUpperCase()}`);

const converted = convertToHangulJamoInitial(hChar);
console.log(`Converted: "${converted}"`);
console.log(`Converted Unicode: U+${converted.charCodeAt(0).toString(16).toUpperCase()}`);

console.log('\nMapping check:');
console.log(`COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[${hChar.charCodeAt(0)}]: ${COMPATIBILITY_TO_HANGUL_JAMO_INITIAL[hChar]}`);

console.log('\nExpected:');
console.log(`'ᄒ' Unicode: U+${String.fromCharCode(0x1112).charCodeAt(0).toString(16).toUpperCase()}`);

console.log('\nComposition test:');
const initialOffset = converted.charCodeAt(0) - 0x1100;
console.log(`Initial offset: ${converted.charCodeAt(0)} - 0x1100 = ${initialOffset}`);

if (initialOffset === 18) {
  console.log('✅ Correct offset for ᄒ (18)');
} else {
  console.log(`❌ Wrong offset. Expected 18, got ${initialOffset}`);
}

console.log('\n✅ Debug complete!');
