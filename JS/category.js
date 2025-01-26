// Load and render products from index 5 onwards
function loadProducts() {
  fetch('../products.json')
    .then(response => response.json())
    .then(data => {
      const filteredData = data.slice(13); // Start from index 5
      localStorage.setItem('allProducts', JSON.stringify(filteredData)); // Store filtered products
      renderProducts(filteredData); // Render filtered products
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Render products dynamically
function renderProducts(products) {
  const productContainer = document.querySelector('.product');
  productContainer.innerHTML = ''; // Clear existing content

  if (products.length === 0) {
    productContainer.innerHTML = '<p>No products found.</p>';
    return;
  }

  products.forEach(product => {
    const saleText = product.sale ? `-${product.sale}%` : ''; // Sale badge
    const oldPriceText = product.oldPrice ? `$${product.oldPrice.toFixed(2)}` : ''; // Old price if available

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

  // Attach event listeners to "Add to Cart" and "Favorite" buttons
  setupProductActions();
}

// Setup event listeners for product actions
function setupProductActions() {
  document.querySelectorAll('.btn_add_cart').forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-product-id');
      const product = getProductById(productId);
      addToCart(product);
    });
  });

  document.querySelectorAll('.favorite-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const productId = icon.getAttribute('data-product-id');
      const product = getProductById(productId);
      toggleFavorite(product);
    });
  });
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
    alert('Product removed from favorites!');
  } else {
    favorites.push(product); // Add to favorites
    alert('Product added to favorites!');
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  updateFavoriteCount();
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

// Filter products by category
function filterProducts(category) {
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];

  // If "all" is selected, show all products; otherwise filter by category
  const filteredProducts = category === 'all'
    ? allProducts
    : allProducts.filter(product =>
        product.category && product.category.toLowerCase() === category.toLowerCase()
      );

  renderProducts(filteredProducts);
}

// Search functionality
function searchProducts(query) {
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || [];
  const productContainer = document.querySelector('.product');

  if (query.length < 2) {
    productContainer.innerHTML = ''; // Clear results if query is less than 2 chars
    return;
  }

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  renderProducts(filteredProducts); // Render the filtered products
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  // Attach event listeners to category links
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const category = link.getAttribute('data-category');
      filterProducts(category);
    });
  });

  // Attach event listener to the search bar
  const searchInput = document.querySelector('.navbar-search input');
  if (searchInput) {
    searchInput.addEventListener('input', event => {
      searchProducts(event.target.value);
    });
  }

  updateCartCount();
  updateFavoriteCount();
});
