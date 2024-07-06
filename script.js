const generateButton = document.getElementById('generate');
const copyButton = document.getElementById('copy');
const passwordsDiv = document.getElementById('passwords');

generateButton.addEventListener('click', generatePasswords);
copyButton.addEventListener('click', copyToClipboard);

function generatePasswords() {
    const lowercase = document.getElementById('lowercase').checked;
    const uppercase = document.getElementById('uppercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
    const unique = document.getElementById('unique').checked;
    const similar = document.getElementById('similar').checked;
    const omit = document.getElementById('omit').checked;
    const passwordCount = parseInt(document.getElementById('passwordCount').value);
    const passwordLength = parseInt(document.getElementById('passwordLength').value);
    const seed = document.getElementById('seed').value;

    const charset = generateCharset(lowercase, uppercase, numbers, symbols, unique, similar, omit);

    passwordsDiv.innerHTML = '';
    for (let i = 0; i < passwordCount; i++) {
        const password = generatePassword(passwordLength, charset, seed);
        const passwordStrength = calculateStrength(password);
        const passwordDiv = document.createElement('div');
        passwordDiv.classList.add('password');
        passwordDiv.classList.add(passwordStrength.class);
        passwordDiv.innerText = `${password}\n${passwordStrength.text}`;
        passwordsDiv.appendChild(passwordDiv);
    }
}

function generateCharset(lowercase, uppercase, numbers, symbols, unique, similar, omit) {
    let charset = '';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) charset += '0123456789';
    if (symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (omit) charset = charset.replace(/[yzYZ]/g, '');
    if (unique) charset = [...new Set(charset)].join('');
    if (similar) charset = charset.replace(/[ilLI|1oO0]/g, '');
    return charset;
}

function generatePassword(length, charset, seed) {
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

function calculateStrength(password) {
    const length = password.length;
    let bits = Math.log2(Math.pow(password.length, 10));
    let strength = '';

    if (bits < 54) {
        strength = 'Weak (1 bit)';
        classStrength = 'weak';
    } else if (bits < 86) {
        strength = 'Medium (54 bits)';
        classStrength = 'medium';
    } else if (bits < 112) {
        strength = 'Strong (86 bits)';
        classStrength = 'strong';
    } else if (bits < 173) {
        strength = 'Very strong (112 bits)';
        classStrength = 'very-strong';
    } else {
        strength = 'Ultra strong (173 bits)';
        classStrength = 'ultra-strong';
    }
    return { text: strength, class: classStrength };
}

function copyToClipboard() {
    const text = Array.from(passwordsDiv.children).map(div => div.innerText).join('\n');
    navigator.clipboard.writeText(text).then(() => {
        alert('Passwords copied to clipboard');
    });
}