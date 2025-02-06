// frontend/public/js/search.js
class ProductSearch {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchInput.addEventListener('input', this.debounce(this.handleSearch, 300));
    }

    async handleSearch() {
        const query = this.searchInput.value;
        const response = await fetch(`/api/products?q=${encodeURIComponent(query)}`);
        const results = await response.json();
        this.renderResults(results);
    }

    debounce(func, delay) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
}