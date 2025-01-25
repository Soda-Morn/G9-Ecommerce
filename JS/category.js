// Example array to store the products
const products = [
    {
        id: 1,
        name: 'ASUS Zenbook 14 OLED UX3405MA-PZ232W',
        category: 'computer',
        price: 776.75,
        oldPrice: 1195.00,
        sale: 35, // 35% off
        image: '/Picture/category/computer.png',
        rating: 4.5, // Rating (for example, 4 full stars and half a star)
    },
    {
        id: 2,
        name: 'Beats Solo3 Wireless On-Ear Headphones Silver',
        category: 'headphone',
        price: 40.00,
        oldPrice: 50.00,
        sale: 20, // 20% off
        image: '/Picture/category/headphone.png',
        rating: 4, // Rating (4 full stars)
    },
    {
        id: 3,
        name: 'JBL Tune 230NC TWS | wireless noise earbuds',
        category: 'airphone',
        price: 19.60,
        oldPrice: 28.00,
        sale: 30, // 30% off
        image: '/Picture/category/eairphone.png',
        rating: 4.5, // Rating (4 full stars and half a star)
    },
    {
        id:4,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        image: "/Picture/category/phone.png",
        sale: 30,
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id:5,
        name: "Samsung 50'' Crystal UHD 4K Smart TV",
        category: 'tv',
        image: "/Picture/category/tv.png",
        sale: 30,
        rating: 4.5,
        price: 105.00,
        oldPrice: 150.00,
      },
      {
        id:6,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'camera',
        image: "/Picture/category/cmr.png",
        sale: 30,
        rating: 4.5,
        price: 90.00,
        oldPrice: 120.00,
      },
      {
        id:7,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'iphone',
        image: "/Picture/category/temblet.png",
        sale: 25,
        rating: 4.5,
        price: 304.32,
        oldPrice: 405.62,
      },
      {
        id: 7,
        name: "LEAF WATCH X121 WIRELESS BT",
        category: 'watch',
        image: "/Picture/category/watch.png",
        sale: 20,
        rating: 4.5,
        price: 46.39,
        oldPrice: 57.98,
      },
      {
        id : 8,
        name: "FINGERS SwiftCharge Wireless Rechargeable Mouse",
        category: 'computer',
        image: "/Picture/category/mouse.png",
        sale: 10,
        rating: 4.5,
        price: 11.45,
        oldPrice: 12.73,
      },
      {
        id: 9,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        image: "/Picture/category/phone.png",
        sale: 30,
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 10,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30, // percentage
        image: "/Picture/category/phone.png",
        rating: 4.5, // out of 5
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 11,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 12,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 13,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 14,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 15,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 16,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 17,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 18,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      },
      {
        id: 19,
        name: "iPhone 16 Pro Max 256GB - Black Titanium",
        category: 'phone',
        sale: 30,
        image: "/Picture/category/phone.png",
        rating: 4.5,
        price: 960.74,
        oldPrice: 1372.49,
      }
]

// Function to render products dynamically
function renderProducts(products) {
  const productContainer = document.querySelector('.product'); // Assuming you have a container with class "product"
  productContainer.innerHTML = ''; // Clear existing content

  if (products.length === 0) {
      productContainer.innerHTML = '<p>No products found.</p>';
      return;
  }

  products.forEach(product => {
      const productCard = `
          <div class="card">
              <div class="sale_present">-${product.sale}%</div>
              <div class="img_product">
                  <img src="${product.image}" alt="${product.name}">
              </div>
              <div class="name_product">
                  <a href="#">${product.name}</a>
              </div>
              <div class="stars">
                  ${Array(5).fill().map((_, i) => 
                      `<span class="material-symbols-outlined">
                          ${i < Math.floor(product.rating) ? 'star' : (i === Math.floor(product.rating) && product.rating % 1 !== 0 ? 'star_half' : 'star_border')}
                      </span>`).join('')}
              </div>
              <div class="price">
                  <p>$${product.price.toFixed(2)}</p>
                  <span class="old_price">$${product.oldPrice.toFixed(2)}</span>
              </div>
              <div class="icons">
                  <div class="btn_add_cart"> Add to Cart</div>
                  <div class="icon_product">
                      <span class="material-symbols-outlined" data-product-id="${product.id}">favorite</span>
                  </div>
              </div>
          </div>
      `;
      productContainer.innerHTML += productCard;
  });
}

// Function to filter products based on category
function filterProducts(category) {
  if (category === 'all') {
      renderProducts(products); // Show all products
  } else {
      const filteredProducts = products.filter(product => product.category === category);
      renderProducts(filteredProducts); // Show filtered products
  }
}

// Add event listeners to category links
document.querySelectorAll('.menu a').forEach(categoryLink => {
  categoryLink.addEventListener('click', function(e) {
      e.preventDefault();
      const selectedCategory = this.getAttribute('data-category');
      filterProducts(selectedCategory);
  });
});

// Function to search products based on input text
function searchProducts(searchText) {
  const lowerCaseSearchText = searchText.toLowerCase();

  // Filter products that match the search text
  const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(lowerCaseSearchText)
  );

  renderProducts(filteredProducts); // Render the filtered products
}

// Add event listener to the search input field
document.querySelector('.navbar-search input').addEventListener('input', function () {
  const searchText = this.value;
  searchProducts(searchText);
});

// Initial render to show all products when the page loads
renderProducts(products);