document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Network response was not ok');

        const products = await response.json();
        const productGrid = document.getElementById('product-container');

        productGrid.innerHTML = products.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img src="/public/images/${product.name.toLowerCase().replace(/ /g, '-')}.jpg" alt="${product.name}">
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="product-description">${product.description}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `).join('');

    } catch (error) {
        console.error('Error loading products:', error);
        productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
});