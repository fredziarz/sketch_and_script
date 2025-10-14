/**
 * Page Transitions - Creates smooth, fluid navigation between pages
 * Provides a super soft flow with fade effects
 */

// =============================================================================
// VIEW TRANSITIONS API (Modern Browsers)
// =============================================================================

/**
 * Check if View Transitions API is supported
 */
function supportsViewTransitions() {
    return 'startViewTransition' in document;
}

/**
 * Navigate with View Transition API (Chrome 111+, Edge 111+)
 */
function navigateWithTransition(url) {
    if (supportsViewTransitions()) {
        document.startViewTransition(() => {
            window.location.href = url;
        });
    } else {
        // Fallback: Use CSS animation
        navigateWithFallback(url);
    }
}

// =============================================================================
// FALLBACK TRANSITIONS (All Browsers)
// =============================================================================

/**
 * Fallback transition using CSS animations
 */
function navigateWithFallback(url) {
    const body = document.body;
    
    // Add fade-out class
    body.classList.add('page-transitioning-out');
    
    // Wait for animation, then navigate
    setTimeout(() => {
        window.location.href = url;
    }, 300); // Match CSS transition duration
}

// =============================================================================
// INTERCEPT NAVIGATION
// =============================================================================

/**
 * Intercept all internal link clicks for smooth transitions
 */
function initPageTransitions() {
    // Get all internal links
    const links = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href^="./"]:not([target="_blank"]), a[href^="index.html"], a[href^="architecture.html"], a[href^="coding.html"]');
    
    links.forEach(link => {
        // Skip if already has transition handler
        if (link.dataset.transitionEnabled) return;
        
        link.addEventListener('click', (e) => {
            // Don't intercept if cmd/ctrl/shift key is pressed (new tab/window)
            if (e.metaKey || e.ctrlKey || e.shiftKey) return;
            
            // Don't intercept external links or anchors
            const href = link.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('http')) return;
            
            // Prevent default navigation
            e.preventDefault();
            
            // Trigger smooth transition
            const targetUrl = link.href;
            navigateWithTransition(targetUrl);
        });
        
        // Mark as processed
        link.dataset.transitionEnabled = 'true';
    });
}

// =============================================================================
// PAGE LOAD ANIMATIONS
// =============================================================================

/**
 * Fade in page content on load
 */
function initPageLoadAnimation() {
    // Remove transitioning-out class if present (back button)
    document.body.classList.remove('page-transitioning-out');
    
    // Add loaded class for fade-in
    // Small delay to ensure styles are applied
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.classList.add('page-loaded');
        });
    });
}

// =============================================================================
// SMOOTH SCROLL
// =============================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// =============================================================================
// SCROLL ANIMATIONS
// =============================================================================

/**
 * Animate elements as they enter viewport
 */
function initScrollAnimations() {
    // Get all animatable elements
    const animatedElements = document.querySelectorAll('.project-card, .game-card, .skill-card, .tech-card, .section-header');
    
    // Create Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Optional: Unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
    });
    
    // Observe all elements
    animatedElements.forEach(el => {
        // Add initial state
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}

// =============================================================================
// HERO ANIMATIONS
// =============================================================================

/**
 * Animate hero sections on page load
 */
function initHeroAnimations() {
    const hero = document.querySelector('.hero, .page-hero');
    
    if (hero) {
        // Stagger animation for hero children
        const heroChildren = hero.querySelectorAll('.hero-title, .hero-subtitle, .page-hero-title, .page-hero-subtitle, .btn, .hero-side');
        
        heroChildren.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('hero-animate');
        });
    }
}

// =============================================================================
// INITIALIZE
// =============================================================================

/**
 * Initialize all transition effects
 */
function init() {
    // Page load animation
    initPageLoadAnimation();
    
    // Hero animations
    initHeroAnimations();
    
    // Scroll animations
    initScrollAnimations();
    
    // Smooth scroll for anchors
    initSmoothScroll();
    
    // Page transitions
    initPageTransitions();
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Re-initialize on dynamic content changes (if using filters, etc)
window.reinitTransitions = function() {
    initPageTransitions();
    initScrollAnimations();
};

// =============================================================================
// PREFERS REDUCED MOTION
// =============================================================================

/**
 * Respect user's motion preferences
 */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable transitions for users who prefer reduced motion
    document.documentElement.classList.add('reduce-motion');
}

