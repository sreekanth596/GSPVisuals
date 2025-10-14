// Services data
const servicesData = [
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
    const sidebar = document.querySelector('.service-sidebar');
    const mainContent = document.querySelector('.service-main');
    
    if (!sidebar || !mainContent) return;
    
    // Clear existing content
    sidebar.innerHTML = '';
    mainContent.innerHTML = '';
    
    // Generate sidebar tabs and main content panels
    servicesData.forEach((service, index) => {
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
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <div class="features-grid">
                ${featuresList}
            </div>
            <button class="btn btn-primary">Book Now</button>
        `;
        
        // Add click event to tab button
        tabBtn.addEventListener('click', () => {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            tabBtn.classList.add('active');
            
            // Update main content
            mainContent.innerHTML = '';
            mainContent.appendChild(panel);
        });
        
        // Add elements to DOM
        sidebar.appendChild(tabBtn);
        
        // Show first panel by default
        if (index === 0) {
            mainContent.appendChild(panel);
        }
    });
}

// Animate statistics counter
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNumber = parseInt(target.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = targetNumber / (duration / 16); // 60fps
                let current = 0;
                
                const updateCount = () => {
                    current += step;
                    if (current < targetNumber) {
                        target.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.textContent = targetNumber;
                    }
                };
                
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Initialize stats counter
animateStats();

// Testimonials Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonials[index].classList.add('active');
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-advance testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Show first testimonial initially
if (testimonials.length > 0) {
    showTestimonial(0);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (menuToggle && navLinks && 
        !menuToggle.contains(e.target) && 
        !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Sticky header on scroll
const header = document.querySelector('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

// Initialize services when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initServices();
});
