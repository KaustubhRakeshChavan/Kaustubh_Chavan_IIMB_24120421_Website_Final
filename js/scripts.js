const products = {
    "Cakes": [
      { name: "Chocolate Cake", price: 500 },
      { name: "Butterscotch Cake", price: 400 },
      { name: "Mango Cake", price: 700 },
      { name: "Red Velvet Cake", price: 600 },
    ],
    "Snacks": [
      { name: "Kachori Samosa", price: 50 },
      { name: "Jalebi fafda", price: 60}
    ],
    "Accessories": [
      { name: "Birthday caps", price: 30 },
      { name: "Ballons Pack", price: 50 }
    ]
  };
  
  let cart = [];
  
  document.querySelectorAll(".product-item").forEach(item => {
    item.addEventListener("click", function () {
      const productKey = this.getAttribute("data-product");
      const variants = products[productKey] || [];
      const container = document.getElementById("productCards");
      container.innerHTML = "";
  
      variants.forEach(variant => {
        const col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-3";
  
        // Sanitize variant name for image URL
        const imageName = variant.name;
        const imageUrl = `Kaustubh_Chavan_IIMB_24120421_Website_Final/assets/images/${imageName}.jpeg`; // Update with your image path
  
        col.innerHTML = `
          <div class="product-card h-100">
            <img src="${imageUrl}" class="img-fluid mb-2" alt="${variant.name}" />
            <h5>${variant.name}</h5>
            <p>Price: Rs. ${variant.price.toFixed(2)}</p>
            <button class="btn btn-sm btn-primary add-to-cart">Add to Cart</button>
          </div>
        `;
  
        col.querySelector("button").addEventListener("click", () => {
          addToCart(variant);
        });
  
        container.appendChild(col);
      });
    });
  });
  
  function addToCart(product) {
    const existing = cart.find(p => p.name === product.name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartItems = document.getElementById("cartItems");
    cartItems.innerHTML = "";
    let totalPrice = 0, totalItems = 0;
  
    cart.forEach((item, index) => {
      totalPrice += item.price * item.quantity;
      totalItems += item.quantity;
  
      const div = document.createElement("div");
      div.className = "col-12 mb-3";
      div.innerHTML = `
        <div class="product-card border p-3 rounded shadow-sm">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">${item.name}</h6>
            <small>Rs. ${item.price.toFixed(2)} × ${item.quantity}</small>
          </div>
          <div class="d-flex justify-content-end align-items-center cart-item-buttons">
            <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQty(${index})">−</button>
            <button class="btn btn-outline-secondary btn-sm" onclick="increaseQty(${index})">+</button>
            <button class="btn btn-outline-danger btn-sm" onclick="removeItem(${index})">Delete</button>
          </div>
        </div>
      `;
      cartItems.appendChild(div);
    });
  
    document.getElementById("cartCount").textContent = totalItems;
    document.getElementById("totalItems").textContent = totalItems;
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
  }
  
  
  
   
  function increaseQty(index) {
    cart[index].quantity += 1;
    updateCartDisplay();
  }
  
  function decreaseQty(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }
    updateCartDisplay();
  }
  
  function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
  }
  