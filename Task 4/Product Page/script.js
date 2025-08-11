document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        { id: 1, name: 'Laptop', price: 1200, category: 'electronics', rating: 4.5, image: 'https://betanews.com/wp-content/uploads/2014/11/front.jpg' },
        { id: 2, name: 'Smartphone', price: 800, category: 'electronics', rating: 4.8, image: 'https://tse3.mm.bing.net/th/id/OIP.atUbRIOIuXZ0h_oRDtPTSwHaHa?pid=Api&h=220&P=0' },
        { id: 3, name: 'The Martian', price: 15, category: 'books', rating: 4.7, image: 'https://tse4.mm.bing.net/th/id/OIP.iCJosmxWBs0wEP4upBwVCAHaLq?pid=Api&h=220&P=0' },
        { id: 4, name: 'T-shirt', price: 25, category: 'clothing', rating: 3.9, image: 'https://tse2.mm.bing.net/th/id/OIP.btROMpUcvVYmIur6Rc7vlAHaHa?pid=Api&h=220&P=0' },
        { id: 5, name: 'Jeans', price: 60, category: 'clothing', rating: 4.2, image: 'https://tse2.mm.bing.net/th/id/OIP.V0n77afDr1-xECpUtPtu6wHaLL?pid=Api&h=220&P=0' },
        { id: 6, name: 'Monitor', price: 300, category: 'electronics', rating: 4.1, image: 'https://tse2.mm.bing.net/th/id/OIP.TIvnmnGSdl4XSfiNZ227QwHaHa?pid=Api&h=220&P=0' },
        { id: 7, name: 'Dune', price: 20, category: 'books', rating: 4.9, image: 'https://tse2.mm.bing.net/th/id/OIP.TLqVAzmaDHr3eytgPR6GHwHaK-?pid=Api&h=220&P=0' },
        { id: 8, name: 'Jacket', price: 90, category: 'clothing', rating: 4.6, image: 'https://tse1.mm.bing.net/th/id/OIP.trgHvhRyIMcU8lupuBgl0QHaI4?pid=Api&h=220&P=0' }
    ];

    const productList = document.getElementById('product-list');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');

    let currentProducts = [...products];

    // Function to render products on the page
    const renderProducts = (productsToRender) => {
        productList.innerHTML = ''; // Clear existing products
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Category: ${product.category}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p>Rating: ${product.rating} / 5</p>
            `;
            productList.appendChild(productCard);
        });
    };

    // Function to filter and sort products
    const updateProducts = () => {
        // Filter
        const selectedCategory = categoryFilter.value;
        let filteredProducts = products;
        if (selectedCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === selectedCategory);
        }

        // Sort
        const sortOption = sortBy.value;
        filteredProducts.sort((a, b) => {
            if (sortOption === 'price-asc') {
                return a.price - b.price;
            } else if (sortOption === 'price-desc') {
                return b.price - a.price;
            } else if (sortOption === 'rating-asc') {
                return a.rating - b.rating;
            } else if (sortOption === 'rating-desc') {
                return b.rating - a.rating;
            }
        });

        renderProducts(filteredProducts);
    };

    // Event listeners for filter and sort controls
    categoryFilter.addEventListener('change', updateProducts);
    sortBy.addEventListener('change', updateProducts);

    // Initial render of all products
    renderProducts(currentProducts);
});