function generatePassword() {
    const length = document.getElementById('length').value;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const unique = document.getElementById('unique').checked;
    const excludeSimilar = document.getElementById('similar').checked;
    const omitYZ = document.getElementById('omitYZ').checked;
    const seed = document.getElementById('seed').value;

    const lowercase = 'abcdefghijkmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const numbers = '23456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const similar = 'ilLIoO01';

    let characters = '';
    if (includeLowercase) characters += lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    if (omitYZ) characters = characters.replace(/[yz]/gi, '');

    if (excludeSimilar) {
        for (let char of similar) {
            characters = characters.replace(char, '');
        }
    }

    if (unique) {
        characters = [...new Set(characters.split(''))].join('');
    }

    let password = '';
    if (seed) {
        Math.seedrandom(seed);
    }
    for (let i = 0; i < length; i++) {
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const passwordField = document.getElementById('password');
    passwordField.value = password;

    // Add animation classes
    const container = document.querySelector('.container');
    container.classList.add('animate-border');
    passwordField.classList.add('animate-text');

    // Remove animation classes after animation ends
    setTimeout(() => {
        container.classList.remove('animate-border');
        passwordField.classList.remove('animate-text');
    }, 1000);
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
}

// Optional: Seeded random function (if you want to use seeded random)
Math.seedrandom = function(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}
