/* ===================================
   Enhanced Project Slider
   Infinite Carousel (Web) + Tinder-like Swipes (Mobile)
   =================================== */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        // Mobile Tinder-like swipe physics
        mobile: {
            velocityThreshold: 0.3,      // Threshold for momentum vs snap
            momentumFriction: 0.92,      // Deceleration rate (Tinder-smooth)
            minVelocity: 0.05,           // Stop threshold
            snapDuration: 200,           // Snap animation duration (FASTER: was 350)
            rubberBand: 0.4,             // Resistance at boundaries
            swipeMultiplier: 1.2         // How responsive swipes feel
        },
        // Desktop infinite carousel
        desktop: {
            snapDuration: 400,
            easingCurve: 'easeOutQuart'
        }
    };
    
    // Check if mobile device
    const isMobile = () => window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize sliders on page load
    document.addEventListener('DOMContentLoaded', initializeSliders);
    
    function initializeSliders() {
        const sliders = document.querySelectorAll('.projects-slider-wrapper');
        
        sliders.forEach(sliderWrapper => {
            const slider = sliderWrapper.querySelector('.projects-slider');
            const track = slider.querySelector('.projects-track');
            const prevBtn = sliderWrapper.querySelector('.slider-nav-prev');
            const nextBtn = sliderWrapper.querySelector('.slider-nav-next');
            
            if (!slider || !track || !prevBtn || !nextBtn) return;
            
            // Setup infinite carousel for BOTH mobile and desktop
            const cards = Array.from(track.querySelectorAll('.project-card:not(.clone)'));
            const totalCards = cards.length;
            
            // Clone cards for infinite loop (mobile AND desktop)
            if (totalCards > 0) {
                setupInfiniteCarousel(track, cards);
            }
            
            // Slider state - start at first real card (after clones)
            let currentIndex = totalCards; // Start at first real card (index 3 for 3 clones)
            let isDragging = false;
            let startX = 0;
            let currentX = 0;
            let lastX = 0;
            let lastTime = 0;
            let velocity = 0;
            let momentumRAF = null;
            
            // Get card dimensions
            const getCardWidth = () => {
                const card = track.querySelector('.project-card');
                if (!card) return 340;
                const cardWidth = card.offsetWidth;
                const gap = parseInt(getComputedStyle(track).gap) || 32;
                return cardWidth + gap;
            };
            
            // Snap to nearest card
            const snapToCard = (targetIndex = null, duration = CONFIG.mobile.snapDuration) => {
                if (momentumRAF) {
                    cancelAnimationFrame(momentumRAF);
                    momentumRAF = null;
                }
                
                const cardWidth = getCardWidth();
                const scrollLeft = slider.scrollLeft;
                
                if (targetIndex === null) {
                    // Find nearest card
                    targetIndex = Math.round(scrollLeft / cardWidth);
                }
                
                const targetScroll = targetIndex * cardWidth;
                
                currentIndex = targetIndex;
                smoothScrollTo(slider, targetIndex * cardWidth, duration);
                
                // Handle infinite loop wrapping (mobile AND desktop)
                handleInfiniteLoop(slider, track, targetIndex, cardWidth);
            };
            
            // Smooth scroll with easing
            const smoothScrollTo = (element, target, duration) => {
                const start = element.scrollLeft;
                const distance = target - start;
                const startTime = Date.now();
                
                // Easing functions
                const easeOutQuart = t => 1 - Math.pow(1 - t, 4);
                const easeOutCubic = t => 1 - Math.pow(1 - t, 3); // Faster, stronger
                const easeOutCirc = t => Math.sqrt(1 - Math.pow(t - 1, 2)); // Very snappy
                const easeOutElastic = t => {
                    if (t === 0 || t === 1) return t;
                    const c4 = (2 * Math.PI) / 3;
                    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
                };
                
                const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Use faster easing on mobile for snappier feel
                    const easing = isMobile() ? easeOutCirc : easeOutQuart;
                    const eased = easing(progress);
                    
                    element.scrollLeft = start + (distance * eased);
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };
                
                requestAnimationFrame(animate);
            };
            
            // Setup infinite carousel (clone cards)
            function setupInfiniteCarousel(track, originalCards) {
                // Clone first and last sets for seamless loop
                const cloneCount = Math.min(3, originalCards.length);
                
                // Clone last cards at start
                for (let i = originalCards.length - cloneCount; i < originalCards.length; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.classList.add('clone');
                    clone.setAttribute('aria-hidden', 'true');
                    clone.style.display = 'block'; // Ensure clones are always visible
                    clone.style.opacity = '1'; // Reset any filter fade effects
                    clone.style.transition = 'none'; // No transitions on clones
                    clone.style.backfaceVisibility = 'hidden'; // Prevent flickering
                    track.insertBefore(clone, track.firstChild);
                }
                
                // Clone first cards at end
                for (let i = 0; i < cloneCount; i++) {
                    const clone = originalCards[i].cloneNode(true);
                    clone.classList.add('clone');
                    clone.setAttribute('aria-hidden', 'true');
                    clone.style.display = 'block'; // Ensure clones are always visible
                    clone.style.opacity = '1'; // Reset any filter fade effects
                    clone.style.transition = 'none'; // No transitions on clones
                    clone.style.backfaceVisibility = 'hidden'; // Prevent flickering
                    track.appendChild(clone);
                }
                
                // Position at first real card (after clones)
                setTimeout(() => {
                    const cardWidth = getCardWidth();
                    slider.scrollLeft = cloneCount * cardWidth;
                    currentIndex = cloneCount;
                }, 10);
            }
            
            // Handle infinite loop wrapping
            function handleInfiniteLoop(slider, track, index, cardWidth) {
                const allCards = track.querySelectorAll('.project-card');
                const realCards = track.querySelectorAll('.project-card:not(.clone)');
                const cloneCount = Math.floor((allCards.length - realCards.length) / 2);
                
                // Wrap to end if at start
                if (index < cloneCount) {
                    setTimeout(() => {
                        slider.scrollLeft = (realCards.length + index) * cardWidth;
                        currentIndex = realCards.length + index;
                    }, 50);
                }
                // Wrap to start if at end
                else if (index >= realCards.length + cloneCount) {
                    setTimeout(() => {
                        slider.scrollLeft = (index - realCards.length) * cardWidth;
                        currentIndex = index - realCards.length;
                    }, 50);
                }
            }
            
            // Navigation buttons
            prevBtn.addEventListener('click', () => {
                snapToCard(currentIndex - 1);
            });
            
            nextBtn.addEventListener('click', () => {
                snapToCard(currentIndex + 1);
            });
            
            // Update button states (always enabled for infinite carousel on both mobile and desktop)
            const updateButtons = () => {
                // Always enabled for infinite carousel
                prevBtn.style.opacity = isMobile() ? '0' : '1'; // Hide on mobile
                nextBtn.style.opacity = isMobile() ? '0' : '1'; // Hide on mobile
                prevBtn.disabled = false;
                nextBtn.disabled = false;
            };
            
            // Touch/Swipe handling - Tinder-like physics
            let touchStartTime = 0;
            
            slider.addEventListener('touchstart', (e) => {
                if (momentumRAF) {
                    cancelAnimationFrame(momentumRAF);
                    momentumRAF = null;
                }
                
                isDragging = true;
                startX = e.touches[0].clientX;
                lastX = startX;
                currentX = startX;
                touchStartTime = Date.now();
                lastTime = touchStartTime;
                velocity = 0;
            }, { passive: true });
            
            slider.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                
                currentX = e.touches[0].clientX;
                const currentTime = Date.now();
                const timeDelta = currentTime - lastTime;
                
                if (timeDelta > 0) {
                    const distance = currentX - lastX;
                    velocity = (distance / timeDelta) * CONFIG.mobile.swipeMultiplier;
                }
                
                lastX = currentX;
                lastTime = currentTime;
            }, { passive: true });
            
            slider.addEventListener('touchend', (e) => {
                if (!isDragging) return;
                isDragging = false;
                
                const swipeDistance = currentX - startX;
                const absVelocity = Math.abs(velocity);
                
                // Determine behavior: snap vs momentum
                if (absVelocity < CONFIG.mobile.velocityThreshold) {
                    // Gentle swipe - snap to nearest
                    snapToCard();
                } else {
                    // Fast swipe - apply momentum (Tinder-style)
                    applyMomentum(slider, velocity);
                }
                
                updateButtons();
            }, { passive: true });
            
            // Momentum scrolling (Tinder-like smooth deceleration)
            function applyMomentum(slider, initialVelocity) {
                let currentVelocity = initialVelocity * 1000; // Convert to px/s
                let lastFrameTime = Date.now();
                
                const animate = () => {
                    const currentTime = Date.now();
                    const deltaTime = (currentTime - lastFrameTime) / 1000;
                    lastFrameTime = currentTime;
                    
                    // Apply friction
                    currentVelocity *= CONFIG.mobile.momentumFriction;
                    
                    // Calculate scroll delta
                    const scrollDelta = currentVelocity * deltaTime;
                    slider.scrollLeft -= scrollDelta;
                    
                    // Check if should stop
                    if (Math.abs(currentVelocity) < CONFIG.mobile.minVelocity * 1000) {
                        snapToCard();
                        return;
                    }
                    
                    // No boundary check - infinite carousel on mobile now
                    
                    momentumRAF = requestAnimationFrame(animate);
                };
                
                momentumRAF = requestAnimationFrame(animate);
            }
            
            // Mouse drag for desktop
            slider.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return; // Left click only
                isDragging = true;
                startX = e.pageX;
                lastX = startX;
                slider.style.cursor = 'grabbing';
                slider.style.userSelect = 'none';
                e.preventDefault();
            });
            
            slider.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.pageX;
                const walk = (lastX - x) * 2;
                slider.scrollLeft += walk;
                lastX = x;
            });
            
            slider.addEventListener('mouseup', () => {
                if (!isDragging) return;
                isDragging = false;
                slider.style.cursor = 'grab';
                slider.style.userSelect = '';
                snapToCard();
            });
            
            slider.addEventListener('mouseleave', () => {
                if (!isDragging) return;
                isDragging = false;
                slider.style.cursor = 'grab';
                slider.style.userSelect = '';
            });
            
            // Mouse wheel scrolling on desktop - gentle snap after
            if (!isMobile()) {
                let wheelTimeout;
                slider.addEventListener('wheel', (e) => {
                    clearTimeout(wheelTimeout);
                    // Snap after wheel scrolling stops
                    wheelTimeout = setTimeout(() => {
                        if (!isDragging) {
                            snapToCard(null, 500); // Longer duration for wheel scroll
                        }
                    }, 250);
                }, { passive: true });
            }
            
            // Auto-snap after scroll stops (both mobile and desktop)
            let scrollTimeout;
            slider.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                // Gentle snap timing - different for mobile vs desktop
                const snapDelay = isMobile() ? 50 : 200; // Faster on mobile (was 100)
                const snapDuration = isMobile() ? CONFIG.mobile.snapDuration : 500;
                
                scrollTimeout = setTimeout(() => {
                    if (!isDragging && !momentumRAF) {
                        const cardWidth = getCardWidth();
                        const scrollLeft = slider.scrollLeft;
                        const currentCardIndex = Math.round(scrollLeft / cardWidth);
                        const targetScroll = currentCardIndex * cardWidth;
                        
                        // Only snap if not already perfectly aligned
                        if (Math.abs(scrollLeft - targetScroll) > 2) {
                            snapToCard(null, snapDuration);
                        }
                    }
                }, snapDelay);
            }, { passive: true });
            
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
            
            // Initialize
            slider.style.cursor = 'grab';
            updateButtons();
            
            // Handle resize
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    updateButtons();
                    snapToCard(currentIndex, 0); // Instant snap on resize
                }, 100);
            });
            
            // Rebuild carousel when filters change (for infinite loop on mobile and desktop)
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Give time for filter to apply (display changes)
                    setTimeout(() => {
                        // Remove old clones
                        track.querySelectorAll('.project-card.clone').forEach(clone => {
                            clone.remove();
                        });
                        
                        // Get currently visible cards (after filter)
                        const visibleCards = Array.from(track.querySelectorAll('.project-card:not(.clone)'))
                            .filter(card => card.style.display !== 'none');
                        
                        // Rebuild infinite carousel with visible cards for both mobile and desktop
                        if (visibleCards.length > 0) {
                            setupInfiniteCarousel(track, visibleCards);
                        }
                        
                        // Reset scroll position to first real card (after clones)
                        const cloneCount = Math.min(3, visibleCards.length);
                        slider.scrollLeft = cloneCount * getCardWidth();
                        currentIndex = cloneCount;
                        updateButtons();
                    }, 50);
                });
            });
        });
    }
    
    console.log('Enhanced project slider initialized (Tinder + Wheel of Fortune)');
})();

