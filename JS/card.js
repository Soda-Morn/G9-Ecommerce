window.addEventListener('DOMContentLoaded', () => {
    // Retrieve the favorites from localStorage
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const tbody = document.querySelector('tbody');

    // Clear existing rows (if any)
    tbody.innerHTML = "";

    // Iterate through favorites and add them to the table
    cards.forEach(product => {
        const tr = document.createElement('tr');
        tr.dataset.productId = String(product.id); // Ensure ID is stored as a string

        // Image Column
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = product.img;
        img.alt = product.name;
        img.className = "product-image";
        tdImage.appendChild(img);

        // Name and Info Column
        const tdName = document.createElement('td');
        tdName.innerHTML = `<div class="product-name">${product.name}</div><div class="product-description">Lorem ipsum dolor sit amet consectetur.</div>`;

        // Price Column
        const tdPrice = document.createElement('td');
        tdPrice.textContent = `$${product.price}`;

        // Stock Status Column (Just for display, assuming all products are in stock)
        const tdQuoantity = document.createElement('td');
        tdQuoantity.innerHTML = `<span class="stock-status">In Stock</span>`;

        // Action Column (Add to Cart)
        const tdSubtotal = document.createElement('td');
        tdSubtotal.innerHTML = `<button class="total">$0</button>`;

        // Rename/Delete Column (Trash Icon)
        const tdDelete = document.createElement('td');
        tdDelete.innerHTML = `<span class="trash-icon">🗑</span>`;

        // Append all the columns to the row
        tr.appendChild(tdImage);
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        tr.appendChild(tdQuoantity);
        tr.appendChild(tdSubtotal);
        tr.appendChild(tdDelete);

        // Append the row to the table body
        tbody.appendChild(tr);

        // Add click event to the trash icon to delete the product
        tdDelete.querySelector('.trash-icon').addEventListener('click', () => {
            console.log(`Attempting to delete product with ID: ${product.id}`);

            // Animate the row before deleting it
            tr.classList.add('delete-animation'); // Trigger animation

            // Wait for the animation to complete before deleting the product
            setTimeout(() => {
                // Remove the product from localStorage by filtering
                const updatedCards = cards.filter(fav => String(fav.id) !== String(product.id));
                localStorage.setItem('cards', JSON.stringify(updatedCards));

                // Remove the row from the table
                tbody.removeChild(tr);

                // Update the favorite count
                updateFavoriteCount();

                console.log(`Deleted product with ID: ${product.id}`);
            }, 500); // Duration of the animation (500ms)
        });
    });

    // Update the favorite count when the page is loaded
    updateFavoriteCount();

    // Add event listener to the "Clear All" button to remove all cards
    document.getElementById('clear-all').addEventListener('click', () => {
        // Clear all favorites from localStorage
        localStorage.removeItem('cards');
        
        // Clear all rows in the table
        tbody.innerHTML = '';
        
        // Update the favorite count
        updateFavoriteCount();
    });
});

// Function to update the favorite count displayed on the page
function updateFavoriteCount() {
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const favoriteCount = cards.length;
    document.querySelector('.count_favourite').textContent = favoriteCount;
}
