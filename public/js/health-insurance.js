document.addEventListener('DOMContentLoaded', () => {
    const healthInsuranceForm = document.getElementById('health-insurance-form');
    const premiumResult = document.getElementById('premium-result');
    const checkoutButton = document.getElementById('checkout-button');
    let premium = null;

    healthInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const dob = document.getElementById('dob').value;
        const occupation = document.getElementById('occupation').value.trim();
        const smoker = document.getElementById('smoker').value;
        const hypertension = document.getElementById('hypertension').value;
        const diabetes = document.getElementById('diabetes').value;

        // valiadsi
        if (!fullName || !dob || !occupation || smoker === '' || hypertension === '' || diabetes === '') {
            premiumResult.innerHTML = '<p class="error">Please fill in all required fields.</p>';
            checkoutButton.style.display = 'none';
            return;
        }

        const k1 = parseInt(smoker, 10);       // 1 or 0
        const k2 = parseInt(hypertension, 10); // 1 or 0
        const k3 = parseInt(diabetes, 10);     // 1 or 0

        // calc umur
        const birthDate = new Date(dob);
        const today = new Date();
        let u = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            u--;
        }

        // base premi dan faktor usia
        const P = 2000000;
        let m = 0;
        if (u <= 20) {
            m = 0.1;
        } else if (u <= 35) {
            m = 0.2;
        } else if (u <= 50) {
            m = 0.25;
        } else {
            m = 0.4;
        }

        // rumus: P + (m × P) + (k1 × 0.5P) + (k2 × 0.4P) + (k3 × 0.5P)
        premium = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);

        // hasil
        premiumResult.innerHTML = `
            <p>Your health insurance premium is: 
            <strong>Rp ${premium.toLocaleString('id-ID')}</strong> per year.</p>
        `;
        checkoutButton.style.display = 'block';
    });

    checkoutButton.addEventListener('click', () => {
        if (premium !== null) {
            localStorage.setItem('currentPremium', premium);
            localStorage.setItem('currentProductName', 'Health Insurance');
            localStorage.setItem('currentProductType', 'Health');
            window.location.href = '../health-insurance/health-insurance-checkout.html';
        } else {
            alert('Please calculate your premium first.');
        }
    });
});
