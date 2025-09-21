document.addEventListener('DOMContentLoaded', function() {
    const authLinks = document.getElementById('auth-links');
    const historyLink = document.getElementById('history-link');
    let user = null;
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (loggedInUser) {
        try {
            user = JSON.parse(loggedInUser);
        } catch (e) {
            console.error("Error parsing user from localStorage", e);
        }
    }

    if (user) {
        authLinks.innerHTML = '<button id="logout-btn">Logout</button>';
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            historyLink.style.display = 'none'; 
            const isPages = window.location.pathname.includes('/pages/');
            const loginUrl = isPages ? '../../login.html' : 'login.html';
            window.location.href = loginUrl;
        });
        historyLink.style.display = 'block';
    } else {
        const isPages = window.location.pathname.includes('/pages/');
        const loginUrl = isPages ? '../../login.html' : 'login.html';
        const registerUrl = isPages ? '../../register.html' : 'register.html';

        authLinks.innerHTML = `<a href="${loginUrl}">Login</a><a href="${registerUrl}">Sign Up</a>`;
        historyLink.style.display = 'none'; 
    }

    const expandButtons = document.querySelectorAll('.expand-button');

    expandButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expandableContent = this.closest('.expandable-content');
            const fullContent = expandableContent.querySelector('.full-content');
            const summaryContent = expandableContent.querySelector('.summary-content');

            if (fullContent.style.display === 'none') {
                fullContent.style.display = 'block';
                summaryContent.style.display = 'none';
                this.textContent = 'Sembunyikan';
            } else {
                fullContent.style.display = 'none';
                summaryContent.style.display = 'block';
                this.textContent = 'Perluas';
            }
        });
    });

    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
});