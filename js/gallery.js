// Configuration
const GALLERY_CONFIG = {
    itemsPerLoad: 12,
    loadingDelay: 300,
    animationDuration: 400,
    categories: [
        'all', 'wedding', 'portrait', 'event', 'maternity', 'pre-wedding',
        'birthday', 'family', 'fashion', 'product', 'commercial'
    ],
    defaultCategory: 'all',
    imageBasePath: 'images/gallery/',
    thumbnailSuffix: '_thumb',
    fullSizeSuffix: '_full'
};

// Gallery Data (Replace with your actual image data)
const GALLERY_ITEMS = [
    {
        id: 1,
        title: 'Bride Portrait',
        description: 'Elegant bridal moment captured in natural light',
        category: 'wedding',
        date: '2023-10-15',
        fileName: 'bride-portrait.jpg',
        featured: true
    },
    {
        id: 2,
        title: 'Couple Pre-Wedding',
        description: 'Romantic pre-wedding shoot at sunset',
        category: 'pre-wedding',
        date: '2023-09-22',
        fileName: 'couple-sunset.jpg',
        featured: true
    },
    // Add more items as needed
];

// DOM Elements
let currentFilter = GALLERY_CONFIG.defaultCategory;
let visibleItems = 0;
let isLoading = false;

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    loadInitialItems();
});

function initializeGallery() {
    // Initialize lightGallery
    const galleryGrid = document.getElementById('galleryGrid');
    
    // Load more items when scroll reaches bottom
    window.addEventListener('scroll', handleScroll);
    
    // Initialize filter buttons
    initializeFilters();
}

function setupEventListeners() {
    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreItems);
    }
    
    // Lightbox navigation
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox) {
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.querySelector('.lightbox-nav.prev').addEventListener('click', showPreviousImage);
        lightbox.querySelector('.lightbox-nav.next').addEventListener('click', showNextImage);
    }
    
    // Close lightbox when clicking outside content
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox')) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('galleryLightbox').classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPreviousImage();
            if (e.key === 'ArrowRight') showNextImage();
        }
    });
}

function initializeFilters() {
    const filterContainer = document.querySelector('.gallery-filters');
    if (!filterContainer) return;
    
    // Clear existing buttons
    filterContainer.innerHTML = '';
    
    // Create filter buttons
    GALLERY_CONFIG.categories.forEach(category => {
        if (category === 'all' || GALLERY_ITEMS.some(item => item.category === category)) {
            const button = document.createElement('button');
            button.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
            button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            button.setAttribute('data-filter', category);
            button.addEventListener('click', () => filterGallery(category));
            filterContainer.appendChild(button);
        }
    });
}

function filterGallery(category) {
    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
    });
    
    currentFilter = category;
    visibleItems = 0;
    
    // Clear gallery
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    // Show loading state
    showLoadingState();
    
    // Load items for the selected filter
    setTimeout(() => {
        loadInitialItems();
    }, GALLERY_CONFIG.loadingDelay);
}

function loadInitialItems() {
    if (isLoading) return;
    
    isLoading = true;
    showLoadingState();
    
    setTimeout(() => {
        const itemsToLoad = getFilteredItems().slice(0, GALLERY_CONFIG.itemsPerLoad);
        renderGalleryItems(itemsToLoad);
        visibleItems = itemsToLoad.length;
        
        // Hide loading state
        hideLoadingState();
        
        // Show/hide load more button
        updateLoadMoreButton();
        
        isLoading = false;
    }, GALLERY_CONFIG.loadingDelay);
}

function loadMoreItems() {
    if (isLoading) return;
    
    isLoading = true;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.classList.add('loading');
    
    setTimeout(() => {
        const startIndex = visibleItems;
        const endIndex = startIndex + GALLERY_CONFIG.itemsPerLoad;
        const itemsToLoad = getFilteredItems().slice(startIndex, endIndex);
        
        renderGalleryItems(itemsToLoad);
        visibleItems += itemsToLoad.length;
        
        // Update load more button
        updateLoadMoreButton();
        
        isLoading = false;
        if (loadMoreBtn) loadMoreBtn.classList.remove('loading');
        
        // Smooth scroll to show new items
        if (itemsToLoad.length > 0) {
            const galleryGrid = document.getElementById('galleryGrid');
            const lastItem = galleryGrid.lastElementChild;
            lastItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, GALLERY_CONFIG.loadingDelay);
}

function getFilteredItems() {
    return currentFilter === 'all' 
        ? [...GALLERY_ITEMS] 
        : GALLERY_ITEMS.filter(item => item.category === currentFilter);
}

function renderGalleryItems(items) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    items.forEach(item => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
    });
    
    // Initialize lightGallery for new items
    if (window.lightGallery) {
        window.lightGallery(document.getElementById('galleryGrid'), {
            selector: '.gallery-item',
            download: false,
            counter: false,
            getCaptionFromTitleOrAlt: false,
            appendSubHtmlTo: '.lg-content',
            subHtmlSelectorRelative: true,
            speed: 300,
            hideBarsDelay: 2000,
            thumbnail: true,
            animateThumb: true,
            showThumbByDefault: false,
            thumbWidth: 80,
            thumbContHeight: 80,
            thumbMargin: 5,
            autoplayVideoOnSlide: false,
            autoplayFirstVideo: false,
            videoMaxWidth: '1080px',
            loadYoutubeThumbnail: true,
            youtubeThumbSize: 'hqdefault',
            vimeoThumbSize: 'thumbnail_large',
            dailymotionThumbSize: 'thumbnail_720_url',
            vkThumbSize: 'thumbnail',
            videojs: false,
            defaultCaption: '<h4>%title%</h4><p>%description%</p>',
            enableDrag: true,
            enableSwipe: true,
            closable: true,
            loop: true,
            escKey: true,
            keyPress: true,
            trapFocus: true,
            download: true,
            counter: true,
            enableDrag: true,
            enableSwipe: true
        });
    }
}

function createGalleryItem(item) {
    const itemElement = document.createElement('div');
    itemElement.className = `gallery-item ${item.featured ? 'featured' : ''}`;
    itemElement.setAttribute('data-category', item.category);
    itemElement.setAttribute('data-src', `${GALLERY_CONFIG.imageBasePath}${item.fileName}`);
    itemElement.setAttribute('data-sub-html', `
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="gallery-meta">
            <span class="category">${item.category}</span>
            <span class="date">${formatDate(item.date)}</span>
        </div>
    `);
    
    const img = document.createElement('img');
    img.src = `${GALLERY_CONFIG.imageBasePath}${item.fileName.replace(/\.(jpg|jpeg|png|webp)$/i, `${GALLERY_CONFIG.thumbnailSuffix}.$1`)}`;
    img.alt = item.title;
    img.loading = 'lazy';
    
    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    overlay.innerHTML = `
        <div class="overlay-content">
            <h4>${item.title}</h4>
            <p>${item.category}</p>
            <div class="view-btn">
                <i class="fas fa-search-plus"></i>
            </div>
        </div>
    `;
    
    itemElement.appendChild(img);
    itemElement.appendChild(overlay);
    
    return itemElement;
}

function showLoadingState() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loader = galleryGrid.querySelector('.gallery-loader');
    
    if (!loader) {
        const loaderDiv = document.createElement('div');
        loaderDiv.className = 'gallery-loader';
        loaderDiv.innerHTML = `
            <div class="spinner"></div>
            <p>Loading gallery...</p>
        `;
        galleryGrid.appendChild(loaderDiv);
    } else {
        loader.style.display = 'flex';
    }
}

function hideLoadingState() {
    const loader = document.querySelector('.gallery-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    const totalItems = getFilteredItems().length;
    
    if (visibleItems >= totalItems) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'flex';
        loadMoreBtn.querySelector('span').textContent = `Load More (${totalItems - visibleItems} remaining)`;
    }
}

function handleScroll() {
    if (isLoading) return;
    
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn && scrollTop + clientHeight >= scrollHeight - 600) {
        loadMoreItems();
    }
}

function openLightbox(imageData) {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = lightbox.querySelector('#lightboxImg');
    const lightboxTitle = lightbox.querySelector('#lightboxTitle');
    const lightboxDesc = lightbox.querySelector('#lightboxDesc');
    const lightboxCategory = lightbox.querySelector('#lightboxCategory');
    const lightboxDate = lightbox.querySelector('#lightboxDate');
    
    // Set lightbox content
    lightboxImg.src = imageData.src;
    lightboxImg.alt = imageData.title;
    lightboxTitle.textContent = imageData.title;
    lightboxDesc.textContent = imageData.description;
    lightboxCategory.textContent = imageData.category;
    lightboxDate.textContent = formatDate(imageData.date);
    
    // Update social share links
    const shareUrl = encodeURIComponent(window.location.href);
    const shareText = encodeURIComponent(`Check out this amazing ${imageData.category} photo: ${imageData.title}`);
    
    lightbox.querySelectorAll('.social-share').forEach(link => {
        const platform = link.getAttribute('data-platform');
        let shareLink = '#';
        
        switch (platform) {
            case 'facebook':
                shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
                break;
            case 'twitter':
                shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
                break;
            case 'pinterest':
                shareLink = `https://pinterest.com/pin/create/button/?url=${shareUrl}&media=${imageData.src}&description=${shareText}`;
                break;
        }
        
        link.setAttribute('href', shareLink);
        link.setAttribute('target', '_blank');
    });
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    
    // Set focus for accessibility
    lightbox.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    
    // Return focus to the last focused element
    if (window.lastFocusedElement) {
        window.lastFocusedElement.focus();
    }
}

function showNextImage() {
    // Implementation for showing next image in lightbox
    // You'll need to track current image index in your gallery
}

function showPreviousImage() {
    // Implementation for showing previous image in lightbox
    // You'll need to track current image index in your gallery
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return '';
    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

// Initialize lightGallery if available
if (window.lightGallery) {
    window.lightGallery(document.getElementById('galleryGrid'), {
        selector: '.gallery-item',
        download: false,
        counter: false,
        getCaptionFromTitleOrAlt: false,
        appendSubHtmlTo: '.lg-content',
        subHtmlSelectorRelative: true
    });
}
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
