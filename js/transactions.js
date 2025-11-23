// Checkout form handling
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processOrder();
        });
    }
});

function processOrder() {
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        payment: document.getElementById('payment').value
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Create order object
    const order = {
        ...formData,
        items: [...cart],
        total: calculateTotal(),
        orderDate: new Date().toISOString(),
        orderId: generateOrderId()
    };
    
    // In a real application, you would send this to a server
    // For this demo, we'll simulate the process
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-order-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Save order to localStorage (in a real app, this would be a database)
        saveOrder(order);
        
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Close modal
        closeModal('checkout-modal');
        
        // Show success message
        showOrderSuccess(order);
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Reset form
        document.getElementById('checkout-form').reset();
    }, 2000);
}

function validateForm(formData) {
    // Simple validation
    if (!formData.name.trim()) {
        alert('Please enter your full name');
        return false;
    }
    
    if (!formData.email.trim() || !isValidEmail(formData.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!formData.phone.trim()) {
        alert('Please enter your phone number');
        return false;
    }
    
    if (!formData.address.trim()) {
        alert('Please enter your delivery address');
        return false;
    }
    
    if (!formData.payment) {
        alert('Please select a payment method');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function generateOrderId() {
    return 'FUNDI-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
}

function saveOrder(order) {
    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('fundiOrders') || '[]');
    
    // Add new order
    existingOrders.push(order);
    
    // Save back to localStorage
    localStorage.setItem('fundiOrders', JSON.stringify(existingOrders));
}

function showOrderSuccess(order) {
    // Create success modal
    const successModal = document.createElement('div');
    successModal.id = 'order-success-modal';
    successModal.className = 'modal';
    successModal.style.display = 'block';
    
    successModal.innerHTML = `
        <div class="modal-content">
            <div class="order-success">
                <div class="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your order, ${order.name}!</p>
                <div class="order-details">
                    <p><strong>Order ID:</strong> ${order.orderId}</p>
                    <p><strong>Total Amount:</strong> KSh ${order.total.toLocaleString()}</p>
                    <p><strong>Payment Method:</strong> ${getPaymentMethodName(order.payment)}</p>
                </div>
                <p>You will receive a confirmation email shortly.</p>
                <button id="close-success-modal" class="cta-button">Continue Shopping</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(successModal);
    
    // Add event listener to close button
    document.getElementById('close-success-modal').addEventListener('click', function() {
        document.body.removeChild(successModal);
    });
    
    // Close when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            document.body.removeChild(successModal);
        }
    });
}

function getPaymentMethodName(paymentCode) {
    const paymentMethods = {
        'mpesa': 'M-Pesa',
        'card': 'Credit/Debit Card',
        'cash': 'Cash on Delivery'
    };
    
    return paymentMethods[paymentCode] || paymentCode;
}

// Add CSS for success modal
const successStyle = document.createElement('style');
successStyle.textContent = `
    .order-success {
        text-align: center;
        padding: 20px;
    }
    
    .success-icon {
        width: 80px;
        height: 80px;
        background-color: var(--success-color);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        margin: 0 auto 20px;
    }
    
    .order-details {
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
        margin: 20px 0;
        text-align: left;
    }
    
    .order-details p {
        margin-bottom: 10px;
    }
`;
document.head.appendChild(successStyle);