// Load shared header and footer, then initialize functionality
document.addEventListener('DOMContentLoaded', function() {
    loadLayoutPartials().then(function() {
        initNavigation();
        initScrollAnimations();
        initCounterAnimations();
        initSmoothScrolling();
        initMobileMenu();
        initParallaxEffects();
        initFormHandling();
        initGallery();
    });
});

// Load header/footer partials
function loadPartial(elementId, url) {
    const container = document.getElementById(elementId);
    if (!container) return Promise.resolve();

    return fetch(url)
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
        })
        .catch(error => {
            console.error(`Failed to load partial: ${url}`, error);
        });
}

function setActiveNavByPage() {
    const page = document.body.dataset.page;
    if (!page) return;

    const navLinks = document.querySelectorAll('.nav-link');
    const linkMap = {
        home: 'index.html',
        about: 'about.html',
        products: 'products.html',
        services: 'services.html',
        contact: 'contact.html'
    };

    const currentHref = linkMap[page];
    if (!currentHref) return;

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentHref) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function loadLayoutPartials() {
    return Promise.all([
        loadPartial('site-header', 'header.html'),
        loadPartial('site-footer', 'footer.html')
    ]).then(function() {
        setActiveNavByPage();
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!navbar) return;

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // For multi-page layout we rely on data-page + setActiveNavByPage,
    // so we skip scroll-based active-link logic when data-page is present.
    if (!document.body.dataset.page) {
        window.addEventListener('scroll', function() {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}` || 
                    (current === '' && link.getAttribute('href') === 'index.html')) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Scroll animations
function initScrollAnimations() {
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
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-fade-up, .animate-fade-left, .animate-fade-right');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Form handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', initLazyLoading);

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        'images/LOGO.svg',
        'images/about-factory.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadCriticalResources();

// Add loading animation for page transitions
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading overlays
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 500);
    }
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent elements
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
function initFocusManagement() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', initFocusManagement);

// Add error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn(`Failed to load image: ${this.src}`);
        });
    });
});

// Gallery functionality - Slider
let currentSlide = 0;
let galleryImagesArray = [];
let autoSlideInterval = null;

function initGallery() {
    const gallerySlider = document.getElementById('gallery-slider');
    const galleryDots = document.getElementById('gallery-dots');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    
    if (!gallerySlider) return;

    // List of gallery images
    galleryImagesArray = [
        'gallery/WhatsApp Image 2025-11-05 at 11.21.45 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.45 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.45 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.46 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.46 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.46 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.47 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.47 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.47 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.48 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.48 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.48 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.49 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.49 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.49 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.50 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.50 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.50 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.51 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.51 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.51 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.52 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.52 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.52 AM.jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.53 AM (1).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.53 AM (2).jpeg',
        'gallery/WhatsApp Image 2025-11-05 at 11.21.53 AM.jpeg'
    ];

    // Create slides
    galleryImagesArray.forEach((imageSrc, index) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        if (index === 0) slide.classList.add('active');
        slide.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Gallery Image ${index + 1}`;
        img.loading = index < 3 ? 'eager' : 'lazy';
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => openGalleryModal(index, galleryImagesArray));
        slide.appendChild(img);
        gallerySlider.appendChild(slide);
        
        // Create dot
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        if (index === 0) dot.classList.add('active');
        dot.dataset.index = index;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => previousSlide());
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => nextSlide());
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (gallerySlider.parentElement.offsetParent !== null) {
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        }
    });

    // Auto-play slider
    startAutoSlide();

    // Pause on hover
    gallerySlider.addEventListener('mouseenter', stopAutoSlide);
    gallerySlider.addEventListener('mouseleave', startAutoSlide);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.gallery-slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (index < 0) {
        currentSlide = galleryImagesArray.length - 1;
    } else if (index >= galleryImagesArray.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    stopAutoSlide(); // Clear any existing interval
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 2500); // Change slide every 4 seconds
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

// Gallery modal functionality
let currentImageIndex = 0;

function openGalleryModal(index, images) {
    currentImageIndex = index;
    
    // Create or get modal
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'gallery-modal';
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="gallery-modal-content">
                <span class="gallery-modal-close">&times;</span>
                <div class="gallery-modal-nav gallery-modal-prev">
                    <i class="fas fa-chevron-left"></i>
                </div>
                <img id="gallery-modal-img" src="" alt="Gallery Image">
                <div class="gallery-modal-nav gallery-modal-next">
                    <i class="fas fa-chevron-right"></i>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Event listeners
        modal.querySelector('.gallery-modal-close').addEventListener('click', closeGalleryModal);
        modal.querySelector('.gallery-modal-prev').addEventListener('click', () => navigateGallery(-1));
        modal.querySelector('.gallery-modal-next').addEventListener('click', () => navigateGallery(1));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeGalleryModal();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', handleGalleryKeyboard);
    }
    
    updateGalleryModal(images);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleGalleryKeyboard);
}

function navigateGallery(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImagesArray.length - 1;
    } else if (currentImageIndex >= galleryImagesArray.length) {
        currentImageIndex = 0;
    }
    updateGalleryModal();
}

function updateGalleryModal(images) {
    const modalImg = document.getElementById('gallery-modal-img');
    const imagesToUse = images || galleryImagesArray;
    if (modalImg && imagesToUse && imagesToUse[currentImageIndex]) {
        modalImg.src = imagesToUse[currentImageIndex];
    }
}

function handleGalleryKeyboard(e) {
    if (e.key === 'Escape') {
        closeGalleryModal();
    } else if (e.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (e.key === 'ArrowRight') {
        navigateGallery(1);
    }
}

// Export functions for potential external use
window.SohanpalWebsite = {
    showNotification,
    debounce,
    throttle
};
