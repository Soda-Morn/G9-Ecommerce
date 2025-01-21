window.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const tbody = document.querySelector('tbody');

    tbody.innerHTML = "";

    favorites.forEach(product => {
        const tr = document.createElement('tr');
        tr.dataset.productId = String(product.id);

        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.className = "product-image";
        tdImage.appendChild(img);

        
        const tdName = document.createElement('td');
        tdName.innerHTML = `<div class="product-name">${product.name}</div><div class="product-description">Lorem ipsum dolor sit amet consectetur.</div>`;

        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price}`;

  
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
    document.getElementById('clear-all').addEventListener('click', () => {
        localStorage.removeItem('favorites');
        tbody.innerHTML = '';
        updateFavoriteCount();
    });
});


function updateFavoriteCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoriteCount = favorites.length;
    document.querySelector('.count_favourite').textContent = favoriteCount;
}
