document.getElementById('generate').addEventListener('click', generatePassword);
document.getElementById('copy').addEventListener('click', copyPassword);

const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';
const uniqueChars = 'æøåßðđŋħĸł';
const similarChars = 'iIl1oO0';
const omitYZChars = 'yzYZ';

function generatePassword() {
    let length = document.getElementById('length').value;
    let seed = document.getElementById('seed').value;
    let chars = '';

    if (document.getElementById('lowercase').checked) chars += lowerCaseChars;
    if (document.getElementById('uppercase').checked) chars += upperCaseChars;
    if (document.getElementById('numbers').checked) chars += numberChars;
    if (document.getElementById('symbols').checked) chars += symbolChars;
    if (document.getElementById('unique').checked) chars += uniqueChars;
    if (document.getElementById('similar').checked) chars = chars.replace(new RegExp(`[${similarChars}]`, 'g'), '');
    if (document.getElementById('omitYZ').checked) chars = chars.replace(new RegExp(`[${omitYZChars}]`, 'g'), '');

    if (seed) {
        Math.seedrandom(seed);
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById('password').value = password;

    // Show strength
    showStrength(password);

    // Add animation
    const container = document.querySelector('.container');
    container.classList.add('animate');
    setTimeout(() => container.classList.remove('animate'), 300);

    // Call worksheet.function if defined
    if (typeof worksheet !== 'undefined' && typeof worksheet.function === 'function') {
        worksheet.function(password);
    }
}

function copyPassword() {
    const passwordField = document.getElementById('password');
    passwordField.select();
    document.execCommand('copy');
}

Math.seedrandom = function(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

function showStrength(password) {
    const strengthIndicator = document.getElementById('strength');
    let strength = 'Weak';
    const lengthCriteria = password.length >= 12;
    const lowerCaseCriteria = /[a-z]/.test(password);
    const upperCaseCriteria = /[A-Z]/.test(password);
    const numberCriteria = /\d/.test(password);
    const symbolCriteria = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    if (lengthCriteria && lowerCaseCriteria && upperCaseCriteria && numberCriteria && symbolCriteria) {
        strength = 'Strong';
    } else if (lengthCriteria && (lowerCaseCriteria || upperCaseCriteria) && (numberCriteria || symbolCriteria)) {
        strength = 'Moderate';
    }

    strengthIndicator.textContent = `Strength: ${strength}`;
}

// Define worksheet object and function
const worksheet = {
    function: function(password) {
        console.log('Generated Password:', password);
        // You can add any custom functionality here
    }
};
