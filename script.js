const charset = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "`~!@#$%^&*()-_=+[]{}|;:'\",.<>?/\\",
};

function generatePasswords() {
    const useLowercase = document.getElementById("lowercase").checked;
    const useUppercase = document.getElementById("uppercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;
    const useUnique = document.getElementById("unique").checked;
    const useSimilar = document.getElementById("similar").checked;
    const omitYAndZ = document.getElementById("omit").checked;
    const passwordCount = parseInt(document.getElementById("passwords").value);
    const passwordLength = parseInt(document.getElementById("length").value);

    let chars = "";
    if (useLowercase) chars += charset.lowercase;
    if (useUppercase) chars += charset.uppercase;
    if (useNumbers) chars += charset.numbers;
    if (useSymbols) chars += charset.symbols;

    if (omitYAndZ) {
        chars = chars.replace(/[yzYZ]/g, "");
    }

    const passwords = [];
    for (let i = 0; i < passwordCount; i++) {
        let password = "";
        while (password.length < passwordLength) {
            const randomIndex = Math.floor(Math.random() * chars.length);
            const char = chars[randomIndex];
            if (useUnique && password.includes(char)) continue;
            password += char;
        }
        passwords.push(password);
    }

    displayPasswords(passwords);
}

function displayPasswords(passwords) {
    const output = document.getElementById("output");
    output.innerHTML = "";
    passwords.forEach(password => {
        const strength = calculateStrength(password);
        const passwordElement = document.createElement("div");
        passwordElement.innerHTML = `${password} <br><span class="password-strength">${strength}</span>`;
        output.appendChild(passwordElement);
    });
}

function calculateStrength(password) {
    const bits = Math.floor(password.length * 6.57); // Simplified entropy calculation
    if (bits < 50) return `Weak (${bits} bits)`;
    if (bits < 80) return `Medium (${bits} bits)`;
    if (bits < 110) return `Strong (${bits} bits)`;
    if (bits < 140) return `Very Strong (${bits} bits)`;
    return `Ultra Strong (${bits} bits)`;
}

function copyToClipboard() {
    const output = document.getElementById("output");
    const range = document.createRange();
    range.selectNode(output);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    alert("Copied to clipboard!");
}
