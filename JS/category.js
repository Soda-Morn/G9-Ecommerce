// Fetch and render products from the JSON file
function loadProducts() {
  fetch('../products.json')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('allProducts', JSON.stringify(data)); // Store products in localStorage
      renderProducts(data); // Render all products
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Render products dynamically starting from index 5
function renderProducts(products, showAllCategory = false) {
  const productContainer = document.querySelector('.product');
  productContainer.innerHTML = ''; // Clear existing content

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  // Slice the array to start rendering from index 5
  const slicedProducts = products.slice(5);

  slicedProducts.forEach(product => {
    const saleText = !showAllCategory && product.sale ? `-${product.sale}%` : '';
    const oldPriceText = !showAllCategory && product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : '';

    const productCard = `
      <div class="card">
        ${saleText ? `<div class="sale_present">${saleText}</div>` : ''}
        <div class="img_product">
          <img src="${product.img || product.image}" alt="${product.name}">
        </div>
        <div class="name_product">
          <a href="#">${product.name}</a>
        </div>
        <div class="stars">
          ${Array(5).fill().map((_, i) => 
            `<span class="material-symbols-outlined">
              ${i < Math.floor(product.rating || 0) ? 'star' : (i === Math.floor(product.rating || 0) && (product.rating || 0) % 1 !== 0 ? 'star_half' : 'star_border')}
            </span>`).join('')}
        </div>
        <div class="price">
          <p>$${product.price.toFixed(2)}</p>
          ${oldPriceText ? `<span class="old_price">${oldPriceText}</span>` : ''}
        </div>
        <div class="icons">
          <div class="btn_add_cart" data-product-id="${product.id}">Add to Cart</div>
          <div class="icon_product">
            <span class="material-symbols-outlined favorite-icon" data-product-id="${product.id}">favorite</span>
          </div>
        </div>
      </div>`;
    productContainer.innerHTML += productCard;
  });

  attachCartButtons();
  attachFavoriteButtons();
}

// Filter products by category
function filterProducts(category) {
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  const filteredProducts = category === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === category);

  renderProducts(filteredProducts, category === 'all');
}

// Search products
function searchProducts(searchText) {
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  const filteredProducts = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );
  renderProducts(filteredProducts);
}

// Add product to cart
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.some(item => item.id === product.id)) {
    cart.push({ ...product, quantity: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
    updateCartCount();
  } else {
    alert('Product is already in the cart!');
  }
}

// Toggle product as favorite
function toggleFavorite(product) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favorites.findIndex(item => item.id === product.id);

  if (index > -1) {
    favorites.splice(index, 1); // Remove from favorites
  } else {
    favorites.push(product); // Add to favorites
    alert('Product is already in the favorit !')
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteCount();
}

// Attach event listeners to cart buttons
function attachCartButtons() {
  document.querySelectorAll('.btn_add_cart').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const product = getProductById(productId);
      addToCart(product);
    });
  });
}

// Attach event listeners to favorite buttons
function attachFavoriteButtons() {
  document.querySelectorAll('.favorite-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const productId = icon.getAttribute('data-product-id');
      const product = getProductById(productId);
      toggleFavorite(product);
    });
  });
}

// Get product by ID
function getProductById(productId) {
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  return allProducts.find(product => product.id === parseInt(productId));
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  document.querySelector('.count_cart').textContent = cart.length;
}

// Update favorite count
function updateFavoriteCount() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  document.querySelector('.count_favourite').textContent = favorites.length;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      filterProducts(link.getAttribute('data-category'));
    });
  });

  document.querySelector('.navbar-search input').addEventListener('input', event => {
    searchProducts(event.target.value);
  });

  updateCartCount();
  updateFavoriteCount();
});