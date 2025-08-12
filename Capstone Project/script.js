document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    const products = [
        { id: 1, name: 'Wireless Mouse', price: 25.99, image: 'https://easetec.com.pk/wp-content/uploads/2023/01/4-9.jpg', category: 'Electronics', rating: 4.5 },
        { id: 2, name: 'Mechanical Keyboard', price: 89.99, image: 'https://tse1.mm.bing.net/th/id/OIP.PQMBO0T9EIUM_H4t-ACmogHaGA?pid=Api&h=220&P=0', category: 'Electronics', rating: 4.8 },
        { id: 3, name: '4K Webcam', price: 59.50, image: 'https://tse4.mm.bing.net/th/id/OIP.tWW4UdrmwGVDy1zRIu4WAAHaHa?pid=Api&h=220&P=0', category: 'Electronics', rating: 4.6 },
        { id: 4, name: 'USB-C Hub', price: 34.00, image: 'https://tse3.mm.bing.net/th/id/OIP.oa2zK29RDEZ4baEXFKn9yAHaHJ?pid=Api&h=220&P=0', category: 'Accessories', rating: 4.3 },
        { id: 5, name: 'Noise-Cancelling Headphones', price: 199.99, image: 'https://tse1.mm.bing.net/th/id/OIP.949pS30Twrc4hM3qGtqKoAHaHa?pid=Api&h=220&P=0', category: 'Audio', rating: 4.9 },
        { id: 6, name: '27" 4K Monitor', price: 399.00, image: 'https://tse2.mm.bing.net/th/id/OIP.i3ZetDE36p9pXfo0RzF2wwHaHa?pid=Api&h=220&P=0', category: 'Monitors', rating: 4.7 },
        { id: 7, name: 'Ergonomic Chair', price: 250.00, image: 'https://tse2.mm.bing.net/th/id/OIP._lHDHrIx4dAjk4UBNy1gDgHaH_?pid=Api&h=220&P=0', category: 'Office', rating: 4.4 },
        { id: 8, name: 'Laptop Stand', price: 22.75, image: 'https://tse1.mm.bing.net/th/id/OIP.sZM2VGRuWM9Mt5kxIBzeBQHaIY?pid=Api&h=220&P=0', category: 'Accessories', rating: 4.2 }


    ];

    let cart = [];
    let currentFilters = {
        searchTerm: '', // New filter criteria
        category: 'all',
        maxPrice: 400,
        sortBy: 'default'
    };

    // --- DOM SELECTORS ---
    const searchInput = document.getElementById('search-input'); // New selector
    const productGrid = document.getElementById('product-grid');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const priceFilter = document.getElementById('price-filter');
    const priceValue = document.getElementById('price-value');
    const sortBy = document.getElementById('sort-by');

    // --- FUNCTIONS ---
    
    /**
     * Applies all current filters and sorting, then re-renders products.
     */
    function applyFiltersAndSort() {
        let filteredProducts = [...products];

        // Apply search term filter
        if (currentFilters.searchTerm) {
            filteredProducts = filteredProducts.filter(p => 
                p.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        if (currentFilters.category !== 'all') {
            filteredProducts = filteredProducts.filter(p => p.category === currentFilters.category);
        }

        // Apply price filter
        filteredProducts = filteredProducts.filter(p => p.price <= currentFilters.maxPrice);

        // Apply sorting
        switch (currentFilters.sortBy) {
            case 'price-asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating-desc':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
        }

        renderProducts(filteredProducts);
    }

    // --- EVENT LISTENERS ---
    
    // Search input (fires as user types)
    searchInput.addEventListener('input', (e) => {
        currentFilters.searchTerm = e.target.value;
        applyFiltersAndSort();
    });

    // The rest of the script (renderProducts, cart logic, other event listeners, etc.) remains unchanged.
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p>No products match your criteria.</p>';
            return;
        }
        productsToRender.forEach(product => {
            const productCard = `<div class="product-card"><img src="${product.image}" alt="${product.name}"><div class="product-info"><h3>${product.name}</h3><p>$${product.price.toFixed(2)}</p><button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button></div></div>`;
            productGrid.innerHTML += productCard;
        });
    }

    function populateCategoryFilters() {
        const categories = ['all', ...new Set(products.map(p => p.category))];
        categoryFiltersContainer.innerHTML = '';
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.dataset.category = category;
            if (category === 'all') button.classList.add('active');
            categoryFiltersContainer.appendChild(button);
        });
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCartUI();
    }
    
    function updateCartUI() {
        cartItemsList.innerHTML = '';
        let total = 0;
        let totalItems = 0;
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li class="no-items">Your cart is empty.</li>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.name} (x${item.quantity})</span><span>$${(item.price * item.quantity).toFixed(2)}</span>`;
                cartItemsList.appendChild(li);
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }
        cartTotalElement.textContent = total.toFixed(2);
        cartCountElement.textContent = totalItems;
    }

    productGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });

    categoryFiltersContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('#category-filters button.active').classList.remove('active');
            e.target.classList.add('active');
            currentFilters.category = e.target.dataset.category;
            applyFiltersAndSort();
        }
    });

    priceFilter.addEventListener('input', (e) => {
        currentFilters.maxPrice = parseFloat(e.target.value);
        priceValue.textContent = currentFilters.maxPrice;
        applyFiltersAndSort();
    });
    
    sortBy.addEventListener('change', (e) => {
        currentFilters.sortBy = e.target.value;
        applyFiltersAndSort();
    });

    // --- INITIALIZATION ---
    populateCategoryFilters();
    applyFiltersAndSort();
    updateCartUI();
});