document.addEventListener('DOMContentLoaded', () => {
    const lifeInsuranceForm = document.getElementById('life-insurance-form');
    const premiumResult = document.getElementById('premium-result');
    const checkoutButton = document.getElementById('checkout-button');

    lifeInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dob = document.getElementById('dob').value;
        const sumAssured = parseFloat(document.getElementById('sum-assured').value);

        if (!dob || isNaN(sumAssured)) {
            premiumResult.innerHTML = '<p class="error">Please fill in all required fields.</p>';
            return;
        }

        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        let rate = 0;
        if (age <= 30) {
            rate = 0.002;
        } else if (age > 30 && age <= 50) {
            rate = 0.004;
        } else if (age > 50) {
            rate = 0.01;
        }

        premium = sumAssured * rate;

        premiumResult.innerHTML = `<p>Your life insurance premium is: <strong>Rp ${premium.toLocaleString('id-ID')}</strong> per month.</p>`;
        checkoutButton.style.display = 'block';
    });

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('currentPremium', premium);
        localStorage.setItem('currentProductName', 'Life Insurance');
        localStorage.setItem('currentProductType', 'Life');
        window.location.href = '../life-insurance/life-insurance-checkout.html';
    });
});
