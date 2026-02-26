

let state = {
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    isCartOpen: false
};

const saveCart = () =>
    localStorage.setItem("cart", JSON.stringify(state.cart));

const updateState = (newState) => {
    state = { ...state, ...newState };
    saveCart();
    render();
};



const handleAddToCart = (id) => {
    const product = findProductById(id);
    const newCart = addToCart(state.cart, product);
    updateState({ cart: newCart });
};

const handleRemoveFromCart = (id) => {
    const newCart = removeFromCart(state.cart, id);
    updateState({ cart: newCart });
};

const handleUpdateQuantity = (id, change) => {
    const item = findCartItemByProductId(state.cart, id);
    if (!item) return;

    const newCart = updateQuantity(
        state.cart,
        id,
        item.quantity + change
    );

    updateState({ cart: newCart });
};

const handleToggleCart = () => {
    updateState({ isCartOpen: !state.isCartOpen });
};

const handleClearCart = () => {
    updateState({ cart: clearCart() });
};



const renderProducts = () => {
    const container = document.getElementById("productsGrid");
    if (!container) return;

    container.innerHTML = productsData.map(p => `
        <article class="product-card">
            <div class="product-image">${p.icon}</div>
            <div class="product-info">
                <span class="product-category">${p.category}</span>
                <h3>${p.name}</h3>
                <p>$${p.price.toFixed(2)}</p>
                <button onclick="handleAddToCart(${p.id})">
                    Agregar al carrito
                </button>
            </div>
        </article>
    `).join("");
};


const renderCartItems = () => {
    const container = document.getElementById("cartItems");
    if (!container) return;

    if (state.cart.length === 0) {
        container.innerHTML = `
            <p style="padding:20px;text-align:center">
                Tu carrito está vacío
            </p>
        `;
        return;
    }

    container.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div>${item.icon}</div>
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div>
                    <button onclick="handleUpdateQuantity(${item.productId}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="handleUpdateQuantity(${item.productId}, 1)">+</button>
                </div>
            </div>
            <div>
                <p>$${calculateItemTotal(item).toFixed(2)}</p>
                <button onclick="handleRemoveFromCart(${item.productId})">
                    ❌
                </button>
            </div>
        </div>
    `).join("");
};



const renderSummary = () => {
    const subtotalEl = document.getElementById("cartSubtotal");
    const totalEl = document.getElementById("cartTotal");
    const badge = document.getElementById("cartBadge");

    const subtotal = calculateSubtotal(state.cart);
    const total = calculateTotal(subtotal);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (badge) badge.textContent = getTotalItems(state.cart);
};

/* =========================
   RENDER VISIBILITY
========================= */

const renderVisibility = () => {
    const sidebar = document.getElementById("cartSidebar");
    const overlay = document.getElementById("overlay");

    if (!sidebar || !overlay) return;

    if (state.isCartOpen) {
        sidebar.classList.add("active");
        overlay.classList.add("active");
    } else {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    }
};



const render = () => {
    renderProducts();
    renderCartItems();
    renderSummary();
    renderVisibility();
};



document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("cartToggle")
        ?.addEventListener("click", handleToggleCart);

    document.getElementById("cartClose")
        ?.addEventListener("click", handleToggleCart);

    document.getElementById("overlay")
        ?.addEventListener("click", handleToggleCart);

    document.getElementById("clearCartBtn")
        ?.addEventListener("click", handleClearCart);

    render();
});



window.handleAddToCart = handleAddToCart;
window.handleRemoveFromCart = handleRemoveFromCart;
window.handleUpdateQuantity = handleUpdateQuantity;