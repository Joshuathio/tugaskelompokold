document.addEventListener('DOMContentLoaded', function() {

    // Menu icon click event
    document.querySelector('.top-bar .menu-icon').addEventListener('click', function() {
        openMenu();
    });
    
    // Close button click event
    document.querySelector('.close-menu-btn').addEventListener('click', function() {
        closeMenu();
    });
    
    // Overlay click event
    document.getElementById('menuOverlay').addEventListener('click', function() {
        closeMenu();
    });
    
    // Get elements for product tabs
    const newestTab = document.getElementById('newest-tab');
    const bestsellerTab = document.getElementById('bestseller-tab');
    
    
    // Set initial state
    newestTab.classList.add('active');
    
   
    newestTab.addEventListener('click', function() {
        setActiveTab(this);
        loadProducts('newest');
    });
    
    bestsellerTab.addEventListener('click', function() {
        setActiveTab(this);
        loadProducts('bestseller');
    });
    
    // Function to set active tab
    function setActiveTab(clickedTab) {
        // Remove active class from all tab buttons
        document.querySelectorAll('.product-tab.btn').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        clickedTab.classList.add('active');
    }
    
 
    // Get pagination elements
    const pageInfo = document.getElementById('page-info');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    
    // Initialize page variables
    let currentPage = 1;
    const totalPages = 15;
    

    function updatePageInfo() {
        pageInfo.textContent = `${currentPage}/${totalPages}`;
        
        // Update button states
        if (currentPage <= 1) {
            prevPageBtn.classList.add('disabled');
        } else {
            prevPageBtn.classList.remove('disabled');
        }
        
        if (currentPage >= totalPages) {
            nextPageBtn.classList.add('disabled');
        } else {
            nextPageBtn.classList.remove('disabled');
        }
    }
    

    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updatePageInfo();
            loadProducts(getActiveTabType());
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageInfo();
            loadProducts(getActiveTabType());
        }
    });
    

    function getActiveTabType() {
        if (newestTab.classList.contains('active')) {
            return 'newest';
        } else if (bestsellerTab.classList.contains('active')) {
            return 'bestseller';
        }
        return 'newest'; 
    }
    
    // Get price elements
    const priceSlider = document.getElementById('price-slider');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    
    // Format price with dots (Indonesian style)
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    
    // Parse price (remove dots, convert to number)
    function parsePrice(priceStr) {
        return parseInt(priceStr.replace(/\./g, '')) || 0;
    }
    
    // Price inputs
    minPriceInput.value = "0";
    maxPriceInput.value = formatPrice(5000000);
    
    // Price slider 
    priceSlider.addEventListener('input', function() {
        const value = parseInt(this.value);
        maxPriceInput.value = formatPrice(value);
    });
    
    // Min price input 
    minPriceInput.addEventListener('input', function() {
        this.value = formatPrice(parsePrice(this.value));
    });
    
    // Max price input 
    maxPriceInput.addEventListener('input', function() {
        const value = parsePrice(this.value);
        this.value = formatPrice(value);
        priceSlider.value = value;
    });
    
    // Apply filter 
    document.getElementById('apply-filter').addEventListener('click', function() {
       
        
    
        alert('Filter diterapkan!');
        
        
        loadProducts(getActiveTabType());
    });
    


    function loadProducts(type) {
     
        const productGrid = document.getElementById('product-grid');
        
     
        productGrid.innerHTML = '';
        
       
        const productsPerPage = getResponsiveProductCount();
        const products = generateProducts(type, currentPage, productsPerPage);
        
       
        products.forEach(product => {
            const productCard = createProductCard(product);
            productGrid.appendChild(productCard);
        });
    }
    

    function getResponsiveProductCount() {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth >= 1600) {
            return 15; 
        } else if (viewportWidth >= 1200) {
            return 12; 
        } else if (viewportWidth >= 992) {
            return 9; 
        } else if (viewportWidth >= 768) {
            return 6; 
        } else {
            return 3; 
        }
    }
    
 
  function generateProducts(type, page, count) {
    const products = [];
    const startIndex = (page - 1) * count;
    
    for (let i = 0; i < count; i++) {
        const productNumber = startIndex + i + 1;
        const product = {
            id: productNumber,
            image: 'image 46.png',
            name: type === 'bestseller' ? `Bestseller Premium Putih ${productNumber}` : `Aquarium LED Putih ${productNumber}`,
            price: type === 'bestseller' ? 250000 : 200000,
            discount: type === 'bestseller' ? '30%' : '50%'
        };
        
        products.push(product);
    }
    
    return products;
}
    
 
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-img-container">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="discount-tag">${product.discount}</div>
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            <div class="product-price">Rp${formatPrice(product.price)}</div>
            <a href="#" class="cart-link">Cart</a>
        </div>
    `;
    
    // Tambahkan event listener khusus pada gambar produk
    const productImage = card.querySelector('.product-img');
    productImage.style.cursor = 'pointer'; // Ubah cursor menjadi pointer saat hover
    
    productImage.addEventListener('click', function() {
        // Navigasi ke halaman detail produk
        window.location.href = `product_detail.html?id=${product.id}`;
    });
    
    // Tetap tambahkan event listener untuk cart jika diperlukan
    const cartLink = card.querySelector('.cart-link');
    cartLink.addEventListener('click', function(event) {
        event.preventDefault();
        alert(`Produk "${product.name}" ditambahkan ke keranjang!`);
    });
    
    return card;
}
    

    const couponButton = document.querySelector('.shopping-coupon');
    
    couponButton.addEventListener('click', function() {
        alert('Kupon belanja akan ditampilkan!');
    });
    
 
    window.addEventListener('resize', function() {
        loadProducts(getActiveTabType());
    });
    
 
    updatePageInfo();
    
 
    loadProducts('newest');
});

document.getElementById('cartBtn').addEventListener('click', function() {
    window.location.href = 'checkout.html';
});

function openMenu() {
    document.getElementById('sideMenu').classList.add('open');
    document.getElementById('menuOverlay').classList.add('open');
    document.body.style.overflow = 'hidden'; 
}

function closeMenu() {
    document.getElementById('sideMenu').classList.remove('open');
    document.getElementById('menuOverlay').classList.remove('open');
    document.body.style.overflow = ''; 
}