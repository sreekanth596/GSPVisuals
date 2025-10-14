// Services data
console.log('Script loaded, defining services data...');
var servicesData = [
    {
        id: 'wedding',
        title: 'Wedding Photography',
        description: 'Capture your special day with our comprehensive wedding photography services.',
        features: [
            'Full day coverage',
            'Traditional ceremonies',
            'Reception events',
            'Custom photo albums',
            'Online gallery access'
        ],
        icon: 'fa-heart'
    },
    {
        id: 'pre-wedding',
        title: 'Pre-wedding Photography',
        description: 'Create beautiful memories before your big day with our pre-wedding shoots.',
        features: [
            'Location shoots',
            'Multiple outfit changes',
            'Professional makeup',
            'Digital delivery'
        ],
        icon: 'fa-ring'
    },
    {
        id: 'engagement',
        title: 'Engagement Photography',
        description: 'Document your engagement celebration with our professional photography services.',
        features: [
            'Ceremony coverage',
            'Family portraits',
            'Event highlights',
            'Quick delivery'
        ],
        icon: 'fa-gem'
    },
    {
        id: 'birthday',
        title: 'Birthday Photography',
        description: 'Make birthdays special with our event photography services.',
        features: [
            'Event coverage',
            'Group photos',
            'Decoration shots',
            'Same-day delivery'
        ],
        icon: 'fa-birthday-cake'
    },
    {
        id: 'house-warming',
        title: 'House Warming Photography',
        description: 'Document your new beginning with our house warming photography.',
        features: [
            'Property shots',
            'Family photos',
            'Event coverage',
            'Quick delivery'
        ],
        icon: 'fa-home'
    },
    {
        id: 'corporate',
        title: 'Corporate Photography',
        description: 'Professional corporate photography for businesses and organizations.',
        features: [
            'Team portraits',
            'Office events',
            'Product photography',
            'Headshots',
            'Event documentation'
        ],
        icon: 'fa-building'
    },
    {
        id: 'maternity',
        title: 'Maternity Photography',
        description: 'Capture the beautiful journey of pregnancy with our maternity sessions.',
        features: [
            'Indoor & outdoor shoots',
            'Partner & family included',
            'Professional styling',
            'Gentle posing guidance',
            'Digital gallery'
        ],
        icon: 'fa-baby'
    },
    {
        id: 'newborn',
        title: 'Newborn Photography',
        description: 'Precious moments of your newborn captured with care and expertise.',
        features: [
            'Studio sessions',
            'Home visits available',
            'Safe posing techniques',
            'Family included',
            'Quick turnaround'
        ],
        icon: 'fa-child'
    },
    {
        id: 'family',
        title: 'Family Photography',
        description: 'Create lasting memories with professional family photography sessions.',
        features: [
            'Multiple locations',
            'All family members',
            'Candid & posed shots',
            'Seasonal themes',
            'Online gallery'
        ],
        icon: 'fa-users'
    },
    {
        id: 'portrait',
        title: 'Portrait Photography',
        description: 'Professional portrait sessions for individuals and professionals.',
        features: [
            'Studio & outdoor options',
            'Multiple outfit changes',
            'Professional lighting',
            'Retouching included',
            'High-resolution files'
        ],
        icon: 'fa-user'
    },
    {
        id: 'event',
        title: 'Event Photography',
        description: 'Comprehensive coverage for all types of events and celebrations.',
        features: [
            'Full event coverage',
            'Candid moments',
            'Group photos',
            'Same-day preview',
            'Quick delivery'
        ],
        icon: 'fa-calendar-alt'
    },
    {
        id: 'commercial',
        title: 'Commercial Photography',
        description: 'High-quality commercial photography for marketing and advertising.',
        features: [
            'Product photography',
            'Lifestyle shots',
            'Brand photography',
            'E-commerce ready',
            'Multiple formats'
        ],
        icon: 'fa-shopping-bag'
    }
];

// Initialize services section
function initServices() {
    console.log('=== INITIALIZING SERVICES ===');
    const sidebar = document.querySelector('.service-sidebar');
    const mainContent = document.querySelector('.service-main');
    
    console.log('Sidebar element:', sidebar);
    console.log('Main content element:', mainContent);
    console.log('Services data length:', servicesData.length);
    
    if (!sidebar || !mainContent) {
        console.log('ERROR: Sidebar or main content not found!');
        return;
    }
    
    // Clear existing content
    sidebar.innerHTML = '';
    mainContent.innerHTML = '';
    
    // Generate sidebar tabs and main content panels
    console.log('Starting to generate services...');
    servicesData.forEach((service, index) => {
        console.log(`Creating service ${index + 1}: ${service.title}`);
        // Create sidebar tab button
        const tabBtn = document.createElement('button');
        tabBtn.className = `tab-btn ${index === 0 ? 'active' : ''}`;
        tabBtn.setAttribute('data-service', service.id);
        
        // Add icon and text to tab
        tabBtn.innerHTML = `
            <i class="fas ${service.icon}"></i>
            <span>${service.title}</span>
        `;
        
        // Create service panel
        const panel = document.createElement('div');
        panel.className = 'service-panel';
        
        // Generate features list
        const featuresList = service.features.map(feature => 
            `<div class="feature-item">
                <i class="fas fa-check"></i>
                <p>${feature}</p>
            </div>`
        ).join('');
        
        // Set panel content
        panel.innerHTML = `
            <div class="service-panel-content">
                <h3>${service.title}</h3>
                <p class="service-description">${service.description}</p>
                <div class="service-features">${featuresList}</div>
                <a href="#contact" class="service-cta">Book Now <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        // Add click handler for tab
        tabBtn.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');
            
            // Update active panel
            document.querySelectorAll('.service-panel').forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
            
            // Update URL hash
            window.location.hash = `services-${service.id}`;
        });
        
        // Append elements
        sidebar.appendChild(tabBtn);
        mainContent.appendChild(panel);
    });
    
    // Show first panel by default
    const firstPanel = document.querySelector('.service-panel');
    if (firstPanel) {
        firstPanel.classList.add('active');
        console.log('First panel activated');
    } else {
        console.log('ERROR: No service panels found!');
    }
    
    // Check URL hash on load
    const hash = window.location.hash;
    if (hash && hash.startsWith('#services-')) {
        const serviceId = hash.replace('#services-', '');
        const tab = document.querySelector(`.tab-btn[data-service="${serviceId}"]`);
        if (tab) tab.click();
    }
    
    console.log('=== SERVICES INITIALIZATION COMPLETE ===');
    console.log('Total tabs created:', document.querySelectorAll('.tab-btn').length);
    console.log('Total panels created:', document.querySelectorAll('.service-panel').length);
}

// Simple tab switching functionality
function initServiceTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const servicePanels = document.querySelectorAll('.service-panel');
    
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            servicePanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            button.classList.add('active');
            if (servicePanels[index]) {
                servicePanels[index].classList.add('active');
            }
        });
    });
}

// Fallback initialization - try again after a short delay
setTimeout(() => {
    const sidebar = document.querySelector('.service-sidebar');
    const mainContent = document.querySelector('.service-main');
    
    if (sidebar && mainContent && sidebar.children.length === 0) {
        console.log('Fallback: Re-initializing services...');
        initServices();
    } else {
        // If HTML content exists, initialize tab functionality
        initServiceTabs();
    }
}, 1000);

// Animate statistics counter
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const duration = 2000;
                const increment = count / (duration / 16);
                
                const updateCount = () => {
                    current += increment;
                    if (current < count) {
                        target.textContent = Math.floor(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = count;
                    }
                };
                
                updateCount();
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Initialize stats counter
animateStats();

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = 'none';
    });
    testimonials[index].style.display = 'block';
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Show first testimonial initially
showTestimonial(currentTestimonial);

// Video data with thumbnails for better loading
const videos = [
    // Pre Wedding Videos
    {
        id: 'pre-wedding-1',
        youtubeId: 'qOQ36uC0DJk',
        title: 'Pre-Wedding Highlights #1',
        description: 'Beautiful pre-wedding moments captured with love',
        thumbnail: 'https://img.youtube.com/vi/qOQ36uC0DJk/maxresdefault.jpg'
    },
    {
        id: 'pre-wedding-2',
        youtubeId: 'Qyf6c7LLo9k',
        title: 'Pre-Wedding Highlights #2',
        description: 'Romantic pre-wedding shoot',
        thumbnail: 'https://img.youtube.com/vi/Qyf6c7LLo9k/maxresdefault.jpg'
    },
    {
        id: 'pre-wedding-3',
        youtubeId: '-nOSeUx2X8I',
        title: 'Pre-Wedding Highlights #3',
        description: 'Candid pre-wedding moments',
        thumbnail: 'https://img.youtube.com/vi/-nOSeUx2X8I/maxresdefault.jpg'
    },
    // Wedding Candid Videos
    {
        id: 'wedding-candid',
        youtubeId: '0VIyry9fotU',
        title: 'Wedding Candid Moments',
        description: 'Beautiful candid moments from the wedding',
        thumbnail: 'https://img.youtube.com/vi/0VIyry9fotU/maxresdefault.jpg'
    },
    // Wedding Teasers
    {
        id: 'teaser-1',
        youtubeId: '2zbZ0DDMIao',
        title: 'Wedding Teaser #1',
        description: 'Sneak peek of the wedding highlights',
        thumbnail: 'https://img.youtube.com/vi/2zbZ0DDMIao/maxresdefault.jpg'
    },
    {
        id: 'teaser-2',
        youtubeId: '6ihcNfZtbbk',
        title: 'Wedding Teaser #2',
        description: 'More beautiful moments from the wedding',
        thumbnail: 'https://img.youtube.com/vi/6ihcNfZtbbk/maxresdefault.jpg'
    }
];

// Slider configuration
var SLIDER_CONFIG = {
    autoSlide: true,        // Enable/disable auto-sliding
    slideDuration: 5000,    // Time between slides in milliseconds
    transitionSpeed: 600,   // Transition animation speed
    touchSensitivity: 50    // Minimum pixels to trigger slide change on touch
};

// Global variable to track if YouTube API is ready
var ytPlayerReady = false;

// Initialize video slider
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.querySelector('.video-slider');
    var sliderContainer = document.querySelector('.video-slider-container');
    var dotsContainer = document.querySelector('.slider-dots');
    
    if (!slider || !sliderContainer || !dotsContainer) return;
    
    // Add event listeners for auto-slide pause on hover
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
    
    // Start auto-slide
    startAutoSlide();
    
    // Clean up function
    window.cleanupVideoSlider = function() {
        stopAutoSlide();
        sliderContainer.removeEventListener('mouseenter', stopAutoSlide);
        sliderContainer.removeEventListener('mouseleave', startAutoSlide);
    };
});

// Start auto-slide function
function startAutoSlide() {
    if (window.autoSlideInterval) clearInterval(window.autoSlideInterval);
    if (SLIDER_CONFIG.autoSlide) {
        window.autoSlideInterval = setInterval(nextSlide, SLIDER_CONFIG.slideDuration);
    }
}

// Stop auto-slide function
function stopAutoSlide() {
    if (window.autoSlideInterval) {
        clearInterval(window.autoSlideInterval);
        window.autoSlideInterval = null;
    }
}

// Go to next slide
function nextSlide() {
    var currentSlide = document.querySelector('.video-slide.active');
    var nextSlide = currentSlide.nextElementSibling || document.querySelector('.video-slide:first-child');
    if (nextSlide) goToSlide(nextSlide.dataset.index);
}

// Go to specific slide
function goToSlide(index) {
    var slides = document.querySelectorAll('.video-slide');
    var dots = document.querySelectorAll('.dot');
    
    // Update active slide
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
    
    // Update active dot
    dots.forEach(function(dot) {
        dot.classList.remove('active');
    });
    dots[index].classList.add('active');
}
        
// Load YouTube video
function loadYouTubeVideo(index) {
    var videoContainer = document.querySelector('.video-slide[data-index="' + index + '"] .video-container');
    var videoId = videoContainer ? videoContainer.getAttribute('data-yt-id') : null;
    
    if (!videoId) return;
    
    // Create iframe
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=1&enablejsapi=1';
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    
    // Clear container and append iframe
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
}

// Initialize video slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load first video when page loads
    loadYouTubeVideo(0);
    
    // Set up click handlers for dots
    var dots = document.querySelectorAll('.dot');
    Array.prototype.forEach.call(dots, function(dot) {
        dot.addEventListener('click', function() {
            var index = parseInt(this.getAttribute('data-index'), 10);
            goToSlide(index);
            loadYouTubeVideo(index);
        });
    });
    
    // Set up keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            var currentIndex = parseInt(document.querySelector('.video-slide.active').getAttribute('data-index'), 10);
            var prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            goToSlide(prevIndex);
            loadYouTubeVideo(prevIndex);
        } else if (e.key === 'ArrowRight') {
            var currentIndex = parseInt(document.querySelector('.video-slide.active').getAttribute('data-index'), 10);
            var nextIndex = (currentIndex + 1) % totalSlides;
            goToSlide(nextIndex);
            loadYouTubeVideo(nextIndex);
        }
    });
});
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Dot navigation
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                goToSlide(index);
            });
        });
        
        // Touch events for mobile
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('touchmove', (e) => {
            touchEndX = e.touches[0].clientX;
        });
        
        slider.addEventListener('touchend', () => {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > SLIDER_CONFIG.touchSensitivity) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else {
                resetAutoSlide();
            }
        });
        
        // Click on thumbnail to load video
        document.querySelectorAll('.video-thumbnail').forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                loadYouTubeVideo(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });
    }
    
    // Start the initialization
    if (ytPlayerReady) {
        initializeVideoSlider();
    }
}

// Main initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initSmoothScrolling();
    initNavbarEffects();
    initGalleryModal();
    initFormValidation();
    initServices();
    animateStats();
    initVideoSlider();
    
    // Handle navigation link visibility on hash change
    window.addEventListener('hashchange', updateNavVisibility);
    
    // Set initial state
    if (!window.location.hash || window.location.hash === '#home') {
        window.scrollTo(0, 0);
        updateNavVisibility('#home');
    } else if (window.location.hash.startsWith('#services-')) {
        // Scroll to services if hash is for a service
        document.querySelector('#services').scrollIntoView();
    }
});

// Smooth scrolling with offset for fixed header
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const headerOffset = 100; // Adjust based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
            
            // Update navigation visibility
            updateNavVisibility();
        });
    });
}

// Update navigation visibility based on current section
function updateNavVisibility() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const targetId = window.location.hash;
    const isHome = !targetId || targetId === '#home' || targetId === '#';
    
    navLinks.forEach(link => {
        link.classList.toggle('visible', isHome || link.getAttribute('href') === targetId);
    });
    document.body.classList.toggle('home', isHome);
}

// Navbar effects and scroll behavior
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const heroSection = document.querySelector('.hero');
    let lastScroll = 0;
    let ticking = false;

    // Initialize navbar state
    function initNavbar() {
        const currentScroll = window.pageYOffset;
        navbar.classList.toggle('scrolled', currentScroll > 100);
        updateActiveNavLink();
    }

    // Toggle mobile menu with animation
    function toggleMenu() {
        const isOpen = navLinksContainer.classList.toggle('active');
        menuToggle.classList.toggle('active', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        
        // Toggle aria-expanded for accessibility
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Toggle focus trap when menu is open
        if (isOpen) {
            trapFocus(navLinksContainer);
        } else {
            removeTrapFocus();
        }
    }

    // Handle focus trap for better keyboard navigation
    function trapFocus(element) {
        const focusableElements = element.querySelectorAll('a[href], button:not([disabled])');
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        element.addEventListener('keydown', function trapListener(e) {
            const isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

            if (!isTabPressed) return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        });
    }


    // Initialize mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active') && 
                !navLinksContainer.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                toggleMenu();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinksContainer.classList.contains('active')) {
                toggleMenu();
                menuToggle.focus();
            }
        });
    }


    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (navLinksContainer.classList.contains('active')) {
                toggleMenu();
            }
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Handle navbar scroll effects with requestAnimationFrame
    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                const scrollThreshold = 100;
                
                // Toggle scrolled class based on scroll position
                navbar.classList.toggle('scrolled', currentScroll > scrollThreshold);
                
                // Handle scroll direction
                if (currentScroll <= 0) {
                    navbar.classList.remove('scroll-up');
                    lastScroll = currentScroll;
                    ticking = false;
                    return;
                }
                
                // Add/remove scroll classes based on direction
                if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                    navbar.classList.remove('scroll-up');
                    navbar.classList.add('scroll-down');
                } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                    navbar.classList.remove('scroll-down');
                    navbar.classList.add('scroll-up');
                }
                
                lastScroll = currentScroll;
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Throttle scroll event for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initialize
    initNavbar();
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100; // Adjust offset as needed
    const sections = Array.from(document.querySelectorAll('section[id]'));
    
    // Find the current section in view
    const currentSection = sections.reduce((current, section) => {
        const { top, height } = section.getBoundingClientRect();
        const sectionTop = top + window.scrollY;
        
        // Check if section is in view
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
            return '#' + section.id;
        }
        return current;
    }, '#home');
    
    // Update navigation and active state
    updateNavVisibility(currentSection);
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentSection);
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const animateOnScroll = (elements, className) => {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add(className);
            }
        });
    };
    
    // Observe elements with data-animate attribute
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
    
    // Initial check on load
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .scale-in');
    window.addEventListener('load', () => animateOnScroll(animatedElements, 'animate'));
    window.addEventListener('scroll', () => animateOnScroll(animatedElements, 'animate'));
}

// Function to scroll to contact section
function scrollToContact() {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
}

// Enhanced Gallery Modal with Navigation
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    var currentImageIndex = 0;
    var images = [];
    
    // Preload all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt || `Image ${index + 1}`
            });
        }
    });
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });
    
    function openModal(index) {
        currentImageIndex = index;
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <button class="modal-nav prev" aria-label="Previous image">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <div class="modal-gallery">
                    <div class="modal-gallery-item">
                        <img src="${images[currentImageIndex].src}" alt="${images[currentImageIndex].alt}">
                        <div class="image-caption">${images[currentImageIndex].alt}</div>
                    </div>
                </div>
                <button class="modal-nav next" aria-label="Next image">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyDown);
        
        // Navigation handlers
        const closeBtn = modal.querySelector('.close-modal');
        const prevBtn = modal.querySelector('.prev');
        const nextBtn = modal.querySelector('.next');
        
        closeBtn.onclick = () => closeModal(modal);
        prevBtn.onclick = () => navigate(-1, modal);
        nextBtn.onclick = () => navigate(1, modal);
        
        // Close when clicking outside the image
        modal.onclick = (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        };
        
        // Add swipe support for touch devices
        let touchStartX = 0;
        let touchEndX = 0;
        
        modal.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        modal.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                navigate(1, modal); // Swipe left - next
            } else if (touchEndX - touchStartX > swipeThreshold) {
                navigate(-1, modal); // Swipe right - previous
            }
        }
    }
    
    function navigate(direction, modal) {
        currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
        const galleryItem = modal.querySelector('.modal-gallery-item');
        
        // Add fade out effect
        galleryItem.style.opacity = '0';
        
        // Update image after fade out
        setTimeout(() => {
            galleryItem.innerHTML = `
                <img src="${images[currentImageIndex].src}" alt="${images[currentImageIndex].alt}">
                <div class="image-caption">${images[currentImageIndex].alt}</div>
            `;
            // Fade in new image
            setTimeout(() => galleryItem.style.opacity = '1', 10);
        }, 200);
    }
    
    function closeModal(modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', handleKeyDown);
        }, 200);
    }
    
    function handleKeyDown(e) {
        switch(e.key) {
            case 'ArrowLeft':
                navigate(-1, document.querySelector('.gallery-modal'));
                break;
            case 'ArrowRight':
                navigate(1, document.querySelector('.gallery-modal'));
                break;
            case 'Escape':
                closeModal(document.querySelector('.gallery-modal'));
                break;
        }
    }
}

// Form validation and submission
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', handleSubmit);
    
    // Add input validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
        
        // Add focus/blur effects
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            validateField(input);
        });
    });
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!field.value.trim()) {
        showError(field, errorElement, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && !isValidEmail(field.value)) {
        showError(field, errorElement, 'Please enter a valid email address');
        return false;
    }
    
    if (field.type === 'tel' && !isValidPhone(field.value)) {
        showError(field, errorElement, 'Please enter a valid phone number');
        return false;
    }
    
    // Clear any existing error
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
    return true;
}

function showError(field, errorElement, message) {
    field.classList.add('error');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[0-9\-+\s()]*$/;
    return re.test(phone);
}

async function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formElements = form.elements;
    let isValid = true;
    
    // Validate all fields
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.type !== 'submit' && element.type !== 'button' && element.type !== 'fieldset') {
            if (!validateField(element)) {
                isValid = false;
            }
        }
    }
    
    if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Here you would typically send the data to your server
        // Example with fetch API:
        /*
        const response = await fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        */
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('There was an error sending your message. Please try again later.', 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

// Add animation to gallery items on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.gallery-item, .video-item, .plan-card').forEach(item => {
    observer.observe(item);
});

// Main initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Starting initialization...');
    // Initialize components
    initSmoothScrolling();
    initServices();
    initServiceTabs(); // Initialize tab functionality
    initVideoSlider();
    initNavbarEffects();
    initScrollAnimations();

    // Initialize gallery filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter gallery items
            const filterValue = button.getAttribute('data-filter');
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Set wedding filter as default
    const weddingFilter = document.querySelector('.filter-btn[data-filter="wedding"]');
    if (weddingFilter) {
        weddingFilter.click();
    }

    // Initialize gallery modal
    initGalleryModal();
    initFormValidation();
});

document.addEventListener('DOMContentLoaded', function() {
    var videoSlider = document.querySelector('.video-slider');
    var slides = document.querySelectorAll('.video-slide');
    var prevBtn = document.querySelector('.prev-btn');
    var nextBtn = document.querySelector('.next-btn');
    var currentSlide = 0;
    var slideInterval;

    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            // Pause any playing videos
            const iframe = slide.querySelector('iframe');
            if (iframe) {
                const videoSrc = iframe.src;
                iframe.src = videoSrc; // Reset video
            }
        });
        
        // Show current slide
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoSlide() {
        // Clear any existing interval
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        // Start new interval - change slide every 15 seconds
        slideInterval = setInterval(nextSlide, 15000);
    }

    if (videoSlider) {
        // Show first slide
        showSlide(currentSlide);
        
        // Start auto-sliding
        startAutoSlide();

        // Previous button click
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });

        // Next button click
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // Restart timer after manual navigation
        });

        // Pause auto-slide when hovering over the slider
        videoSlider.addEventListener('mouseenter', () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        });

        // Resume auto-slide when mouse leaves the slider
        videoSlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });

        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (slideInterval) {
                    clearInterval(slideInterval);
                }
            } else {
                startAutoSlide();
            }
        });
    }
}); 