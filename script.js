document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyPassword);

function generatePassword() {
    const length = document.getElementById('length').value;
    const includeUppercase = document.getElementById('uppercase').checked;
    const includeLowercase = document.getElementById('lowercase').checked;
    const includeNumbers = document.getElementById('numbers').checked;
    const includeSymbols = document.getElementById('symbols').checked;
    const includeUnique = document.getElementById('unique').checked;
    const excludeSimilar = document.getElementById('similar').checked;

    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwx'; // omitting 'y' and 'z'
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const uniqueChars = 'æßðđŋħłøþ'; // example unique characters
    const similarChars = '0O1l'; // similar characters to be excluded

    let allChars = '';
    if (includeUppercase) allChars += upperCaseChars;
    if (includeLowercase) allChars += lowerCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;
    if (includeUnique) allChars += uniqueChars;

    if (excludeSimilar) {
        allChars = allChars.split('').filter(char => !similarChars.includes(char)).join('');
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById('password').value = password;
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
}