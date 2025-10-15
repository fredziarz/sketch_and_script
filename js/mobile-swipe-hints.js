/* ===================================
   Mobile Swipe Hints
   Floating arrows that remind users to swipe
   =================================== */

(function() {
    'use strict';
    
    // Only run on mobile devices
    const isMobile = () => window.innerWidth <= 768;
    
    // Initialize hints on page load
    document.addEventListener('DOMContentLoaded', initSwipeHints);
    
    function initSwipeHints() {
        if (!isMobile()) {
            console.log('Swipe hints: Not mobile, skipping');
            return;
        }
        
        // Find all scrollable containers
        const containers = document.querySelectorAll('.projects-slider, .projects-grid, .related-projects-grid');
        console.log(`Swipe hints: Found ${containers.length} containers`);
        
        containers.forEach(container => {
            // Check if content is scrollable
            if (!isScrollable(container)) {
                console.log('Swipe hints: Container not scrollable, skipping');
                return;
            }
            
            console.log('Swipe hints: Creating ONE hint for gallery');
            
            // Get the wrapper (parent container)
            const wrapper = container.closest('.projects-slider-wrapper') || container.parentElement;
            
            // Remove existing hints to prevent duplicates
            const existingHints = wrapper.querySelector('.swipe-hints');
            if (existingHints) existingHints.remove();
            
            // Create ONE hint for the entire gallery
            const hints = createHintArrows();
            wrapper.style.position = 'relative';
            wrapper.insertBefore(hints, wrapper.firstChild); // Insert at top of wrapper
            
            let showTimer;
            let hideTimer;
            
            // Show hints after delay
            showTimer = setTimeout(() => {
                if (!hasUserScrolled(container)) {
                    console.log('Swipe hints: Showing hint');
                    hints.classList.add('show');
                    
                    // Auto-hide after 4 seconds
                    hideTimer = setTimeout(() => {
                        hints.classList.remove('show');
                    }, 4000);
                }
            }, 1800);
            
            // Hide hints on user interaction
            const hideHints = () => {
                hints.classList.remove('show');
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
            
            container.addEventListener('scroll', hideHints, { once: true });
            container.addEventListener('touchstart', hideHints, { once: true });
            
            // Show hints again after user stops scrolling
            let scrollTimeout;
            container.addEventListener('scroll', () => {
                hints.classList.remove('show');
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    console.log('Swipe hints: Showing hint after scroll stop');
                    hints.classList.add('show');
                    // Auto-hide after 3 seconds
                    setTimeout(() => hints.classList.remove('show'), 3000);
                }, 800); // Show after user stops scrolling for 800ms
            });
        });
    }
    
    function isScrollable(element) {
        return element.scrollWidth > element.clientWidth;
    }
    
    function hasUserScrolled(element) {
        return element.scrollLeft > 0;
    }
    
    function createHintArrows() {
        const hints = document.createElement('div');
        hints.className = 'swipe-hints';
        hints.setAttribute('aria-hidden', 'true');
        
        hints.innerHTML = `
            <div class="swipe-hint swipe-hint-left">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <div class="swipe-hint-text">Scroll to see more</div>
            <div class="swipe-hint swipe-hint-right">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        `;
        
        return hints;
    }
    
    // Re-initialize on window resize (orientation change)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Remove old hints
            document.querySelectorAll('.swipe-hints').forEach(h => h.remove());
            // Reinitialize if now mobile
            if (isMobile()) {
                initSwipeHints();
            }
        }, 250);
    });
})();

