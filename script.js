function generatePassword() {
    const length = document.getElementById('length').value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const unique = document.getElementById('unique').checked;
    const similar = document.getElementById('similar').checked;
    const omitYZ = document.getElementById('omitYZ').checked;

    let lowercase = 'abcdefghijklnopqrstuvwx';
    let uppercase = 'ABCDEFGHIJKLNOPQRSTUVWX';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = '';
    if (includeLowercase) characters += lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (similar) {
        characters = characters.replace(/[il1LoO0]/g, '');
    }

    if (omitYZ) {
        characters = characters.replace(/[yYzZ]/g, '');
        lowercase = lowercase.replace(/[yz]/g, '');
        uppercase = uppercase.replace(/[YZ]/g, '');
    }

    if (unique) {
        characters = [...new Set(characters)].join('');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    document.getElementById('password').textContent = password;
    
    // Calculate password strength in bits
    const N = characters.length;
    const L = length;
    const strengthInBits = Math.log2(Math.pow(N, L));
    document.getElementById('strength').textContent = `Strength: ${strengthInBits.toFixed(2)} bits`;
}