

const {
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
} = require('./app.js');

const mockProduct1 = { id: 1, name: 'Laptop', price: 1000, icon: '💻' };
const mockProduct2 = { id: 2, name: 'Mouse', price: 50, icon: '🖱️' };
const mockCartItem1 = { productId: 1, name: 'Laptop', price: 1000, quantity: 2, icon: '💻' };
const mockCartItem2 = { productId: 2, name: 'Mouse', price: 50, quantity: 1, icon: '🖱️' };

describe('TechStore - Pruebas Unitarias', () => {
    
    describe('calculateItemTotal', () => {
        test('deberia calcular el total correctamente para un item', () => {
            const item = { price: 100, quantity: 3 };
            expect(calculateItemTotal(item)).toBe(300);
        });
        
        test('deberia retornar 0 para cantidad 0', () => {
            const item = { price: 100, quantity: 0 };
            expect(calculateItemTotal(item)).toBe(0);
        });
        
        test('deberia manejar decimales correctamente', () => {
            const item = { price: 29.99, quantity: 2 };
            expect(calculateItemTotal(item)).toBeCloseTo(59.98);
        });
    });
    
    describe('calculateSubtotal', () => {
        test('deberia calcular el subtotal de un carrito vacio', () => {
            expect(calculateSubtotal([])).toBe(0);
        });
        
        test('deberia calcular el subtotal de un solo item', () => {
            expect(calculateSubtotal([mockCartItem1])).toBe(2000);
        });
        
        test('deberia calcular el subtotal de multiples items', () => {
            const cart = [mockCartItem1, mockCartItem2];
            expect(calculateSubtotal(cart)).toBe(2050);
        });
    });
    
    describe('calculateTotal', () => {
        test('deberia calcular el total con impuesto 16%', () => {
            expect(calculateTotal(100)).toBe(116);
        });
        
        test('deberia retornar 0 para subtotal 0', () => {
            expect(calculateTotal(0)).toBe(0);
        });
        
        test('deberia manejar decimales correctamente', () => {
            expect(calculateTotal(100.50)).toBeCloseTo(116.58);
        });
    });
    
    describe('findProductById', () => {
        test('deberia encontrar un producto existente', () => {
            const product = findProductById(1);
            expect(product).toBeDefined();
            expect(product.id).toBe(1);
        });
        
        test('deberia retornar undefined para producto inexistente', () => {
            const product = findProductById(999);
            expect(product).toBeUndefined();
        });
    });
    
    describe('findCartItemByProductId', () => {
        test('deberia encontrar un item del carrito', () => {
            const cart = [mockCartItem1, mockCartItem2];
            const item = findCartItemByProductId(cart, 1);
            expect(item).toBeDefined();
            expect(item.productId).toBe(1);
        });
        
        test('deberia retornar undefined para item inexistente', () => {
            const cart = [mockCartItem1];
            const item = findCartItemByProductId(cart, 999);
            expect(item).toBeUndefined();
        });
    });
    
    describe('addToCart', () => {
        test('deberia agregar un producto a un carrito vacio', () => {
            const newCart = addToCart([], mockProduct1);
            expect(newCart).toHaveLength(1);
            expect(newCart[0].productId).toBe(1);
            expect(newCart[0].quantity).toBe(1);
        });
        
        test('deberia incrementar la cantidad si el producto ya existe', () => {
            const cart = [{ ...mockCartItem1 }];
            const newCart = addToCart(cart, mockProduct1);
            expect(newCart).toHaveLength(1);
            expect(newCart[0].quantity).toBe(3);
        });
        
        test('deberia agregar un nuevo producto si no existe', () => {
            const cart = [{ ...mockCartItem1 }];
            const newCart = addToCart(cart, mockProduct2);
            expect(newCart).toHaveLength(2);
        });
        
        test('NO deberia mutar el carrito original', () => {
            const originalCart = [];
            addToCart(originalCart, mockProduct1);
            expect(originalCart).toHaveLength(0);
        });
    });
    
    describe('removeFromCart', () => {
        test('deberia eliminar un producto del carrito', () => {
            const cart = [mockCartItem1, mockCartItem2];
            const newCart = removeFromCart(cart, 1);
            expect(newCart).toHaveLength(1);
            expect(newCart[0].productId).toBe(2);
        });
        
        test('deberia retornar carrito vacio si se elimina el unico item', () => {
            const cart = [mockCartItem1];
            const newCart = removeFromCart(cart, 1);
            expect(newCart).toHaveLength(0);
        });
        
        test('deberia retornar el mismo carrito si el producto no existe', () => {
            const cart = [mockCartItem1];
            const newCart = removeFromCart(cart, 999);
            expect(newCart).toHaveLength(1);
        });
    });
    
    describe('updateQuantity', () => {
        test('deberia actualizar la cantidad de un producto', () => {
            const cart = [mockCartItem1];
            const newCart = updateQuantity(cart, 1, 5);
            expect(newCart[0].quantity).toBe(5);
        });
        
        test('deberia eliminar el producto si la cantidad es 0', () => {
            const cart = [mockCartItem1];
            const newCart = updateQuantity(cart, 1, 0);
            expect(newCart).toHaveLength(0);
        });
        
        test('deberia eliminar el producto si la cantidad es negativa', () => {
            const cart = [mockCartItem1];
            const newCart = updateQuantity(cart, 1, -1);
            expect(newCart).toHaveLength(0);
        });
    });
    
    describe('clearCart', () => {
        test('deberia retornar un array vacio', () => {
            expect(clearCart()).toEqual([]);
        });
        
        test('deberia retornar siempre un array nuevo', () => {
            const cart = [mockCartItem1, mockCartItem2];
            const clearedCart = clearCart();
            expect(clearedCart).not.toBe(cart);
        });
    });
    
    describe('getTotalItems', () => {
        test('deberia retornar 0 para un carrito vacio', () => {
            expect(getTotalItems([])).toBe(0);
        });
        
        test('deberia retornar la cantidad total de items', () => {
            const cart = [mockCartItem1, mockCartItem2];
            expect(getTotalItems(cart)).toBe(3);
        });
    });
    
    describe('productsData', () => {
        test('deberia tener productos definidos', () => {
            expect(productsData).toBeDefined();
            expect(Array.isArray(productsData)).toBe(true);
        });
        
        test('deberia tener productos con propiedades requeridas', () => {
            productsData.forEach(product => {
                expect(product).toHaveProperty('id');
                expect(product).toHaveProperty('name');
                expect(product).toHaveProperty('price');
                expect(product).toHaveProperty('category');
                expect(product).toHaveProperty('icon');
            });
        });
        
        test('deberia tener IDs unicos', () => {
            const ids = productsData.map(p => p.id);
            const uniqueIds = new Set(ids);
            expect(ids.length).toBe(uniqueIds.size);
        });
        
        test('los precios deben ser mayores a 0', () => {
            productsData.forEach(product => {
                expect(product.price).toBeGreaterThan(0);
            });
        });
    });
    
    describe('Pruebas de Integracion', () => {
        test('flujo completo: agregar, actualizar y eliminar', () => {
            let cart = [];
            
            cart = addToCart(cart, mockProduct1);
            expect(cart.length).toBe(1);
            
            cart = addToCart(cart, mockProduct2);
            expect(cart.length).toBe(2);
            
            cart = addToCart(cart, mockProduct1);
            expect(cart.length).toBe(2);
            expect(cart[0].quantity).toBe(2);
            
            cart = updateQuantity(cart, 1, 5);
            expect(cart[0].quantity).toBe(5);
            
            cart = removeFromCart(cart, 1);
            expect(cart.length).toBe(1);
            
            const subtotal = calculateSubtotal(cart);
            expect(subtotal).toBe(50);
            
            const total = calculateTotal(subtotal);
            expect(total).toBe(58);
            
            cart = clearCart();
            expect(cart.length).toBe(0);
        });
        
        test('calculos matematicos correctos', () => {
            let cart = [];
            
            cart = addToCart(cart, mockProduct1);
            cart = addToCart(cart, mockProduct1);
            cart = addToCart(cart, mockProduct1);
            
            expect(calculateSubtotal(cart)).toBe(3000);
            
            const subtotal = calculateSubtotal(cart);
            const total = calculateTotal(subtotal);
            expect(total).toBeCloseTo(3480);
            
            expect(getTotalItems(cart)).toBe(3);
        });
    });
});