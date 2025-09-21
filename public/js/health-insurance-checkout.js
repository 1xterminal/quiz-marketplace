document.addEventListener('DOMContentLoaded', () => {
    const premiumDisplay = document.getElementById('premium-display');
    const payNowButton = document.getElementById('pay-now-button');
    const paymentMessage = document.getElementById('payment-message');
    const paymentDetailsPlaceholder = document.getElementById('payment-details-placeholder');

    let premium = localStorage.getItem('currentPremium');

    if (premium) {
        premium = parseFloat(premium);
        premiumDisplay.textContent = `Rp ${premium.toLocaleString('id-ID')}`;
    } else {
        premiumDisplay.textContent = 'Rp 0';
        paymentMessage.textContent = 'Tidak ada premi ditemukan. Silakan kembali dan pilih produk asuransi.';
        paymentMessage.style.color = 'red';
        payNowButton.disabled = true;
    }

    // Event listener for payment option boxes (simplified for CSS-only selection)
    document.getElementById('payment-options-grid').addEventListener('change', (event) => {
        const selectedRadio = event.target;
        if (selectedRadio.type === 'radio' && selectedRadio.name === 'payment-method') {
            paymentDetailsPlaceholder.textContent = `Anda memilih ${selectedRadio.nextElementSibling.textContent.trim()}. Pembayaran akan dilakukan.`;
            payNowButton.disabled = false;
        }
    });

    payNowButton.addEventListener('click', () => {
        const selectedPaymentRadio = document.querySelector('input[name="payment-method"]:checked');
        if (!selectedPaymentRadio) {
            paymentMessage.textContent = 'Silakan pilih metode pembayaran sebelum melanjutkan.';
            paymentMessage.style.color = 'red';
            return;
        }

        const selectedMethod = selectedPaymentRadio.value;

        paymentMessage.textContent = 'Memproses pembayaran...';
        paymentMessage.style.color = 'orange';
        payNowButton.disabled = true;

        setTimeout(() => {
            paymentMessage.textContent = 'Pembayaran berhasil! Mengarahkan ke riwayat pembelian...';
            paymentMessage.style.color = 'green';

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

            localStorage.removeItem('currentPremium');
            localStorage.removeItem('currentProductName');
            localStorage.removeItem('currentProductType');

            window.location.href = '../../history.html';
        }, 2000);
    });
});