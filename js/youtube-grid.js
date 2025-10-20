// YouTube Video Grid Configuration
const VIDEO_GRID_CONFIG = {
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
    containerId: 'video-grid',
    itemsPerRow: 3, // Number of videos per row (will be responsive)
    aspectRatio: 16/9 // Aspect ratio for the video thumbnails
};

// Initialize the video grid
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById(VIDEO_GRID_CONFIG.containerId);
    if (!container) return;

    // Create video grid
    function createVideoGrid() {
        container.innerHTML = ''; // Clear existing content
        
        // Create grid container
        const grid = document.createElement('div');
        grid.className = 'video-grid';
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = `repeat(auto-fill, minmax(300px, 1fr))`;
        grid.style.gap = '20px';
        grid.style.padding = '20px';
        
        // Add each video to the grid
        VIDEO_GRID_CONFIG.videos.forEach(video => {
            const videoElement = createVideoCard(video);
            grid.appendChild(videoElement);
        });
        
        container.appendChild(grid);
        
        // Add responsive styles
        addResponsiveStyles();
    }
    
    // Create a video card element
    function createVideoCard(video) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.style.borderRadius = '8px';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        card.style.transition = 'transform 0.3s ease';
        
        // Add hover effect
        card.style.cursor = 'pointer';
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
        
        // Create thumbnail container with play button overlay
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.style.position = 'relative';
        thumbnailContainer.style.paddingBottom = `${(1/VIDEO_GRID_CONFIG.aspectRatio) * 100}%`;
        
        // Create thumbnail image
        const thumbnail = document.createElement('img');
        thumbnail.src = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
        thumbnail.alt = video.title;
        thumbnail.style.position = 'absolute';
        thumbnail.style.width = '100%';
        thumbnail.style.height = '100%';
        thumbnail.style.objectFit = 'cover';
        
        // Create play button overlay
        const playButton = document.createElement('div');
        playButton.innerHTML = `
            <div style="
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
                transition: all 0.3s ease;
            ">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                </svg>
            </div>
        `;
        
        // Create video info
        const info = document.createElement('div');
        info.style.padding = '15px';
        info.style.backgroundColor = '#fff';
        
        const title = document.createElement('h3');
        title.textContent = video.title;
        title.style.margin = '0 0 8px 0';
        title.style.fontSize = '1rem';
        
        const description = document.createElement('p');
        description.textContent = video.description;
        description.style.margin = '0';
        description.style.fontSize = '0.9rem';
        description.style.color = '#666';
        
        // Assemble the card
        thumbnailContainer.appendChild(thumbnail);
        thumbnailContainer.appendChild(playButton);
        
        info.appendChild(title);
        info.appendChild(description);
        
        card.appendChild(thumbnailContainer);
        card.appendChild(info);
        
        // Add click handler to open video
        card.addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
        });
        
        return card;
    }
    
    // Add responsive styles
    function addResponsiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .video-grid {
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
                }
            }
            
            @media (max-width: 480px) {
                .video-grid {
                    grid-template-columns: 1fr !important;
                }
            }
            
            .video-card:hover {
                box-shadow: 0 8px 16px rgba(0,0,0,0.2) !important;
            }
            
            .video-card:active {
                transform: scale(0.98) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize the grid
    createVideoGrid();
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createVideoGrid, 250);
    });
});
