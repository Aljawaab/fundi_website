// Sample product data - In a real app, this would come from a database
const products = [
    {
        id: 1,
        name: "Comfy Handmade Sofa",
        description: "Beautifully crafted wooden chair with intricate carvings.",
        price: 45000,
        category: "furniture",
        image: "images/products/🌟 __Хит продаж — Deja Vu!__ 🌟  Ищете идеальное….jpeg"
    },
    {
        id: 2,
        name: "Beaded Leather Bracelet",
        description: "Elegant bracelet made with genuine leather and colorful beads.",
        price: 800,
        category: "jewelry",
        image: "images/products/Men's Bracelets.jpeg"
    },
    {
        id: 3,
        name: "Bed - With Hidden Cabinets",
        description: "Wooden Handmade Bed With Hidden Compactments.",
        price: 60000,
        category: "furniture",
        image: "images/products/bed.jpg"
    },
    {
        id: 4,
        name: "Carved Wooden Coffee Table",
        description: "Sturdy coffee table with traditional African motifs.",
        price: 7500,
        category: "furniture",
        image: "images/products/curved coffe table.jpeg"
    },
    {
        id: 5,
        name: "Maasai Beaded Necklace",
        description: "Vibrant necklace inspired by Maasai cultural designs.",
        price: 1500,
        category: "jewelry",
        image: "images/products/masaibrac.jpg"
    },
    {
        id: 6,
        name: "Ankara Top",
        description: "Beautiful T-shirt made from colorful kitenge fabric.",
        price: 2500,
        category: "clothing",
        image: "images/products/ankaratop.jpg"
    }
];

function loadProducts(filter = 'all') {
    const productsContainer = document.getElementById('products-container');
    
    if (!productsContainer) return;
    
    // Clear existing products
    productsContainer.innerHTML = '';
    
    // Filter products if needed
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    // Display products
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.category);
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/placeholder.jpg'">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="product-price">KSh ${product.price.toLocaleString()}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;
    
    // Add event listener to the add to cart button
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addToCart(product.id);
    });
    
    return card;
}

function filterProducts(category) {
    loadProducts(category);
}

// Initialize products when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
});