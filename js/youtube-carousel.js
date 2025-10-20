// YouTube Video Carousel Configuration
const CAROUSEL_CONFIG = {
    videos: [
        {
            id: '1VeNdigkEw4',
            title: 'Wedding Film 1',
            description: 'Beautiful wedding moments captured in 4K',
            category: 'wedding'
        },
        {
            id: 'yzQmYT48ykI',
            title: 'Wedding Film 2',
            description: 'Emotional wedding ceremony highlights',
            category: 'wedding'
        },
        {
            id: 'qOQ36uC0DJk',
            title: 'Wedding Film 3',
            description: 'Grand reception and celebrations',
            category: 'wedding'
        },
        {
            id: 'Qyf6c7LLo9k',
            title: 'Wedding Film 4',
            description: 'Candid wedding moments',
            category: 'wedding'
        },
        {
            id: 'dQw4w9WgXcQ',
            title: 'Portrait Photography',
            description: 'Professional portrait photography techniques',
            category: 'photography'
        },
        {
            id: '9bZkp7q19f0',
            title: 'Event Coverage',
            description: 'Capturing special events and moments',
            category: 'events'
        }
    ],
    containerId: 'video-carousel',
    autoSlide: true,
    slideDuration: 5000, // 5 seconds
    visibleSlides: 3,    // Number of slides visible at once
    transitionSpeed: 600 // Transition speed in milliseconds
};

// Initialize the carousel
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById(CAROUSEL_CONFIG.containerId);
    if (!container) return;

    let currentSlide = 0;
    let isAnimating = false;
    let autoSlideInterval;
    let slides = [];
    let dots = [];

    // Create carousel HTML structure
    function createCarousel() {
        container.innerHTML = `
            <div class="carousel-container">
                <div class="carousel-track"></div>
                <button class="carousel-nav prev" aria-label="Previous">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-nav next" aria-label="Next">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carousel-dots"></div>
            </div>
        `;

        const track = container.querySelector('.carousel-track');
        const dotsContainer = container.querySelector('.carousel-dots');

        // Create slides
        CAROUSEL_CONFIG.videos.forEach((video, index) => {
            // Create slide element
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            slide.innerHTML = `
                <div class="video-thumbnail" data-yt-id="${video.id}">
                    <img src="https://img.youtube.com/vi/${video.id}/maxresdefault.jpg" 
                         alt="${video.title}" 
                         loading="lazy">
                    <div class="play-button">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.description}</p>
                </div>
            `;
            
            // Add click event to open YouTube video
            slide.addEventListener('click', () => {
                window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
            });

            track.appendChild(slide);
            slides.push(slide);

            // Create dot navigation
            const dot = document.createElement('button');
            dot.className = 'carousel-dot';
            dot.dataset.index = index;
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });

        // Add navigation events
        const prevBtn = container.querySelector('.carousel-nav.prev');
        const nextBtn = container.querySelector('.carousel-nav.next');
        
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });

        // Initialize carousel
        updateCarousel();
        
        // Start auto-slide if enabled
        if (CAROUSEL_CONFIG.autoSlide) {
            startAutoSlide();
        }

        // Pause on hover
        container.addEventListener('mouseenter', stopAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
        
        // Handle keyboard navigation
        container.setAttribute('tabindex', '0');
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }

    // Update carousel position
    function updateCarousel() {
        if (isAnimating) return;
        
        const track = container.querySelector('.carousel-track');
        const slideWidth = 100 / CAROUSEL_CONFIG.visibleSlides;
        const offset = -currentSlide * slideWidth;
        
        track.style.transform = `translateX(${offset}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Navigation functions
    function goToSlide(index) {
        if (isAnimating) return;
        
        // Wrap around if needed
        if (index >= slides.length) {
            index = 0;
        } else if (index < 0) {
            index = slides.length - 1;
        }
        
        currentSlide = index;
        updateCarousel();
        resetAutoSlide();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Auto-slide functionality
    function startAutoSlide() {
        if (!CAROUSEL_CONFIG.autoSlide) return;
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, CAROUSEL_CONFIG.slideDuration);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function resetAutoSlide() {
        stopAutoSlide();
        if (CAROUSEL_CONFIG.autoSlide) {
            startAutoSlide();
        }
    }

    // Add styles
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .carousel-container {
                position: relative;
                width: 100%;
                overflow: hidden;
                margin: 0 auto;
                max-width: 1200px;
            }
            
            .carousel-track {
                display: flex;
                transition: transform ${CAROUSEL_CONFIG.transitionSpeed}ms ease-in-out;
                will-change: transform;
            }
            
            .carousel-slide {
                flex: 0 0 ${100 / CAROUSEL_CONFIG.visibleSlides}%;
                padding: 10px;
                box-sizing: border-box;
                cursor: pointer;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .carousel-slide:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            .video-thumbnail {
                position: relative;
                padding-bottom: 56.25%; /* 16:9 aspect ratio */
                background: #000;
                border-radius: 8px;
                overflow: hidden;
            }
            
            .video-thumbnail img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }
            
            .carousel-slide:hover .video-thumbnail img {
                transform: scale(1.05);
            }
            
            .play-button {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background: rgba(255, 0, 0, 0.8);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .carousel-slide:hover .play-button {
                opacity: 1;
            }
            
            .play-button i {
                color: white;
                font-size: 24px;
                margin-left: 3px;
            }
            
            .video-info {
                padding: 15px 5px;
            }
            
            .video-info h4 {
                margin: 0 0 5px 0;
                font-size: 1rem;
                color: #333;
            }
            
            .video-info p {
                margin: 0;
                font-size: 0.9rem;
                color: #666;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            
            .carousel-nav {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: white;
                border: none;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }
            
            .carousel-nav:hover {
                opacity: 1;
            }
            
            .carousel-nav.prev {
                left: 10px;
            }
            
            .carousel-nav.next {
                right: 10px;
            }
            
            .carousel-dots {
                display: flex;
                justify-content: center;
                padding: 15px 0;
            }
            
            .carousel-dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: #ccc;
                border: none;
                margin: 0 5px;
                padding: 0;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .carousel-dot.active {
                background: #ff0000;
            }
            
            @media (max-width: 768px) {
                .carousel-slide {
                    flex: 0 0 50%;
                }
                
                .carousel-nav {
                    width: 30px;
                    height: 30px;
                }
            }
            
            @media (max-width: 480px) {
                .carousel-slide {
                    flex: 0 0 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize the carousel
    addStyles();
    createCarousel();
});
