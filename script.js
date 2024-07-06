document.getElementById('generateBtn').addEventListener('click', generatePasswords);
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);
document.getElementById('seed').addEventListener('input', updateSeed);

let seedValue = '';

function updateSeed(event) {
    seedValue = event.target.value;
}

function generatePasswords() {
    const lowercase = document.getElementById('lowercase').checked;
    const uppercase = document.getElementById('uppercase').checked;
    const numbers = document.getElementById('numbers').checked;
    const symbols = document.getElementById('symbols').checked;
    const uniqueChars = document.getElementById('uniqueChars').checked;
    const similarChars = document.getElementById('similarChars').checked;
    const omitYz = document.getElementById('omitYz').checked;
    const passwordCount = document.getElementById('passwordCount').value;
    const passwordLength = document.getElementById('passwordLength').value;

    let characters = '';
    if (lowercase) characters += 'abcdefghijklmno';
    if (uppercase) characters += 'ABCDEFGHIJKLMNO';
    if (numbers) characters += '0123456789';
    if (symbols) characters += '#$^*()@[]{}|~`';

    if (uniqueChars) characters = [...new Set(characters)].join('');
    if (omitYz) characters = characters.replace(/[yzYZ]/g, '');
    if (similarChars) characters += 'il1Lo0O';

    const passwords = [];
    for (let i = 0; i < passwordCount; i++) {
        let password = '';
        for (let j = 0; j < passwordLength; j++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        passwords.push(password);
    }

    document.getElementById('output').value = passwords.join('\n');
}

function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Copied to clipboard');
}

const darkModeToggle = document.createElement('button');
darkModeToggle.textContent = 'Toggle Dark/Light Mode';
darkModeToggle.style.marginTop = '20px';
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});
document.body.appendChild(darkModeToggle);