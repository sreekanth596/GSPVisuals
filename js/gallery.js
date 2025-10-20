// Configuration
const GALLERY_CONFIG = {
    itemsPerLoad: 12,
    loadingDelay: 300,
    categories: [
        'all', 'wedding', 'portrait', 'event', 'maternity', 'pre-wedding',
        'birthday', 'family', 'fashion', 'product', 'commercial'
    ],
    defaultCategory: 'all',
    imageBasePath: 'images/gallery/',
    thumbnailSuffix: '_thumb',
    fullSizeSuffix: '_full'
};

// Gallery Data
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
    // Add more items here
];

let currentFilter = GALLERY_CONFIG.defaultCategory;
let visibleItems = 0;
let isLoading = false;

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    loadInitialItems();
    setupLoadMoreButton();
    setupScrollLoad();
});

// Initialize filter buttons
function initializeFilters() {
    const filterContainer = document.querySelector('.gallery-filters');
    if (!filterContainer) return;
    filterContainer.innerHTML = '';

    GALLERY_CONFIG.categories.forEach(category => {
        if (category === 'all' || GALLERY_ITEMS.some(i => i.category === category)) {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
            btn.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            btn.dataset.filter = category;
            btn.addEventListener('click', () => filterGallery(category));
            filterContainer.appendChild(btn);
        }
    });
}

// Filter gallery
function filterGallery(category) {
    currentFilter = category;
    visibleItems = 0;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });

    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = '';

    loadInitialItems();
}

// Load initial items
function loadInitialItems() {
    if (isLoading) return;
    isLoading = true;

    const itemsToLoad = getFilteredItems().slice(0, GALLERY_CONFIG.itemsPerLoad);
    renderGalleryItems(itemsToLoad);
    visibleItems = itemsToLoad.length;

    isLoading = false;
    updateLoadMoreButton();
}

// Load more items
function loadMoreItems() {
    if (isLoading) return;
    isLoading = true;

    const start = visibleItems;
    const end = start + GALLERY_CONFIG.itemsPerLoad;
    const itemsToLoad = getFilteredItems().slice(start, end);

    renderGalleryItems(itemsToLoad);
    visibleItems += itemsToLoad.length;

    isLoading = false;
    updateLoadMoreButton();
}

// Get filtered items
function getFilteredItems() {
    return currentFilter === 'all' ? [...GALLERY_ITEMS] : GALLERY_ITEMS.filter(i => i.category === currentFilter);
}

// Render gallery items
function renderGalleryItems(items) {
    const grid = document.getElementById('galleryGrid');

    items.forEach(item => {
        const div = document.createElement('a');
        div.className = 'gallery-item';
        div.href = `${GALLERY_CONFIG.imageBasePath}${item.fileName}`;
        div.dataset.subHtml = `<h4>${item.title}</h4><p>${item.description}</p><span>${item.category} | ${formatDate(item.date)}</span>`;

        const img = document.createElement('img');
        img.src = `${GALLERY_CONFIG.imageBasePath}${item.fileName.replace(/\.(jpg|jpeg|png|webp)$/i, `${GALLERY_CONFIG.thumbnailSuffix}.$1`)}`;
        img.alt = item.title;
        img.loading = 'lazy';

        div.appendChild(img);
        grid.appendChild(div);
    });

    // Initialize or refresh lightGallery
    if (window.lightGallery) {
        if (grid.lightGalleryInstance) {
            grid.lightGalleryInstance.destroy();
        }
        grid.lightGalleryInstance = lightGallery(grid, {
            selector: '.gallery-item',
            download: false,
            counter: true,
            thumbnail: true,
            subHtmlSelectorRelative: true,
            mode: 'lg-fade'
        });
    }
}

// Load more button setup
function setupLoadMoreButton() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;
    btn.addEventListener('click', loadMoreItems);
}

// Auto load on scroll
function setupScrollLoad() {
    window.addEventListener('scroll', () => {
        if (isLoading) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 600) {
            loadMoreItems();
        }
    });
}

// Update load more button
function updateLoadMoreButton() {
    const btn = document.getElementById('loadMoreBtn');
    if (!btn) return;

    const remaining = getFilteredItems().length - visibleItems;
    if (remaining <= 0) {
        btn.style.display = 'none';
    } else {
        btn.style.display = 'flex';
        btn.querySelector('span').textContent = `Load More (${remaining} remaining)`;
    }
}

// Utilities
function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
