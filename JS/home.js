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

  const countElement = document.querySelector('.count_favourite');
  if (countElement) {
    countElement.textContent = favoriteCount;
  } else {
    console.error('Element with class "count_favourite" not found.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateFavoriteCount();
});

document.querySelectorAll('[data-product-id]').forEach(icon => {
  icon.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-product-id'));  
    console.log(`Product ID selected: ${productId}`);  

    if (isNaN(productId)) {
      console.error('Invalid product ID:', productId);
      alert('Invalid product ID');
      return;
    }
    fetch('products.json')  
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products.json');
        }
        return response.json();  
      })
      .then(products => {
        console.log('Products loaded:', products); 
        const product = products.find(p => p.id === productId);  

        if (product) {
          let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
          if (!favorites.some(fav => fav.id === product.id)) {
            favorites.push(product);
            localStorage.setItem('favorites', JSON.stringify(favorites));

            console.log('Product added to favorites:', product); 
            alert('Product added to favorites!');
            updateFavoriteCount(); 
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

//functoin for add card 
document.querySelectorAll('.btn_add_cart').forEach(button => {
  button.addEventListener('click', function () {
    const productId = parseInt(this.getAttribute('data-card-id')); 
    console.log(`Product ID selected for cart: ${productId}`); 
    if (isNaN(productId)) {
      console.error('Invalid product ID:', productId);
      alert('Invalid product ID');
      return;
    }
    fetch('products.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products.json');
        }
        return response.json(); 
      })
      .then(products => {
        console.log('Products loaded:', products); 
        const product = products.find(p => p.id === productId); 

        if (product) {
          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existingProduct = cart.find(item => item.id === product.id);
          if (existingProduct) {
            existingProduct.quantity += 1;
            console.log('Increased quantity for product:', product);
          } else {
            product.quantity = 1;
            cart.push(product);
            console.log('Product added to cart:', product);
          }

          localStorage.setItem('cart', JSON.stringify(cart));

          alert('Product added to cart!');
          updateCartCount(); 
        } else {
          console.log('Product not found:', productId);
          alert('Product not found!');
        }
      })
      .catch(error => {
        console.error('Error loading product data:', error);
        alert('There was an error adding the product to the cart.');
      });
  });
});

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); 
  document.querySelector('.count_cart').textContent = cartCount; 
}
updateCartCount();


//function for clsoe form login
var modal = document.getElementById('id01');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}




















