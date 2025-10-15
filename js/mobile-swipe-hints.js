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
            
            console.log('Swipe hints: Creating hints for scrollable container');
            
            // Find all project cards within this container
            const projectCards = container.querySelectorAll('.project-card');
            console.log(`Swipe hints: Found ${projectCards.length} project cards`);
            
            // Add hints to each project card
            projectCards.forEach((card, index) => {
                // Create unique hints for this card
                const hints = createHintArrows();
                card.style.position = 'relative';
                card.appendChild(hints);
                
                // Show hints after delay (stagger slightly for visual effect)
                const showTimer = setTimeout(() => {
                    console.log(`Swipe hints: Showing hints on card ${index + 1}`);
                    hints.classList.add('show');
                }, 1800 + (index * 50)); // Slight stagger
                
                // Hide hints on ANY user interaction with the container
                const hideHints = () => {
                    hints.classList.remove('show');
                };
                
                // Hide on scroll or touch (but don't use 'once' so it works continuously)
                container.addEventListener('scroll', hideHints);
                container.addEventListener('touchstart', hideHints);
                
                // Show hints again when card comes into view and user stops scrolling
                let scrollTimeout;
                container.addEventListener('scroll', () => {
                    clearTimeout(scrollTimeout);
                    scrollTimeout = setTimeout(() => {
                        // Check if this card is in viewport
                        const cardRect = card.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        const isVisible = cardRect.left < containerRect.right && cardRect.right > containerRect.left;
                        
                        if (isVisible) {
                            hints.classList.add('show');
                            // Auto-hide after 3 seconds
                            setTimeout(() => hints.classList.remove('show'), 3000);
                        }
                    }, 800); // Show after user stops scrolling for 800ms
                });
            });
            
            return; // Skip the old single-hint code below
            
            // OLD CODE (keeping for reference, won't execute)
            const hints = createHintArrows();
            const wrapper = container.closest('.projects-slider-wrapper') || container.parentElement;
            wrapper.style.position = 'relative';
            wrapper.appendChild(hints);
            
            // Show hints after delay
            const showTimer = setTimeout(() => {
                if (!hasUserScrolled(container)) {
                    console.log('Swipe hints: Showing hints');
                    hints.classList.add('show');
                } else {
                    console.log('Swipe hints: User already scrolled, not showing');
                }
            }, 1800); // 1.8 seconds
            
            // Hide hints on user interaction
            const hideHints = () => {
                hints.classList.remove('show');
                clearTimeout(showTimer);
            };
            
            // Listen for scroll/touch events
            container.addEventListener('scroll', hideHints, { once: true });
            container.addEventListener('touchstart', hideHints, { once: true });
            
            // Auto-hide after 4 seconds if shown
            setTimeout(() => {
                hints.classList.remove('show');
            }, 5800); // 1.8s delay + 4s display
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </div>
            <div class="swipe-hint swipe-hint-right">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

