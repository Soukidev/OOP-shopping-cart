// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    // Method to calculate total price of this item
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    // Add item to the cart
    addItem(product, quantity) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new ShoppingCartItem(product, quantity));
        }
        this.updateCartDisplay();
    }

    // Remove item from the cart by product id
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.updateCartDisplay();
    }

    // Get total cost of all items in the cart
    getTotalCost() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    // Update the cart display in the HTML
    updateCartDisplay() {
        const cartList = document.querySelector('.cart-items');
        const totalPrice = document.getElementById('total-price');

        // Clear current cart list
        cartList.innerHTML = '';

        // Render each item
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product.name} x${item.quantity} - $${item.getTotalPrice().toFixed(2)}`;
            cartList.appendChild(li);
        });

        // Update total price
        totalPrice.textContent = `$${this.getTotalCost().toFixed(2)}`;
    }
}

// Testing the Implementation
const product1 = new Product(1, 'Laptop', 1200);
const product2 = new Product(2, 'Mouse', 25);

// Initialize cart
const cart = new ShoppingCart();

// Add items to the cart after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cart.addItem(product1, 1); // 1 Laptop
    cart.addItem(product2, 2); // 2 Mice
});
