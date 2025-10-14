// Video Slider Configuration
var SLIDER_CONFIG = {
    autoSlide: true,
    slideDuration: 5000,
    transitionSpeed: 600,
    touchSensitivity: 50
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    var slider = document.querySelector('.video-slider');
    var sliderContainer = document.querySelector('.video-slider-container');
    var dotsContainer = document.querySelector('.slider-dots');
    var slides = document.querySelectorAll('.video-slide');
    var dots = [];
    var currentIndex = 0;
    var autoSlideInterval;
    
    if (!slider || !sliderContainer || !dotsContainer || !slides.length) return;
    
    // Initialize dots
    function initDots() {
        dotsContainer.innerHTML = '';
        dots = [];
        
        for (var i = 0; i < slides.length; i++) {
            var dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            dot.addEventListener('click', function() {
                goToSlide(parseInt(this.getAttribute('data-index'), 10));
            });
            dots.push(dot);
            dotsContainer.appendChild(dot);
        }
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Update active slide
        for (var i = 0; i < slides.length; i++) {
            slides[i].classList.remove('active');
            dots[i].classList.remove('active');
        }
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
        
        // Load video if not already loaded
        loadYouTubeVideo(index);
    }
    
    // Load YouTube video
    function loadYouTubeVideo(index) {
        var videoContainer = slides[index].querySelector('.video-container');
        var videoId = videoContainer ? videoContainer.getAttribute('data-yt-id') : null;
        
        if (!videoId || videoContainer.querySelector('iframe')) return;
        
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&mute=1&enablejsapi=1';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        
        videoContainer.innerHTML = '';
        videoContainer.appendChild(iframe);
    }
    
    // Navigation functions
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // Auto-slide functions
    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        if (SLIDER_CONFIG.autoSlide) {
            autoSlideInterval = setInterval(nextSlide, SLIDER_CONFIG.slideDuration);
        }
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    // Touch events
    var touchStartX = 0;
    var touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        var touchDiff = touchStartX - touchEndX;
        
        if (Math.abs(touchDiff) > SLIDER_CONFIG.touchSensitivity) {
            if (touchDiff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Initialize
    function init() {
        initDots();
        loadYouTubeVideo(0);
        
        // Navigation buttons
        var nextBtn = document.querySelector('.next-btn');
        var prevBtn = document.querySelector('.prev-btn');
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Touch events
        slider.addEventListener('touchstart', handleTouchStart, false);
        slider.addEventListener('touchend', handleTouchEnd, false);
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
        
        // Pause on hover
        sliderContainer.addEventListener('mouseenter', stopAutoSlide);
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
        
        // Start auto-slide
        startAutoSlide();
    }
    
    init();
});
