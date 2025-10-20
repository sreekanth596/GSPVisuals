// Video Slider Configuration
const SLIDER_CONFIG = {
    autoSlide: true,
    slideDuration: 5000,
    transitionSpeed: 600,
    touchSensitivity: 50
};

// Video data with new YouTube videos
const VIDEOS = [
    {
        youtubeId: '1VeNdigkEw4',
        title: 'Wedding Film 1',
        description: 'Beautiful wedding moments captured in 4K',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/1VeNdigkEw4/maxresdefault.jpg'
    },
    {
        youtubeId: 'yzQmYT48ykI',
        title: 'Wedding Film 2',
        description: 'Emotional wedding ceremony highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/yzQmYT48ykI/maxresdefault.jpg'
    },
    {
        youtubeId: 'qOQ36uC0DJk',
        title: 'Wedding Film 3',
        description: 'Grand reception and celebrations',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/qOQ36uC0DJk/maxresdefault.jpg'
    },
    {
        youtubeId: 'Qyf6c7LLo9k',
        title: 'Wedding Film 4',
        description: 'Candid wedding moments',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/Qyf6c7LLo9k/maxresdefault.jpg'
    },
    {
        youtubeId: 'nDfzUQOpZJU',
        title: 'Wedding Film 5',
        description: 'Traditional wedding highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/nDfzUQOpZJU/maxresdefault.jpg'
    },
    {
        youtubeId: 'kJXFB5Wo0bI',
        title: 'Wedding Film 6',
        description: 'Destination wedding highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/kJXFB5Wo0bI/maxresdefault.jpg'
    }
];

// Video data with new YouTube videos
const VIDEOS = [
    {
        youtubeId: '1VeNdigkEw4',
        title: 'Wedding Film 1',
        description: 'Beautiful wedding moments captured in 4K',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/1VeNdigkEw4/maxresdefault.jpg'
    },
    {
        youtubeId: 'yzQmYT48ykI',
        title: 'Wedding Film 2',
        description: 'Emotional wedding ceremony highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/yzQmYT48ykI/maxresdefault.jpg'
    },
    {
        youtubeId: 'qOQ36uC0DJk',
        title: 'Wedding Film 3',
        description: 'Grand reception and celebrations',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/qOQ36uC0DJk/maxresdefault.jpg'
    },
    {
        youtubeId: 'Qyf6c7LLo9k',
        title: 'Wedding Film 4',
        description: 'Candid wedding moments',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/Qyf6c7LLo9k/maxresdefault.jpg'
    },
    {
        youtubeId: 'nDfzUQOpZJU',
        title: 'Wedding Film 5',
        description: 'Traditional wedding highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/nDfzUQOpZJU/maxresdefault.jpg'
    },
    {
        youtubeId: 'kJXFB5Wo0bI',
        title: 'Wedding Film 6',
        description: 'Destination wedding highlights',
        category: 'wedding',
        thumbnail: 'https://img.youtube.com/vi/kJXFB5Wo0bI/maxresdefault.jpg'
    }
];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.video-slider');
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
    
    // Initialize the slider
    initSlider();
    
    // Set up event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
    // Touch events for mobile
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: true });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyDown);
    
    // Start auto-slide if enabled
    if (SLIDER_CONFIG.autoSlide) {
        startAutoSlide();
    }
    
    // Initialize the slider
    function initSlider() {
        // Clear existing content
        slider.innerHTML = '';
        dotsContainer.innerHTML = '';
        
        // Create slides and dots
        VIDEOS.forEach((video, index) => {
            // Create slide
            const slide = document.createElement('div');
            slide.className = 'video-slide' + (index === 0 ? ' active' : '');
            slide.setAttribute('data-index', index);
            
            // Create video container with thumbnail
            slide.innerHTML = `
                <div class="video-container">
                    <a href="https://www.youtube.com/watch?v=${video.youtubeId}" target="_blank" class="video-thumbnail">
                        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                        <div class="play-button">
                            <i class="fas fa-play"></i>
                        </div>
                        <div class="video-info">
                            <h3>${video.title}</h3>
                            <p>${video.description}</p>
                        </div>
                    </a>
                </div>
            `;
            
            slider.appendChild(slide);
            
            // Create dot
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Initialize first slide
        updateSlider();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        if (index < 0) index = VIDEOS.length - 1;
        if (index >= VIDEOS.length) index = 0;
        
        currentSlide = index;
        updateSlider();
    }
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
