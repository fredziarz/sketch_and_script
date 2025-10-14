/* ===================================
   Project Slider Navigation
   Horizontal Scrolling Gallery
   =================================== */

(function() {
    'use strict';
    
    // Initialize sliders on page load
    document.addEventListener('DOMContentLoaded', initializeSliders);
    
    function initializeSliders() {
        const sliders = document.querySelectorAll('.projects-slider-wrapper');
        
        sliders.forEach(sliderWrapper => {
            const slider = sliderWrapper.querySelector('.projects-slider');
            const prevBtn = sliderWrapper.querySelector('.slider-nav-prev');
            const nextBtn = sliderWrapper.querySelector('.slider-nav-next');
            
            if (!slider || !prevBtn || !nextBtn) return;
            
            // Get hint element (sibling of wrapper)
            const hint = sliderWrapper.previousElementSibling;
            const isHint = hint && hint.classList.contains('slider-hint');
            
            // Hide hint after first interaction
            const hideHint = () => {
                if (isHint && !hint.classList.contains('hidden')) {
                    hint.classList.add('hidden');
                }
            };
            
            // Calculate scroll amount (width of one card + gap)
            const getScrollAmount = () => {
                const card = slider.querySelector('.project-card');
                if (!card) return 0;
                const cardWidth = card.offsetWidth;
                const gap = 32; // 2rem
                return cardWidth + gap;
            };
            
            // Smooth scroll function
            const smoothScroll = (element, target, duration = 300) => {
                const start = element.scrollLeft;
                const change = target - start;
                const startTime = performance.now();
                
                const animateScroll = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function (ease-out)
                    const easeOut = progress => 1 - Math.pow(1 - progress, 3);
                    
                    element.scrollLeft = start + (change * easeOut(progress));
                    
                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    }
                };
                
                requestAnimationFrame(animateScroll);
            };
            
            // Previous button click
            prevBtn.addEventListener('click', () => {
                hideHint();
                const scrollAmount = getScrollAmount();
                const targetScroll = Math.max(0, slider.scrollLeft - scrollAmount);
                smoothScroll(slider, targetScroll);
            });
            
            // Next button click
            nextBtn.addEventListener('click', () => {
                hideHint();
                const scrollAmount = getScrollAmount();
                const maxScroll = slider.scrollWidth - slider.clientWidth;
                const targetScroll = Math.min(maxScroll, slider.scrollLeft + scrollAmount);
                smoothScroll(slider, targetScroll);
            });
            
            // Update button states
            const updateButtons = () => {
                const isAtStart = slider.scrollLeft <= 10;
                const isAtEnd = slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 10);
                
                prevBtn.disabled = isAtStart;
                nextBtn.disabled = isAtEnd;
                
                prevBtn.style.opacity = isAtStart ? '0.3' : '1';
                nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            };
            
            // Listen to scroll events
            let scrollTimeout;
            let hasScrolled = false;
            slider.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(updateButtons, 50);
                
                // Hide hint on first scroll
                if (!hasScrolled) {
                    hasScrolled = true;
                    hideHint();
                }
            });
            
            // Keyboard navigation
            slider.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    nextBtn.click();
                }
            });
            
            // Touch/Mouse drag scrolling
            let isDown = false;
            let startX;
            let scrollLeft;
            
            slider.addEventListener('mousedown', (e) => {
                // Only on non-touch devices
                if (e.pointerType === 'touch') return;
                
                isDown = true;
                slider.style.cursor = 'grabbing';
                slider.style.userSelect = 'none';
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            
            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.style.cursor = 'grab';
            });
            
            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.style.cursor = 'grab';
                slider.style.userSelect = '';
            });
            
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 1.5; // Scroll speed multiplier
                slider.scrollLeft = scrollLeft - walk;
            });
            
            // Set initial cursor
            slider.style.cursor = 'grab';
            
            // Initial button state
            updateButtons();
            
            // Update on resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(updateButtons, 100);
            });
            
            // Update when filter changes (for filtered views)
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    setTimeout(() => {
                        updateButtons();
                        slider.scrollLeft = 0; // Reset scroll on filter
                    }, 100);
                });
            });
        });
    }
    
    // Scroll to card by index (useful for deep linking)
    window.scrollToProjectCard = function(sliderSelector, cardIndex) {
        const sliderWrapper = document.querySelector(sliderSelector);
        if (!sliderWrapper) return;
        
        const slider = sliderWrapper.querySelector('.projects-slider');
        const cards = slider.querySelectorAll('.project-card');
        
        if (cards[cardIndex]) {
            const card = cards[cardIndex];
            const scrollAmount = card.offsetLeft - slider.offsetLeft;
            slider.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    console.log('Project slider initialized');
})();

