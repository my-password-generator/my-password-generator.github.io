function generatePassword() {
    const length = document.getElementById('length').value;
    const seed = document.getElementById('seed').value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const unique = document.getElementById('unique').checked;
    const similar = document.getElementById('similar').checked;
    const omitYZ = document.getElementById('omitYZ').checked;

    const lowercase = 'abcdefghijklnopqrstuvwx';
    const uppercase = 'ABCDEFGHIJKLNOPQRSTUVWX';
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
    }

    if (unique) {
        characters = [...new Set(characters)].join('');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = seed
            ? (Math.random() + seed.charCodeAt(i % seed.length)) % characters.length
            : Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    document.getElementById('password').textContent = password;
}