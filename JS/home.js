const menuToggle = document.querySelector('.menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

menuToggle.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});


let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

/*=============== IMAGE GALLERY ===============*/
function imgGallery() {
  const mainImg = document.querySelector(".details__img"),
    smallImg = document.querySelectorAll(".details__small-img");

  smallImg.forEach((img) => {
    img.addEventListener("click", function () {
      mainImg.src = this.src;
    });
  });
}

imgGallery();
// Function to update the favorite count based on localStorage
function updateFavoriteCount() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoriteCount = favorites.length;
  document.querySelector('.count_favourite').textContent = favoriteCount;
}

// Function to handle adding a product to favorites
document.querySelectorAll('[data-product-id]').forEach(icon => {
  icon.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-product-id'));  // Get the product ID from the clicked icon
    console.log(`Product ID selected: ${productId}`);  // Log the product ID for debugging

    // Check if the product ID is valid
    if (isNaN(productId)) {
      console.error('Invalid product ID:', productId);
      alert('Invalid product ID');
      return;
    }

    // Fetch the products data from products.json
    fetch('products.json')  // Fetch the products.json file
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products.json');
        }
        return response.json();  // Parse JSON data
      })
      .then(products => {
        console.log('Products loaded:', products);  // Log products for debugging
        const product = products.find(p => p.id === productId);  // Find the product by ID

        if (product) {
          // Get favorites from localStorage or initialize an empty array
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

          // Check if the product is already in favorites to prevent duplicates
          if (!favorites.some(fav => fav.id === product.id)) {
            // Add product to favorites array
            favorites.push(product);
            // Save updated favorites back to localStorage
            localStorage.setItem('favorites', JSON.stringify(favorites));

            console.log('Product added to favorites:', product);  // Log the successful addition
            alert('Product added to favorites!');
            updateFavoriteCount(); // Update the favorite count displayed on the page
          } else {
            console.log('Product is already in favorites');
            alert('This product is already in your favorites.');
          }
        } else {
          console.log('Product not found:', productId);
          alert('Product not found!');
        }
      })
      .catch(error => {
        console.error('Error loading product data:', error);
        alert('There was an error adding the product to favorites.');
      });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal', // Enable horizontal scrolling
    slidesPerView: 'auto',   // Allow slides to respect their width
    spaceBetween: 24,        // Space between slides
    grabCursor: true,        // Show grabbing cursor for better UX
    freeMode: true,          // Allow free scrolling
  });
});
















