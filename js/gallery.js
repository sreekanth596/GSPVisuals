document.addEventListener('DOMContentLoaded', function() {
    // Initialize the gallery
    initGallery();
    
    // Initialize lightbox
    initLightbox();
});

function initGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Filter gallery items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    // Add animation class
                    item.style.animation = 'fadeIn 0.5s forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Add click event to view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const imgSrc = this.closest('.gallery-item').querySelector('img').src;
            openLightbox(imgSrc);
        });
    });
    
    // Add click event to gallery items (for mobile)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const imgSrc = this.querySelector('img').src;
                openLightbox(imgSrc);
            }
        });
    });
}

function initLightbox() {
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <button class="close-btn" aria-label="Close lightbox">&times;</button>
        <div class="lightbox-content">
            <img src="" alt="">
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('close-btn')) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function openLightbox(imgSrc) {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox.querySelector('img');
    
    lightboxImg.src = imgSrc;
    lightboxImg.alt = 'Enlarged view';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Re-enable scrolling
}

// Add CSS for fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
