document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorite = JSON.parse(localStorage.getItem('favorites')) || [];  // Get favorite items from localStorage
    const cartTableBody = document.querySelector('tbody');
    const cartTotalElement = document.getElementById('cart-total');
    const cartTotal = document.getElementById('total');
    const clearAllButton = document.getElementById('clear-all');
    const countFavorite = document.querySelector('.count_favourite');
    const countCart = document.querySelector('.count_card');

    updateCount(cart, favorite);
  
    if (cart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="6" class="empty-cart">Your cart is empty.</td></tr>';
    } else {
        displayCartItems(cart);
    }
    function displayCartItems(cart) {
        cartTableBody.innerHTML = '';
        let total = 0;
        cart.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><img src="${product.img}" alt="${product.name}" class="cart-item-image"></td>
                <td class="pdName">${product.name}</td>
                <td class="pdprice">$${product.price}</td>
                <td>
                    <input type="number" class="quantity-input" value="${product.quantity}" data-product-id="${product.id}" min="1">
                </td>
                <td class="subtotal">$${(product.price * product.quantity).toFixed(2)}</td>
                <td><button class="remove-item" data-product-id="${product.id}">Remove</button></td>
            `;

            cartTableBody.appendChild(row);
            total += product.price * product.quantity;
        });
        cartTotalElement.textContent = total.toFixed(2) + "$";
        cartTotal.textContent = total.toFixed(2) + "$";
    }
    cartTableBody.addEventListener('input', function (e) {
        if (e.target.classList.contains('quantity-input')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));
            const newQuantity = parseInt(e.target.value);
  
            const product = cart.find(item => item.id === productId);
            if (product) {
                product.quantity = newQuantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems(cart);
                updateCount(cart, favorite);
            }
        }
    });
    cartTableBody.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            const productId = parseInt(e.target.getAttribute('data-product-id'));

            const newCart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            displayCartItems(newCart);
            updateCount(newCart, favorite);
        }
    });

    clearAllButton.addEventListener('click', function () {
        localStorage.removeItem('cart');
        displayCartItems([]); 
        updateCount([], favorite);
    });
    function updateCount(cart, favorite) {
        const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
        countCart.textContent = totalCartItems;
        const totalFavoriteItems = favorite.length; 
        countFavorite.textContent = totalFavoriteItems;
    }
});
