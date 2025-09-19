document.addEventListener('DOMContentLoaded', function() {
    const authLinks = document.getElementById('auth-links');
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
            const isPages = window.location.pathname.includes('/pages/');
            const loginUrl = isPages ? '../../login.html' : 'login.html';
            window.location.href = loginUrl;
        });
    } else {
        const isPages = window.location.pathname.includes('/pages/');
        const loginUrl = isPages ? '../../login.html' : 'login.html';
        const registerUrl = isPages ? '../../register.html' : 'register.html';

        authLinks.innerHTML = `<a href="${loginUrl}">Login</a><a href="${registerUrl}">Sign Up</a>`;
    }

    // Redirect to the correct insurance page based on the form selection
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const insuranceType = document.getElementById('insurance-type-select').value;
            if (insuranceType) {
                window.location.href = `pages/${insuranceType}-insurance/${insuranceType}-insurance.html`;
            }
        });
    }

    // Add event listeners to product cards to redirect to the correct insurance page
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function(event) {
            event.preventDefault();
            const cardTitle = this.querySelector('h3').textContent;
            let insuranceType = '';
            if (cardTitle.includes('Health')) {
                insuranceType = 'health';
            } else if (cardTitle.includes('Car')) {
                insuranceType = 'car';
            } else if (cardTitle.includes('Life')) {
                insuranceType = 'life';
            }
            if (insuranceType) {
                window.location.href = `pages/${insuranceType}-insurance/${insuranceType}-insurance.html`;
            }
        });
    });
});
