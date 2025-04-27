function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cart-count').textContent = `(${cart.length})`;
  }
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json')
      .then(res => res.json())
      .then(data => {
        const list = document.getElementById('product-list');
        data.forEach(product => {
          const item = document.createElement('div');
          item.className = 'product';
          item.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
          `;
          const button = item.querySelector('.add-to-cart');
          button.addEventListener('click', () => addToCart(product));
          list.appendChild(item);
        });
        updateCartCount();
      })
      .catch(err => console.error('Failed to load products:', err));
  });
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  
    // Show a local notification
    if (Notification.permission === 'granted') {
      new Notification('🛒 Added to Cart', {
        body: `${product.name} has been added!`,
        icon: 'icons/icon-192x192.png'
      });
    }
  }
  