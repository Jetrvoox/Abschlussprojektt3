class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    addItem(productId, quantity = 1) {
        const existing = this.items.find(item => item.id === productId);
        existing ? existing.quantity += quantity : this.items.push({ id: productId, quantity });
        this.save();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});