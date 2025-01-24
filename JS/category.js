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
];

// Function to render products dynamically
function renderProducts(products) {
    const productContainer = document.querySelector('.product'); // Assuming you have a container with class "product"
    productContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productCard = `
            <div class="card">
                <div class="sale_present">-${product.sale}%</div>
                <div class="img_product">
                    <img src="${product.image}" alt="Product Image">
                </div>
                <div class="name_product">
                    <a href="#">${product.name}</a>
                </div>
                <div class="stars">
                    ${Array(5).fill().map((_, i) => 
                        `<span class="material-symbols-outlined">${i < Math.floor(product.rating) ? 'star' : (i === Math.floor(product.rating) && product.rating % 1 !== 0 ? 'star_half' : 'star_border')}</span>`
                    ).join('')}
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

// Initial render to show all products when the page loads
renderProducts(products);
