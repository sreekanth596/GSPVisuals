// Video Slider Configuration
const SLIDER_CONFIG = {
    autoSlide: true,
    slideDuration: 5000,
    transitionSpeed: 600,
    touchSensitivity: 50
};

// Video Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.video-slider');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    
    if (!slider || !dotsContainer) return;
    
    // Slider variables
    var currentSlide = 0;
    var isAnimating = false;
    var touchStartX = 0;
    var touchEndX = 0;
    var autoSlideInterval;
    
    // Video data - Updated with more YouTube videos
    var videos = [
        // Wedding Highlights
        {
            youtubeId: '73CByp9O6kc',
            title: 'Pre-Wedding',
            description: 'Romantic pre-wedding moments in stunning locations',
            category: 'wedding',
            thumbnail: 'https://img.youtube.com/vi/73CByp9O6kc/maxresdefault.jpg'
        },
        {
            youtubeId: '9bZkp7q19f0',
            title: 'Wedding Highlights',
            description: 'Full wedding day highlights and special moments',
            category: 'wedding',
            thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg'
        },
        {
            youtubeId: 'JGwWNGJdvx8',
            title: 'Reception',
            description: 'Evening reception celebrations and first dance',
            category: 'wedding',
            thumbnail: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg'
        },
        {
            youtubeId: 'OPf0YbXqDm0',
            title: 'Bridal Portraits',
            description: 'Elegant bridal portraits and details',
            category: 'portrait',
            thumbnail: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg'
        },
        
        // Photography Techniques
        {
            youtubeId: 'dQw4w9WgXcQ',
            title: 'Portrait Photography Tips',
            description: 'Professional portrait photography techniques'
        },
        {
            youtubeId: 'kXYiU_JCYtU',
            title: 'Natural Light Mastery',
            description: 'How to use natural light for stunning photos'
        },
        
        // Wedding Films
        {
            youtubeId: 'x7SfXkMwBvM',
            title: 'Wedding Film Teaser',
            description: 'Cinematic wedding film highlights'
        },
        {
            youtubeId: 'zWqJv3v0nXw',
            title: 'Destination Wedding',
            description: 'Beautiful destination wedding highlights'
        },
        
        // Special Moments
        {
            youtubeId: 'dQw4w9WgXcQ',
            title: 'First Look',
            description: 'Emotional first look moments'
        },
        {
            youtubeId: '9bZkp7q19f0',
            title: 'Ceremony Highlights',
            description: 'Beautiful ceremony moments and traditions'
        },
        
        // Photography Education
        {
            youtubeId: 'JGwWNGJdvx8',
            title: 'Posing Guide',
            description: 'Professional posing techniques for couples'
        },
        {
            youtubeId: 'OPf0YbXqDm0',
            title: 'Editing Tutorial',
            description: 'Photo editing workflow for wedding photography'
        },
        
        // Newly Added Videos
        {
            youtubeId: 'L_jWHffIx5E',
            title: 'Golden Hour Magic',
            description: 'Capturing stunning portraits during golden hour'
        },
        {
            youtubeId: '7wtfhZwyrcc',
            title: 'Candid Wedding Moments',
            description: 'Beautiful unposed moments from real weddings'
        },
        {
            youtubeId: 'RgKAFK5djSk',
            title: 'Wedding Story',
            description: 'Telling love stories through cinematic wedding films'
        },
        {
            youtubeId: 'fJ9rUzIMcZQ',
            title: 'Bohemian Wedding',
            description: 'Dreamy bohemian wedding inspiration'
        },
        
        // Special Features
        {
            youtubeId: 'kXYiU_JCYtU',
            title: 'Drone Footage',
            description: 'Breathtaking aerial wedding footage'
        },
        {
            youtubeId: 'x7SfXkMwBvM',
            title: 'Slow Motion Highlights',
            description: 'Dramatic slow-motion wedding moments'
        }
    ];
    
    const totalSlides = videos.length;
    
    // Generate video slides with placeholder
    slider.innerHTML = videos.map((video, index) => `
        <div class="video-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
            <div class="video-container" data-yt-id="${video.youtubeId}">
                <div class="video-placeholder">
                    <div class="play-button">
                        <div class="play-icon">▶️</div>
                        <div>Click to load video</div>
                    </div>
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        </div>
    `).join('');
    
    // Generate dots
    dotsContainer.innerHTML = videos.map((_, index) => 
        `<div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Go to slide ${index + 1}"></div>`
    ).join('');
    
    const dots = document.querySelectorAll('.dot');
    const videoSlides = document.querySelectorAll('.video-slide');
    
    // Function to create video thumbnail with play button
    function createVideoThumbnail(container, video) {
        try {
            const videoUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
            const thumbnailUrl = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
            
            container.innerHTML = `
                <a href="${videoUrl}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="video-thumbnail" 
                   style="
                       display: block;
                       position: relative;
                       width: 100%;
                       height: 100%;
                       background: #000;
                       overflow: hidden;
                       text-decoration: none;
                   ">
                    <img src="${thumbnailUrl}" 
                         alt="${video.title}" 
                         style="
                             width: 100%;
                             height: 100%;
                             object-fit: cover;
                             transition: transform 0.3s ease;
                         "
                         onerror="this.src='https://via.placeholder.com/800x450?text=Thumbnail+Not+Available'"
                    >
                    <div class="play-button" style="
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 70px;
                        height: 70px;
                        background: rgba(255, 0, 0, 0.8);
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-play" style="color: white; font-size: 30px; margin-left: 5px;"></i>
                    </div>
                    <div class="video-info" style="
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(transparent, rgba(0,0,0,0.7));
                        padding: 20px;
                        color: white;
                        text-align: left;
                    ">
                        <h3 style="margin: 0 0 5px 0; font-size: 1.2em;">${video.title}</h3>
                        <p style="margin: 0; font-size: 0.9em; opacity: 0.9;">${video.description}</p>
                    </div>
                </a>
                <style>
                    .video-thumbnail:hover img {
                        transform: scale(1.05);
                    }
                    .video-thumbnail:hover .play-button {
                        background: #ff0000;
                        transform: translate(-50%, -50%) scale(1.1);
                    }
                </style>
            `;
        } catch (error) {
            console.error('Error creating video thumbnail:', error);
            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f5f5f5;
                    color: #666;
                    padding: 20px;
                    text-align: center;
                ">
                    <div>
                        <i class="fas fa-exclamation-circle" style="font-size: 2em; margin-bottom: 10px; color: #ff6b6b;"></i>
                        <p>Unable to load video preview</p>
                        <a href="https://www.youtube.com/watch?v=${video.youtubeId}" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           style="
                               display: inline-block;
                               margin-top: 10px;
                               padding: 8px 16px;
                               background: var(--primary);
                               color: white;
                               text-decoration: none;
                               border-radius: 4px;
                               font-size: 0.9em;
                           ">
                            Watch on YouTube
                        </a>
                    </div>
                </div>`;
        }
    }
    
    // Function to go to a specific slide
    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        currentSlide = index;
        updateSlider();
    }
    
    // Function to go to next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Function to update slider position
    function updateSlider() {
        if (isAnimating) return;
        
        isAnimating = true;
        const newPosition = -currentSlide * 100;
        slider.style.transition = `transform ${SLIDER_CONFIG.transitionSpeed}ms ease`;
        slider.style.transform = `translateX(${newPosition}%)`;
        
        // Update active states
        videoSlides.forEach((slide, i) => {
            const isActive = i === currentSlide;
                }
                .video-thumbnail:hover .play-button {
                    background: #ff0000;
                    transform: translate(-50%, -50%) scale(1.1);
                }
            </style>
        `;
    } catch (error) {
        console.error('Error creating video thumbnail:', error);
        container.innerHTML = `
            <div style="
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                background: #f5f5f5;
                color: #666;
                padding: 20px;
                text-align: center;
            ">
                <div>
                    <i class="fas fa-exclamation-circle" style="font-size: 2em; margin-bottom: 10px; color: #ff6b6b;"></i>
                    <p>Unable to load video preview</p>
                    <a href="https://www.youtube.com/watch?v=${video.youtubeId}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="
                           display: inline-block;
                           margin-top: 10px;
                           padding: 8px 16px;
                           background: var(--primary);
                           color: white;
                           text-decoration: none;
                           border-radius: 4px;
                           font-size: 0.9em;
                       ">
                        Watch on YouTube
                    </a>
                </div>
            </div>`;
        
        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, SLIDER_CONFIG.transitionSpeed);
    }
    
    // Auto-slide functionality
    function startAutoSlide() {
        if (!SLIDER_CONFIG.autoSlide) return;
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, SLIDER_CONFIG.slideDuration);
    }
    
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }
    
    function resetAutoSlide() {
        stopAutoSlide();
        if (SLIDER_CONFIG.autoSlide) {
            startAutoSlide();
        }
    }
    
    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    
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
        stopAutoSlide();
    }, { passive: true });
    
    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > SLIDER_CONFIG.touchSensitivity) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        resetAutoSlide();
    }, { passive: true });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });
    
    // Pause autoplay when hovering over slider
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', () => {
        if (SLIDER_CONFIG.autoSlide) {
            startAutoSlide();
        }
    });
    
    // Initialize the slider
    updateSlider();
    startAutoSlide();
    
    // Load first video
    const firstVideoContainer = document.querySelector('.video-container');
    const firstVideoId = firstVideoContainer.getAttribute('data-yt-id');
    loadYouTubeVideo(firstVideoContainer, firstVideoId);
    
    // Clean up on window unload
    window.addEventListener('beforeunload', () => {
        stopAutoSlide();
        slider.removeEventListener('mouseenter', stopAutoSlide);
        slider.removeEventListener('mouseleave', startAutoSlide);
    });
});

// YouTube API callback
function onYouTubeIframeAPIReady() {
    // This function will be called when the YouTube API is ready
    // You can initialize players here if needed
}
