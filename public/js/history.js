document.addEventListener('DOMContentLoaded', () => {
    const historyList = document.getElementById('history-list');

    // Check if user is logged in
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser || !loggedInUser.username) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
        return;
    }

    const username = loggedInUser.username;
    let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    const userPurchases = purchaseHistory.filter(purchase => purchase.username === username);

    if (userPurchases.length === 0) {
        historyList.innerHTML = '<p>No purchase history found.</p>';
    } else {
        let historyHtml = '';
        userPurchases.forEach(purchase => {
            historyHtml += createHistoryCard(purchase);
        });
        historyList.innerHTML = historyHtml;
    }
});

function createHistoryCard(purchase) {
    const date = new Date(purchase.purchaseDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const price = `Rp ${purchase.pricePaid.toLocaleString('id-ID')}`;
    const statusClass = purchase.paymentStatus.toLowerCase().replace(' ', '-');

    return `
        <div class="history-card">
            <div class="history-card-section">
                <span class="history-card-label">Product</span>
                <span class="history-card-value product-name">${purchase.productName}</span>
            </div>
            <div class="history-card-section">
                <span class="history-card-label">Jenis</span>
                <span class="history-card-value">${purchase.jenis}</span>
            </div>
            <div class="history-card-section">
                <span class="history-card-label">Date</span>
                <span class="history-card-value">${date}</span>
            </div>
            <div class="history-card-section">
                <span class="history-card-label">Price</span>
                <span class="history-card-value">${price}</span>
            </div>
            <div class="history-card-section">
                <span class="history-card-label">Status</span>
                <span class="history-card-value"><span class="status-badge ${statusClass}">${purchase.paymentStatus}</span></span>
            </div>
        </div>
    `;
}