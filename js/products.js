// Products page specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initProductFilters();
    initProductModals();
    initProductAnimations();
});

// Product category filtering
function initProductFilters() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-detail-card');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active tab
            tabBtns.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Product modal functionality
function initProductModals() {
    // Create modal elements for each product
    const products = [
        {
            id: 'apcd',
            title: 'Air Pollution Control Devices',
            image: 'images/products/apcd.jpg',
            description: 'Advanced air pollution control systems designed to meet environmental compliance standards.',
            features: [
                'High-efficiency particulate filtration',
                'Custom-designed for specific applications',
                'Low maintenance requirements',
                'Compliance with environmental standards',
                'Energy-efficient operation'
            ],
            applications: [
                'Foundry operations',
                'Steel manufacturing',
                'Chemical processing',
                'Power generation'
            ]
        },
        {
            id: 'cupola',
            title: 'Cupola Furnace',
            image: 'images/products/cupola-furnace.jpg',
            description: 'High-efficiency cupola furnaces for foundry operations and metal melting.',
            features: [
                'Energy efficient design',
                'High temperature capability',
                'Durable construction',
                'Precise temperature control',
                'Easy operation and maintenance'
            ],
            applications: [
                'Iron foundries',
                'Steel production',
                'Metal casting',
                'Alloy manufacturing'
            ]
        },
        {
            id: 'blower',
            title: 'Industrial Blower',
            image: 'images/products/blower.jpg',
            description: 'High-performance industrial blowers for optimal air circulation and ventilation.',
            features: [
                'High airflow capacity',
                'Low noise operation',
                'Easy maintenance',
                'Energy efficient motors',
                'Corrosion resistant materials'
            ],
            applications: [
                'Ventilation systems',
                'Dust collection',
                'Material handling',
                'Process air supply'
            ]
        },
        {
            id: 'id-fan',
            title: 'I.D. Fan (Induced Draft Fan)',
            image: 'images/products/id-fan.jpg',
            description: 'Induced draft fans designed for efficient exhaust and ventilation systems.',
            features: [
                'High efficiency motor',
                'Corrosion resistant',
                'Variable speed control',
                'Low maintenance design',
                'Quiet operation'
            ],
            applications: [
                'Boiler exhaust',
                'Furnace ventilation',
                'Industrial exhaust',
                'Process ventilation'
            ]
        },
        {
            id: 'oil-tank',
            title: 'Oil Storage Tank',
            image: 'images/products/oil-storage-tank.jpg',
            description: 'Secure and efficient oil storage solutions for industrial applications.',
            features: [
                'Leak-proof design',
                'Safety compliance',
                'Custom capacities',
                'Corrosion resistant',
                'Easy access for maintenance'
            ],
            applications: [
                'Fuel storage',
                'Lubricant storage',
                'Process oil storage',
                'Backup fuel systems'
            ]
        },
        {
            id: 'chimney',
            title: 'Industrial Chimney',
            image: 'images/products/chimney.jpg',
            description: 'Durable chimneys designed for industrial exhaust and ventilation systems.',
            features: [
                'Weather resistant',
                'High temperature rated',
                'Modular design',
                'Easy installation',
                'Long service life'
            ],
            applications: [
                'Boiler exhaust',
                'Furnace exhaust',
                'Industrial ventilation',
                'Process exhaust'
            ]
        },
        {
            id: 'ladle',
            title: 'Foundry Ladle',
            image: 'images/products/ladle.jpg',
            description: 'High-quality foundry ladles for safe and efficient metal handling.',
            features: [
                'Heat resistant lining',
                'Precision pouring',
                'Long service life',
                'Easy handling',
                'Custom sizes available'
            ],
            applications: [
                'Metal casting',
                'Foundry operations',
                'Steel pouring',
                'Alloy handling'
            ]
        },
        {
            id: 'sand-mixture',
            title: 'Sand Mixture Machine',
            image: 'images/products/sand-mixture.jpg',
            description: 'Automated sand mixture machines for consistent sand preparation.',
            features: [
                'Automated operation',
                'Consistent mixing',
                'Easy maintenance',
                'High capacity',
                'Precise control'
            ],
            applications: [
                'Foundry sand preparation',
                'Molding sand mixing',
                'Core sand preparation',
                'Sand reclamation'
            ]
        },
        {
            id: 'fuel-saving',
            title: 'Fuel Saving Device',
            image: 'images/products/fuel-saving-device.jpg',
            description: 'Innovative fuel saving devices that optimize fuel consumption.',
            features: [
                'Cost effective',
                'Easy installation',
                'Quick ROI',
                'Low maintenance',
                'Universal compatibility'
            ],
            applications: [
                'Furnace optimization',
                'Boiler efficiency',
                'Industrial heating',
                'Process optimization'
            ]
        },
        {
            id: 'muller',
            title: 'Muller Machine',
            image: 'images/products/muller-machine.jpg',
            description: 'High-performance muller machines for efficient sand preparation.',
            features: [
                'High capacity',
                'Uniform mixing',
                'Robust construction',
                'Easy operation',
                'Low maintenance'
            ],
            applications: [
                'Foundry sand mixing',
                'Molding sand preparation',
                'Core sand mixing',
                'Sand reclamation'
            ]
        }
    ];
    
    // Create modals for each product
    products.forEach(product => {
        createProductModal(product);
    });
}

function createProductModal(product) {
    const modal = document.createElement('div');
    modal.id = `${product.id}-modal`;
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${product.title}</h2>
                <span class="close" onclick="closeModal('${product.id}-modal')">&times;</span>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.src='images/placeholder.jpg'">
                </div>
                <div class="modal-text">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <h4>Key Features:</h4>
                    <ul>
                        ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <h4>Applications:</h4>
                    <ul>
                        ${product.applications.map(app => `<li>${app}</li>`).join('')}
                    </ul>
                    <div class="modal-actions">
                        <a href="contact.html" class="btn btn-primary">
                            <span>Get Quote</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                        <a href="enquiry.html" class="btn btn-outline">
                            <span>Request Information</span>
                            <i class="fas fa-info-circle"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            closeModal(openModal.id);
        }
    }
});

// Product animations
function initProductAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    const productCards = document.querySelectorAll('.product-detail-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Product search functionality
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    const productCards = document.querySelectorAll('.product-detail-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const title = card.querySelector('.product-title').textContent.toLowerCase();
                const description = card.querySelector('.product-description').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search if search input exists
document.addEventListener('DOMContentLoaded', initProductSearch);

// Product comparison functionality
function initProductComparison() {
    const compareBtns = document.querySelectorAll('.compare-btn');
    const selectedProducts = [];
    
    compareBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-detail-card');
            const productId = productCard.id;
            
            if (selectedProducts.includes(productId)) {
                // Remove from comparison
                selectedProducts.splice(selectedProducts.indexOf(productId), 1);
                this.classList.remove('selected');
                this.textContent = 'Compare';
            } else if (selectedProducts.length < 3) {
                // Add to comparison
                selectedProducts.push(productId);
                this.classList.add('selected');
                this.textContent = 'Selected';
            } else {
                // Show limit message
                showNotification('You can compare up to 3 products at a time', 'info');
            }
            
            // Update comparison button visibility
            updateComparisonButton();
        });
    });
    
    function updateComparisonButton() {
        const comparisonBtn = document.getElementById('compare-products');
        if (comparisonBtn) {
            if (selectedProducts.length >= 2) {
                comparisonBtn.style.display = 'block';
                comparisonBtn.textContent = `Compare ${selectedProducts.length} Products`;
            } else {
                comparisonBtn.style.display = 'none';
            }
        }
    }
}

// Initialize comparison functionality
document.addEventListener('DOMContentLoaded', initProductComparison);

// Export functions for global use
window.openModal = openModal;
window.closeModal = closeModal;
