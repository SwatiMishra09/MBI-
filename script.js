function toggleForms() {
    document.getElementById("register-form").classList.toggle("hidden");
    document.getElementById("login-form").classList.toggle("hidden");
}

function togglePasswordVisibility(id) {
    const passwordField = document.getElementById(id);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

function registerUser() {
    const username = document.getElementById("reg-username").value;
    const email = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;
    const errorMsg = document.getElementById("register-error");

    errorMsg.textContent = "";

    if (!username || !email || !password || !confirmPassword) {
        errorMsg.textContent = "All fields are required!";
        return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[!@#$%^&*]/.test(password)) {
        errorMsg.textContent = "Password must be at least 8 characters long, contain one number, and one special character.";
        return;
    }

    if (password !== confirmPassword) {
        errorMsg.textContent = "Passwords do not match!";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (users[email]) {
        errorMsg.textContent = "Email is already registered!";
        return;
    }

    users[email] = { username, password };
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    toggleForms();
}

function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errorMsg = document.getElementById("login-error");

    errorMsg.textContent = "";

    if (!email || !password) {
        errorMsg.textContent = "All fields are required!";
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || {};
    if (!users[email] || users[email].password !== password) {
        errorMsg.textContent = "Incorrect email or password!";
        return;
    }

    alert(`Welcome, ${users[email].username}!`);
    window.location.href = "welcome.html";  // Redirect to a welcome page if needed
}

function forgotPassword() {
    const email = prompt("Enter your registered email:");
    const users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[email]) {
        alert("Password reset link has been sent to your email (mock)");
    } else {
        alert("Email not found!");
    }
}
