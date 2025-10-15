// ===================================
// Sketch & Script Portfolio - JavaScript
// ===================================

// ==================
// Navigation
// ==================

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger menu
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Add shadow to navbar on scroll
const navbar = document.getElementById('navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = window.scrollY;
});

// ==================
// Smooth Scroll
// ==================

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        // Skip empty hashes
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================
// Contact Form
// ==================

// Contact Form with Web3Forms
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('✅ Thank you for your message! I\'ll get back to you soon.');
                this.reset();
            } else {
                alert('⚠️ Failed to send message. Please try again or email: michalwicherek@gmail.com');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('⚠️ An error occurred. Please email directly: michalwicherek@gmail.com');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ==================
// Intersection Observer
// (Animate elements on scroll)
// ==================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards for fade-in animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    // Initial state
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // Observe
    observer.observe(card);
});

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    // Initial state with staggered delay
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    
    // Observe
    observer.observe(category);
});

// ==================
// Performance Optimization
// ==================

// Lazy load images (when you add actual images)
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================
// Analytics (Optional)
// ==================

// Track button clicks
const trackableButtons = document.querySelectorAll('[data-track]');
trackableButtons.forEach(button => {
    button.addEventListener('click', function() {
        const eventName = this.dataset.track;
        
        // Google Analytics 4 example (uncomment when you set up GA4):
        /*
        gtag('event', eventName, {
            'event_category': 'Button',
            'event_label': this.textContent
        });
        */
        
        console.log('Tracked event:', eventName);
    });
});

// ==================
// Utility Functions
// ==================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================
// Console Easter Egg
// ==================

console.log('%c' + `
⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣄⣀⣀⡀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⠶
⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠃⠀
⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠋⠀⠀⠀
⢀⣠⠞⠋⠉⠛⠻⠿⣿⣿⣿⠿⠟⠋⠀⠀⠀⠀⠀
⠞⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`, 'font-size: 16px; color: #CD853F;');

console.log('%c        Rudo tu,', 'font-size: 18px; color: #8B4513;');
console.log('%c       rudo tam.', 'font-size: 18px; color: #8B4513;');
console.log('%c    Rudo tu i tam.', 'font-size: 18px; color: #8B4513;');

console.log('%c', 'font-size: 12px;');
console.log('%c    Sketch & Script Portfolio', 'font-size: 14px; font-weight: bold;');
console.log('%c    Built with vanilla JavaScript, HTML & CSS', 'font-size: 11px; color: #666;');
console.log('%c    GitHub: https://github.com/fredziarz', 'font-size: 11px; color: #64FFDA;');

// ==================
// Scroll Indicator Fade
// ==================

function initScrollIndicatorFade() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        // Fade out on scroll
        if (window.scrollY > 50) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.8';
            scrollIndicator.style.pointerEvents = 'auto';
        }
        
        // Clear existing timeout
        clearTimeout(scrollTimeout);
        
        // Set timeout to fade back in after scrolling stops (only at top)
        scrollTimeout = setTimeout(() => {
            if (window.scrollY <= 50) {
                scrollIndicator.style.opacity = '0.8';
            }
        }, 1500);
    });
}

// ==================
// Ready
// ==================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully!');
    
    // Initialize scroll indicator fade
    initScrollIndicatorFade();
    
    // You can add initialization code here
    // For example: load dynamic content, fetch GitHub repos, etc.
});

