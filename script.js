function generatePassword() {
    const length = document.getElementById('length').value;
    const useLower = document.getElementById('lower').checked;
    const useUpper = document.getElementById('upper').checked;
    const useNumbers = document.getElementById('numbers').checked;
    const useSymbols = document.getElementById('symbols').checked;
    const uniqueChars = document.getElementById('unique').checked;
    const similarChars = document.getElementById('similar').checked;
    const omitYZ = document.getElementById('omitYZ').checked;
    const seed = document.getElementById('seed').value;

    let lower = 'abcdefghijklmnopqrstuvwxyz';
    let upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let numbers = '0123456789';
    let symbols = '!@#$%^&*()';
    
    if (omitYZ) {
        lower = lower.replace('y', '').replace('z', '');
        upper = upper.replace('Y', '').replace('Z', '');
    }
    
    if (similarChars) {
        const similar = 'il1Lo0O';
        lower = lower.replace(/[il]/g, '');
        upper = upper.replace(/[LO]/g, '');
        numbers = numbers.replace(/[10]/g, '');
    }
    
    let characters = '';
    if (useLower) characters += lower;
    if (useUpper) characters += upper;
    if (useNumbers) characters += numbers;
    if (useSymbols) characters += symbols;
    
    if (seed) {
        Math.seedrandom(seed);
    }
    
    let password = '';
    if (uniqueChars) {
        password = shuffleArray(characters.split('')).slice(0, length).join('');
    } else {
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
    }
    
    document.getElementById('passwordDisplay').textContent = password;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Seeded random number generator
Math.seedrandom = function(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};