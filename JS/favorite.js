window.addEventListener('DOMContentLoaded', () => {
    // Load favorites from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = ""; // Clear table before populating

    favorites.forEach(product => {
        if (!product || !product.img || !product.name || !product.price) return; // Skip invalid products

        // Create table row for product
        const tr = document.createElement('tr');
        tr.dataset.productId = String(product.id);

        // Create product cells
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.className = "product-image";
        tdImage.appendChild(img);

        const tdName = document.createElement('td');
        tdName.innerHTML = `<div class="product-name">${product.name}</div><div class="product-description">Lorem ipsum dolor sit amet.</div>`;

        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price.toFixed(2)}`;

        const tdStatus = document.createElement('td');
        tdStatus.innerHTML = `<span class="stock-status">In Stock</span>`;

        const tdAdd = document.createElement('td');
        tdAdd.innerHTML = `<button class="btn">Add to Cart</button>`;

        const tdDelete = document.createElement('td');
        tdDelete.innerHTML = `<span class="trash-icon">🗑</span>`;

        // Append cells to row
        tr.append(tdImage, tdName, tdPrice, tdStatus, tdAdd, tdDelete);
        tbody.appendChild(tr);

        // Add to cart functionality
        tdAdd.querySelector('.btn').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (!cart.some(item => item.id === product.id)) {
                cart.push(product); // Add product to cart
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Product added to cart!');
                updateCartCount();
            } else {
                alert('Product is already in the cart!');
            }
        });

        // Remove from favorites functionality
        tdDelete.querySelector('.trash-icon').addEventListener('click', () => {
            tr.classList.add('delete-animation'); // Add animation
            setTimeout(() => {
                const updatedFavorites = favorites.filter(fav => fav.id !== product.id);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
                tbody.removeChild(tr); // Remove row
                updateFavoriteCount();
            }, 500); // Animation duration
        });
    });

    updateFavoriteCount(); // Update favorite count on load

    // Clear all favorites functionality
    document.getElementById('clear-all').addEventListener('click', () => {
        localStorage.removeItem('favorites'); // Clear favorites from localStorage
        tbody.innerHTML = ''; // Clear table
        updateFavoriteCount();
    });
});

// Update favorite count
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelector('.count_favourite').textContent = favorites.length;
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.count_cart');
    if (cartCountElement) cartCountElement.textContent = cart.length;
}
