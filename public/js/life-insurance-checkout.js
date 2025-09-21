document.addEventListener('DOMContentLoaded', () => {
    const premiumDisplay = document.getElementById('premium-display');
    const payNowButton = document.getElementById('pay-now-button');
    const paymentMessage = document.getElementById('payment-message');
    const paymentMethodSelect = document.getElementById('payment-method-select');
    const paymentDetailsPlaceholder = document.getElementById('payment-details-placeholder');

    // Retrieve premium from localStorage
    let premium = localStorage.getItem('currentPremium');

    if (premium) {
        premium = parseFloat(premium);
        premiumDisplay.textContent = `Rp ${premium.toLocaleString('id-ID')}`; // Format as currency
    } else {
        premiumDisplay.textContent = 'Rp 0';
        paymentMessage.textContent = 'No premium found. Please go back and select an insurance product.';
        paymentMessage.style.color = 'red';
        payNowButton.disabled = true;
    }

    paymentMethodSelect.addEventListener('change', () => {
        const selectedMethod = paymentMethodSelect.value;
        if (selectedMethod) {
            paymentDetailsPlaceholder.textContent = `You selected ${selectedMethod}. Payment will be simulated.`;
            payNowButton.disabled = false;
        } else {
            paymentDetailsPlaceholder.textContent = 'Please select a payment method.';
            payNowButton.disabled = true;
        }
    });

    payNowButton.addEventListener('click', () => {
        const selectedMethod = paymentMethodSelect.value;
        if (!selectedMethod) {
            paymentMessage.textContent = 'Please select a payment method before proceeding.';
            paymentMessage.style.color = 'red';
            return;
        }

        // Simulate payment process
        paymentMessage.textContent = 'Processing payment...';
        paymentMessage.style.color = 'orange';
        payNowButton.disabled = true;

        setTimeout(() => {
            // Assume payment is successful
            paymentMessage.textContent = 'Payment successful! Redirecting to purchase history...';
            paymentMessage.style.color = 'green';

            // Retrieve product name and user info
            const productName = localStorage.getItem('currentProductName');
            const productType = localStorage.getItem('currentProductType');
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (premium && productName && loggedInUser && loggedInUser.username) {
                const purchase = {
                    username: loggedInUser.username,
                    productName: productName,
                    jenis: productType,
                    pricePaid: premium,
                    purchaseDate: new Date().toISOString(),
                    paymentStatus: 'lunas'
                };

                let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
                purchaseHistory.push(purchase);
                localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
            }

            localStorage.removeItem('currentPremium'); // Clear premium after successful payment
            localStorage.removeItem('currentProductName'); // Clear product name after successful payment
            localStorage.removeItem('currentProductType');

            // Redirect to history.html
            window.location.href = '../../history.html';
        }, 2000); // Simulate 2-second payment processing
    });
});