document.addEventListener('DOMContentLoaded', () => {
    const healthInsuranceForm = document.getElementById('health-insurance-form');
    const premiumResult = document.getElementById('premium-result');
    const checkoutButton = document.getElementById('checkout-button');

    healthInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const dob = document.getElementById('dob').value;
        const smoker = parseInt(document.querySelector('input[name="smoker"]:checked')?.value);
        const hypertension = parseInt(document.querySelector('input[name="hypertension"]:checked')?.value);
        const diabetes = parseInt(document.querySelector('input[name="diabetes"]:checked')?.value);

        if (!dob || isNaN(smoker) || isNaN(hypertension) || isNaN(diabetes)) {
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

        const basePremium = 2000000;
        let k = 0;
        if (age <= 20) {
            k = 0.1;
        } else if (age > 20 && age <= 35) {
            k = 0.2;
        } else if (age > 35 && age <= 50) {
            k = 0.25;
        } else if (age > 50) {
            k = 0.4;
        }

        const premium = basePremium + (k * basePremium) + (smoker * 0.5 * basePremium) + (hypertension * 0.4 * basePremium) + (diabetes * 0.5 * basePremium);

        premiumResult.innerHTML = `<p>Your health insurance premium is: <strong>Rp ${premium.toLocaleString('id-ID')}</strong> per year.</p>`;
        checkoutButton.style.display = 'block';
    });

    checkoutButton.addEventListener('click', () => {
        // Do nothing for now
    });
});
