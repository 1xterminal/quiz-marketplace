document.addEventListener('DOMContentLoaded', () => {
    const carInsuranceForm = document.getElementById('car-insurance-form');
    const premiumResult = document.getElementById('premium-result');
    const checkoutButton = document.getElementById('checkout-button');
    let premium = 0;

    carInsuranceForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const carYear = parseInt(document.getElementById('car-year').value);
        const carPrice = parseFloat(document.getElementById('car-price').value);

        if (isNaN(carYear) || isNaN(carPrice)) {
            premiumResult.innerHTML = '<p class="error">Please fill in all required fields correctly.</p>';
            return;
        }

        const currentYear = new Date().getFullYear();
        const carAge = currentYear - carYear;

        premium = 0;
        if (carAge >= 0 && carAge <= 3) {
            premium = 0.025 * carPrice;
        } else if (carAge > 3 && carAge <= 5) {
            if (carPrice < 200000000) {
                premium = 0.04 * carPrice;
            } else {
                premium = 0.03 * carPrice;
            }
        } else if (carAge > 5) {
            premium = 0.05 * carPrice;
        }

        if (premium > 0) {
            premiumResult.innerHTML = `<p>Your car insurance premium is: <strong>Rp ${premium.toLocaleString('id-ID')}</strong> per year.</p>`;
            checkoutButton.style.display = 'block';
        } else {
            premiumResult.innerHTML = '<p class="error">Could not calculate premium. Please check the entered values.</p>';
            checkoutButton.style.display = 'none';
        }
    });

    checkoutButton.addEventListener('click', () => {
        localStorage.setItem('currentPremium', premium);
        localStorage.setItem('currentProductName', 'Car Insurance');
        localStorage.setItem('currentProductType', 'Car');
        window.location.href = '../car-insurance/car-insurance-checkout.html';
    });
});
