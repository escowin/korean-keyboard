/**
 * Check the correct Unicode for 홯
 */

console.log('🔍 Checking 홯 Unicode\n');

const hwot = '홯';
console.log(`"홯" Unicode: U+${hwot.charCodeAt(0).toString(16).toUpperCase()}`);

// Calculate what it should be: ᄒ(18) + ᅩ(8) + ᆺ(19)
const expectedCode = 0xAC00 + (18 * 588) + (8 * 28) + 19;
console.log(`Expected calculation: 0xAC00 + (18 * 588) + (8 * 28) + 19 = ${expectedCode} (U+${expectedCode.toString(16).toUpperCase()})`);

const actualCode = hwot.charCodeAt(0);
console.log(`Actual: ${actualCode} (U+${actualCode.toString(16).toUpperCase()})`);

console.log(`Match: ${expectedCode === actualCode ? '✅' : '❌'}`);

// Check what our calculation gives us
const ourCode = 0xAC00 + (18 * 588) + (8 * 28) + 19;
console.log(`Our calculation: ${ourCode} (U+${ourCode.toString(16).toUpperCase()}) = "${String.fromCharCode(ourCode)}"`);

console.log('\n✅ Check complete!');
