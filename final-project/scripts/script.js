// Sample product data
const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "electronics",
      price: 99.99,
      image: "https://via.placeholder.com/250x150?text=Headphones",
      description: "High-quality wireless headphones with noise cancellation."
    },
    {
      id: 2,
      name: "Graphic T-Shirt",
      category: "clothing",
      price: 19.99,
      image: "https://via.placeholder.com/250x150?text=T-Shirt",
      description: "100% cotton t-shirt with unique graphic design."
    },
    {
      id: 3,
      name: "Adventure Novel",
      category: "books",
      price: 14.99,
      image: "https://via.placeholder.com/250x150?text=Book",
      description: "A thrilling adventure novel full of twists and turns."
    },
    {
      id: 4,
      name: "Smart Watch",
      category: "electronics",
      price: 129.99,
      image: "https://via.placeholder.com/250x150?text=Smart+Watch",
      description: "Feature-packed smart watch with fitness tracking."
    },
    {
      id: 5,
      name: "Jeans",
      category: "clothing",
      price: 49.99,
      image: "https://via.placeholder.com/250x150?text=Jeans",
      description: "Comfortable and stylish denim jeans."
    },
    // Add more products as needed…
  ];
  
  /* -----------------------
     Rendering Product Cards
     ----------------------- */
  const productGrid = document.getElementById('productGrid');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  function renderProducts(productList) {
    productGrid.innerHTML = '';
    productList.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <a href="product.html?id=${product.id}">View Details</a>
      `;
      productGrid.appendChild(card);
    });
  }
  
  // Initial render
  renderProducts(products);
  
  /* -----------------------
     Filtering & Sorting
     ----------------------- */
  function filterProducts() {
    let filtered = products.filter(product => {
      // Search Filter
      const searchTerm = searchInput.value.toLowerCase();
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
      // Category Filter
      const selectedCategory = categoryFilter.value;
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  
    // Price Sorting
    if (sortFilter.value === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortFilter.value === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }
  
    renderProducts(filtered);
  }
  
  // Event Listeners for filtering
  if (searchInput) searchInput.addEventListener('input', filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);
  if (sortFilter) sortFilter.addEventListener('change', filterProducts);
  
  /* -----------------------
     Cart Functionality
     ----------------------- */
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Retrieve existing cart data or initialize
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Check if product exists in the cart (optional quantity update)
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to your cart.`);
  }
  
  /* -----------------------
     Product Detail Page
     ----------------------- */
  function renderProductDetail() {
    // Check if we are on product.html by reading query params
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    
    if (!isNaN(id)) {
      const product = products.find(p => p.id === id);
      const productDetail = document.getElementById('productDetail');
      if (product && productDetail) {
        productDetail.innerHTML = `
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <h2>${product.name}</h2>
          <p class="price">$${product.price.toFixed(2)}</p>
          <p>${product.description}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
      }
    }
  }
  
  /* -----------------------
     Cart Page Rendering
     ----------------------- */
  function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalContainer = document.getElementById('cartTotal');
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = '';
      let total = 0;
      cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <h3>${item.name}</h3>
          <p>Price: $${item.price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <p>Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartItemsContainer.appendChild(div);
      });
      if (cartTotalContainer) {
        cartTotalContainer.textContent = `Total: $${total.toFixed(2)}`;
      }
    }
  }
  
  // Call render functions on page load depending on current page
  if (document.getElementById('productDetail')) renderProductDetail();
  if (document.getElementById('cartItems')) renderCart();
  