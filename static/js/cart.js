// Function to set a cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiry time
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

// Initialize cart as an empty array
let cart = JSON.parse(getCookie('cart')) || [];

// DOM elements
const cartLink = document.getElementById('cart-link');
const cartSection = document.getElementById('cart-section');
const cartItemsList = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Update the cart UI and save to cookies
function updateCart() {
    cartItemsList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.product} - $${item.price}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });
    totalPriceElement.textContent = `Total: $${total}`;
    
    // Save cart to cookies
    setCookie('cart', JSON.stringify(cart), 7); // Set the cookie for 7 days
}

// Add product to cart
function addToCart(event) {
    const button = event.target;
    const product = button.getAttribute('data-product');
    const price = parseFloat(button.getAttribute('data-price'));
    const imageDATA = button.getAttribute('data-img');

    cart.push({ product, price, imageDATA });

    updateCart();
}

// Show cart when Cart link is clicked
cartLink.addEventListener('click', () => {
    cartSection.style.display = 'block';
});

// Empty the cart
function emptyCart() {
    cart = [];
    updateCart();
}

// Add event listeners to all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Initialize cart display
updateCart();

// Checkout function (redirect to checkout page)
function checkout() {
    window.location.href = '/cart'; // Redirect to the cart page for checkout
}
