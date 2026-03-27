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
        if (!isMobile()) return;
        
        const containers = document.querySelectorAll('.projects-slider, .projects-grid, .related-projects-grid');
        
        containers.forEach(container => {
            if (!isScrollable(container)) return;
            
            const wrapper = container.closest('.projects-slider-wrapper') || container.parentElement;
            
            const existingHints = wrapper.querySelector('.swipe-hints');
            if (existingHints) existingHints.remove();
            
            const hints = createHintArrows();
            wrapper.style.position = 'relative';
            wrapper.insertBefore(hints, wrapper.firstChild);
            
            let showTimer;
            let hideTimer;
            
            showTimer = setTimeout(() => {
                if (!hasUserScrolled(container)) {
                    hints.classList.add('show');
                    
                    hideTimer = setTimeout(() => {
                        hints.classList.remove('show');
                    }, 4000);
                }
            }, 1800);
            
            const hideHints = () => {
                hints.classList.remove('show');
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
            
            container.addEventListener('scroll', hideHints, { once: true });
            container.addEventListener('touchstart', hideHints, { once: true });
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
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.swipe-hints').forEach(h => h.remove());
            if (isMobile()) initSwipeHints();
        }, 250);
    });
})();

