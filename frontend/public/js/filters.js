class ProductFilter {
    constructor() {
        this.filters = {
            category: '',
            search: ''
        };
    }

    apply(products) {
        return products.filter(product => {
            const matchesCategory = !this.filters.category ||
                product.category === this.filters.category;
            const matchesSearch = !this.filters.search ||
                product.name.toLowerCase().includes(this.filters.search.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }
}

// Initialize filter
document.addEventListener('DOMContentLoaded', () => {
    window.productFilter = new ProductFilter();
});