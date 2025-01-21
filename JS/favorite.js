window.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = "";

    favorites.forEach(product => {
        // Validate product properties before proceeding
        if (!product || !product.img || !product.name || !product.price) {
            console.error('Invalid product data:', product);
            return; // Skip this product if data is incomplete
        }

        const tr = document.createElement('tr');
        tr.dataset.productId = String(product.id);

        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.img; // Ensure `product.img` is valid
        img.alt = product.name || "Product Image"; // Provide a fallback
        img.className = "product-image";
        tdImage.appendChild(img);

        const tdName = document.createElement('td');
        tdName.innerHTML = `<div class="product-name">${product.name}</div><div class="product-description">Lorem ipsum dolor sit amet consectetur.</div>`;

        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price.toFixed(2)}`; // Ensure price is formatted correctly

        const tdStatus = document.createElement('td');
        tdStatus.innerHTML = `<span class="stock-status">In Stock</span>`;

        const tdAdd = document.createElement('td');
        tdAdd.innerHTML = `<button class="btn">Add to Cart</button>`;

        const tdDelete = document.createElement('td');
        tdDelete.innerHTML = `<span class="trash-icon">🗑</span>`;

        tr.appendChild(tdImage);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdStatus);
        tr.appendChild(tdAdd);
        tr.appendChild(tdDelete);
        tbody.appendChild(tr);

        // Add event listener to the "Add to Cart" button
        tdAdd.querySelector('.btn').addEventListener('click', () => {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];

            // Check if the product is already in the cart
            if (!cart.some(cartItem => cartItem.id === product.id)) {
                cart.push(product); // Add product to cart
                localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
                alert('Product added to cart!');
                updateCartCount();
            } else {
                alert('Product is already in the cart!');
            }
        });

        // Add event listener to the trash icon to delete the product from favorites
        tdDelete.querySelector('.trash-icon').addEventListener('click', () => {
            console.log(`Attempting to delete product with ID: ${product.id}`);

            tr.classList.add('delete-animation');
            setTimeout(() => {
                const updatedFavorites = favorites.filter(fav => String(fav.id) !== String(product.id));
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                tbody.removeChild(tr);
                updateFavoriteCount();

                console.log(`Deleted product with ID: ${product.id}`);
            }, 500);
        });
    });

    updateFavoriteCount();
    updateCartCount();

    document.getElementById('clear-all').addEventListener('click', () => {
        localStorage.removeItem('favorites');
        tbody.innerHTML = '';
        updateFavoriteCount();
    });
});

// Function to update the favorite count displayed on the page
function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCount = favorites.length;
    document.querySelector('.count_favourite').textContent = favoriteCount;
}

// Function to update the cart count displayed on the page
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.length;
    const cartCountElement = document.querySelector('.count_cart');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}
