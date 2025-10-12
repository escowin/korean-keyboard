/**
 * Test Unicode composition for 호ᇫ
 */

console.log('🧪 Testing Unicode Composition for 호ᇫ\n');

// The characters in question
const initial = 'ᄒ'  // U+1112
const medial = 'ᅩ'   // U+1169  
const final = 'ᇫ'    // U+11EB

console.log('Input characters:');
console.log(`  Initial: "${initial}" (U+${initial.charCodeAt(0).toString(16).toUpperCase()})`);
console.log(`  Medial:  "${medial}" (U+${medial.charCodeAt(0).toString(16).toUpperCase()})`);
console.log(`  Final:   "${final}" (U+${final.charCodeAt(0).toString(16).toUpperCase()})`);

// Calculate offsets according to Hangul composition formula
const initialOffset = initial.charCodeAt(0) - 0x1100  // ᄒ = 18
const medialOffset = medial.charCodeAt(0) - 0x1161    // ᅩ = 8
const finalOffset = final.charCodeAt(0) - 0x11A8 + 1  // ᇫ = 68

console.log('\nCalculated offsets:');
console.log(`  Initial offset: ${initialOffset}`);
console.log(`  Medial offset:  ${medialOffset}`);
console.log(`  Final offset:   ${finalOffset}`);

// Hangul composition formula: base + (initial * 588) + (medial * 28) + final
const base = 0xAC00  // 44032
const composedCode = base + (initialOffset * 588) + (medialOffset * 28) + finalOffset

console.log('\nComposition calculation:');
console.log(`  Base: ${base} (0x${base.toString(16).toUpperCase()})`);
console.log(`  Initial contribution: ${initialOffset * 588} (${initialOffset} * 588)`);
console.log(`  Medial contribution:  ${medialOffset * 28} (${medialOffset} * 28)`);
console.log(`  Final contribution:   ${finalOffset}`);
console.log(`  Total: ${composedCode} (0x${composedCode.toString(16).toUpperCase()})`);

const composedChar = String.fromCharCode(composedCode)
console.log(`\nComposed character: "${composedChar}" (U+${composedCode.toString(16).toUpperCase()})`);

// Check what the user expects vs what we get
console.log('\nExpected vs Actual:');
console.log(`  User expects: "홼"`);
console.log(`  We calculate: "${composedChar}"`);
console.log(`  Match: ${composedChar === '홼' ? '✅' : '❌'}`);

// Let's also check what 홼 actually is
const expectedChar = '홼'
console.log(`\n"홼" Unicode: U+${expectedChar.charCodeAt(0).toString(16).toUpperCase()}`);

// Check if there are any issues with the final consonant mapping
console.log('\nFinal consonant analysis:');
console.log(`  ᇫ (U+11EB) final offset: ${0x11EB - 0x11A8 + 1} = ${0x11EB - 0x11A8 + 1}`);

// Let's see what final consonant index 68 should be
const finalIndex68 = 0x11A8 + 68 - 1
console.log(`  Final consonant at index 68: U+${finalIndex68.toString(16).toUpperCase()} = "${String.fromCharCode(finalIndex68)}"`);

console.log('\n✅ Test complete!');
