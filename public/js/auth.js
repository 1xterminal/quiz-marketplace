function checkLoggedIn() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!user) {
        if (isInsurancePage()) {
            window.location.href = '../../login.html';
        } else {
            window.location.href = '/login.html';
        }
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/index.html';
}

function isInsurancePage() {
    const insurancePages = [
        'car-insurance.html',
        'health-insurance.html',
        'life-insurance.html'
    ];
    const currentPage = window.location.pathname.split('/').pop();
    return insurancePages.includes(currentPage);
}

let messageTimeout;

function displayMessage(elementId, message, type) {
    const messageDiv = document.getElementById(elementId);
    if (messageDiv) {
        messageDiv.textContent = message;
        if (type) {
            messageDiv.className = type;
        } else {
            messageDiv.className = '';
        }

        clearTimeout(messageTimeout);

        if (type === 'error') {
            messageTimeout = setTimeout(() => {
                displayMessage(elementId, '', '');
            }, 3000);
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhoneNumber(phone) {
    const phoneRegex = /^08\d{8,14}$/;
    return phoneRegex.test(phone);
}

document.addEventListener('DOMContentLoaded', () => {
    if (isInsurancePage()) {
        checkLoggedIn();
    }

    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const email = loginForm.email.value.trim();
            const password = loginForm.password.value.trim();

            displayMessage('message', '', '');

            if (email === '') {
                displayMessage('message', 'Please enter your email.', 'error');
                return;
            }
            if (password === '') {
                displayMessage('message', 'Please enter your password.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                displayMessage('message', 'Email must have a valid format.', 'error');
                return;
            }

            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));

            if (storedUser && email === storedUser.email && password === storedUser.password) {
                displayMessage('message', 'Login berhasil!', 'success');
                const user = { username: storedUser.fullname };
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                displayMessage('message', 'Incorrect email or password.', 'error');
            }
        });
    }

    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const fullname = registerForm.fullname.value.trim();
            const email = registerForm.email.value.trim();
            const phone = registerForm.phone.value.trim();
            const password = registerForm.password.value.trim();
            const confirmPassword = registerForm['confirm-password'].value.trim();

            displayMessage('message-register', '', '');

            if (fullname === '') {
                displayMessage('message-register', 'Please enter your full name.', 'error');
                return;
            }
            if (email === '') {
                displayMessage('message-register', 'Please enter your email.', 'error');
                return;
            }
            if (phone === '') {
                displayMessage('message-register', 'Please enter your phone number.', 'error');
                return;
            }
            if (password === '') {
                displayMessage('message-register', 'Please enter your password.', 'error');
                return;
            }
            if (confirmPassword === '') {
                displayMessage('message-register', 'Please confirm your password.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                displayMessage('message-register', 'Email must have a valid format.', 'error');
                return;
            }

            if (password.length < 8) {
                displayMessage('message-register', 'Password must be at least 8 characters long.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                displayMessage('message-register', 'Passwords do not match.', 'error');
                return;
            }

            if (fullname.length < 3 || fullname.length > 32) {
                displayMessage('message-register', 'Full name must be between 3 and 32 characters.', 'error');
                return;
            }

            if (/\d/.test(fullname)) {
                displayMessage('message-register', 'Full name cannot contain numbers.', 'error');
                return;
            }

            if (!isValidPhoneNumber(phone)) {
                displayMessage('message-register', 'Phone number must start with 08xx, contain only numbers, and be between 10 and 16 digits long.', 'error');
                return;
            }

            const newUser = {
                fullname: fullname,
                email: email,
                phone: phone,
                password: password
            };

            localStorage.setItem('registeredUser', JSON.stringify(newUser));

            displayMessage('message-register', 'Pendaftaran berhasil! Mengarahkan ke halaman login...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
});