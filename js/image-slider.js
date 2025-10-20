// Image Slider Configuration
const SLIDER_CONFIG = {
    autoSlide: true,
    slideDuration: 5000,
    transitionSpeed: 600,
    touchSensitivity: 50
};

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.image-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    if (!slider || !dotsContainer) return;
    
    // Slider variables
    let currentSlide = 0;
    let isAnimating = false;
    let touchStartX = 0;
    let touchEndX = 0;
    let autoSlideInterval;
    
    // Image data - Replace with your own images
    const images = [
        {
            src: 'images/slider/image1.jpg',
            alt: 'Wedding Photography',
            title: 'Wedding Photography',
            description: 'Capturing your special moments'
        },
        {
            src: 'images/slider/image2.jpg',
            alt: 'Portrait Session',
            title: 'Portrait Session',
            description: 'Professional portrait photography'
        },
        {
            src: 'images/slider/image3.jpg',
            alt: 'Event Coverage',
            title: 'Event Coverage',
            description: 'Documenting your important events'
        }
    ];

    // Initialize slider
    function initSlider() {
        // Clear existing content
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Create slides
        images.forEach((image, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = `slide ${index === 0 ? 'active' : ''}`;
            slide.setAttribute('data-index', index);
            
            // Create image element
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.loading = 'lazy';
            
            // Create caption
            const caption = document.createElement('div');
            caption.className = 'slide-caption';
            caption.innerHTML = `
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            `;
            
            // Assemble slide
            slide.appendChild(img);
            slide.appendChild(caption);
            slider.appendChild(slide);
            
            // Create dot navigation
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Start auto-slide if enabled
        if (SLIDER_CONFIG.autoSlide) {
            startAutoSlide();
        }
    }
    
    // Navigation functions
    function goToSlide(index) {
        if (isAnimating || index < 0 || index >= images.length) return;
        
        isAnimating = true;
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        
        // Update active classes
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reset auto-slide timer
        resetAutoSlide();
        
        // Remove active class after transition
        setTimeout(() => {
            isAnimating = false;
        }, SLIDER_CONFIG.transitionSpeed);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % images.length;
        goToSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + images.length) % images.length;
        goToSlide(prevIndex);
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, SLIDER_CONFIG.slideDuration);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    function resetAutoSlide() {
        if (SLIDER_CONFIG.autoSlide) {
            startAutoSlide();
        }
    }
    
    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
    }
    
    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', resetAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });
    
    // Initialize the slider
    initSlider();
});
