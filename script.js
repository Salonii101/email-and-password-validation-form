let passInput = document.getElementById("password");
let letter = document.getElementById("letter");
let capital = document.getElementById("capital");
let number = document.getElementById("number");
let lengthElement = document.getElementById("length");
let submitBtn = document.getElementById("submitBtn");
let form = document.getElementById("registerForm");
let strength = document.getElementById("strength");
let togglePassword = document.getElementById("togglePassword");
let emailInput = document.getElementById("email");
let emailFeedback = document.getElementById("emailFeedback");

let isLowercaseValid = false;
let isUppercaseValid = false;
let isNumberValid = false;
let isLengthValid = false;
let isEmailValid = false;

passInput.onfocus = () => {
    document.getElementById("message").style.display = "block";
};

passInput.onblur = () => {
    document.getElementById("message").style.display = "none";
};

passInput.onkeyup = () => {
    let value = passInput.value;

    // Validation rules
    isLowercaseValid = /[a-z]/.test(value);
    isUppercaseValid = /[A-Z]/.test(value);
    isNumberValid = /[0-9]/.test(value);
    isLengthValid = value.length >= 8;

    updateValidationDisplay(letter, isLowercaseValid);
    updateValidationDisplay(capital, isUppercaseValid);
    updateValidationDisplay(number, isNumberValid);
    updateValidationDisplay(lengthElement, isLengthValid);

    checkPasswordStrength(value);
    updateSubmitButton();
};

emailInput.onkeyup = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isEmailValid = emailPattern.test(emailInput.value);

    if (isEmailValid) {
        emailFeedback.textContent = "Valid Email";
        emailFeedback.style.color = "green";
    } else {
        emailFeedback.textContent = "Invalid Email";
        emailFeedback.style.color = "red";
    }

    updateSubmitButton();
};

function updateValidationDisplay(element, isValid) {
    element.classList.toggle("valid", isValid);
    element.classList.toggle("invalid", !isValid);
}

function checkPasswordStrength(value) {
    let score = 0;
    if (/[a-z]/.test(value)) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[\W_]/.test(value)) score++; // Special chars
    if (value.length >= 8) score++;

    if (score <= 2) {
        strength.textContent = "Strength: Weak";
        strength.style.color = "red";
    } else if (score === 3 || score === 4) {
        strength.textContent = "Strength: Medium";
        strength.style.color = "orange";
    } else {
        strength.textContent = "Strength: Strong";
        strength.style.color = "green";
    }
}

function updateSubmitButton() {
    submitBtn.disabled = !(isLowercaseValid && isUppercaseValid && isNumberValid && isLengthValid && isEmailValid);
}

// Prevent invalid submission
form.addEventListener("submit", function (e) {
    if (!(isLowercaseValid && isUppercaseValid && isNumberValid && isLengthValid && isEmailValid)) {
        e.preventDefault();
        alert("Please complete all fields with valid data.");
    }
});

// Toggle show/hide password
togglePassword.addEventListener("click", () => {
    passInput.type = passInput.type === "password" ? "text" : "password";
    togglePassword.textContent = passInput.type === "password" ? "👁️" : "🙈";
});

// Dark mode toggle
const toggleMode = document.getElementById("toggleMode");

toggleMode.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleMode.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});
