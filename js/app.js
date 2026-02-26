

const TAX_RATE = 0.16;

const productsData = Object.freeze([
    { id: 1, name: 'Laptop Pro 15"', price: 1299.99, category: 'Computación', icon: '💻' },
    { id: 2, name: 'Mouse Inalámbrico', price: 29.99, category: 'Accesorios', icon: '🖱️' },
    { id: 3, name: 'Teclado Mecánico', price: 89.99, category: 'Accesorios', icon: '⌨️' },
    { id: 4, name: 'Monitor 27" 4K', price: 449.99, category: 'Monitores', icon: '🖥️' },
    { id: 5, name: 'Auriculares BT', price: 79.99, category: 'Audio', icon: '🎧' },
    { id: 6, name: 'Webcam HD 1080p', price: 59.99, category: 'Cámaras', icon: '📷' },
    { id: 7, name: 'Disco SSD 1TB', price: 109.99, category: 'Almacenamiento', icon: '💾' },
    { id: 8, name: 'USB-C Hub', price: 39.99, category: 'Accesorios', icon: '🔌' }
]);

const round = (num) => Math.round(num * 100) / 100;

const calculateItemTotal = (item) =>
    item && item.quantity > 0
        ? round(item.price * item.quantity)
        : 0;

const calculateSubtotal = (cart) =>
    Array.isArray(cart)
        ? round(cart.reduce((t, i) => t + calculateItemTotal(i), 0))
        : 0;

const calculateTotal = (subtotal) =>
    subtotal > 0
        ? round(subtotal * (1 + TAX_RATE))
        : 0;

const findProductById = (id) =>
    productsData.find(p => p.id === id);

const findCartItemByProductId = (cart, id) =>
    Array.isArray(cart)
        ? cart.find(i => i.productId === id)
        : undefined;

const addToCart = (cart = [], product) => {
    const existing = findCartItemByProductId(cart, product.id);

    if (existing) {
        return cart.map(i =>
            i.productId === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
        );
    }

    return [
        ...cart,
        {
            productId: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: 1
        }
    ];
};

const removeFromCart = (cart, id) =>
    cart.filter(i => i.productId !== id);

const updateQuantity = (cart, id, quantity) =>
    quantity <= 0
        ? removeFromCart(cart, id)
        : cart.map(i =>
            i.productId === id
                ? { ...i, quantity }
                : i
        );

const clearCart = () => [];

const getTotalItems = (cart) =>
    Array.isArray(cart)
        ? cart.reduce((t, i) => t + i.quantity, 0)
        : 0;


// Node (Jest)
if (typeof module !== "undefined") {
    module.exports = {
        productsData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateItemTotal,
        calculateSubtotal,
        calculateTotal,
        findProductById,
        findCartItemByProductId,
        getTotalItems
    };
}

// Navegador
if (typeof window !== "undefined") {
    Object.assign(window, {
        productsData,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateItemTotal,
        calculateSubtotal,
        calculateTotal,
        findProductById,
        findCartItemByProductId,
        getTotalItems
    });
}