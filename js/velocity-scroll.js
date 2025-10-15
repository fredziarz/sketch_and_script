(function() {
    'use strict';

    const VELOCITY_THRESHOLD = 0.5; // Below this = gentle, above = vigorous
    const RUBBER_BAND_DURATION = 300; // ms for rubber band snap (was 400)
    const MOMENTUM_FRICTION = 0.95; // Friction for "Wheel of Fortune" effect
    const MIN_VELOCITY = 0.1; // Stop when velocity is very low

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', initVelocityScroll);

    function initVelocityScroll() {
        // Skip velocity scrolling if user prefers reduced motion
        if (prefersReducedMotion) {
            console.log('Velocity scroll: User prefers reduced motion, using default scroll behavior');
            return;
        }

        const sliders = document.querySelectorAll('.projects-slider');
        console.log(`Velocity scroll: Found ${sliders.length} sliders`);

        sliders.forEach(slider => {
            let touchStartX = 0;
            let touchStartTime = 0;
            let lastTouchX = 0;
            let lastTouchTime = 0;
            let velocity = 0;
            let isScrolling = false;
            let momentumRAF = null;

            // Touch start
            slider.addEventListener('touchstart', (e) => {
                // Cancel any ongoing momentum
                if (momentumRAF) {
                    cancelAnimationFrame(momentumRAF);
                    momentumRAF = null;
                }

                touchStartX = e.touches[0].clientX;
                lastTouchX = touchStartX;
                touchStartTime = Date.now();
                lastTouchTime = touchStartTime;
                velocity = 0;
                isScrolling = false;
            }, { passive: true });

            // Touch move - calculate velocity
            slider.addEventListener('touchmove', (e) => {
                const currentX = e.touches[0].clientX;
                const currentTime = Date.now();
                const timeDelta = currentTime - lastTouchTime;

                if (timeDelta > 0) {
                    const distance = currentX - lastTouchX;
                    velocity = distance / timeDelta; // pixels per millisecond
                }

                lastTouchX = currentX;
                lastTouchTime = currentTime;
                isScrolling = true;
            }, { passive: true });

            // Touch end - apply physics (ALWAYS snap)
            slider.addEventListener('touchend', (e) => {
                const avgVelocity = Math.abs(velocity);

                // If user just tapped or very minimal movement
                if (!isScrolling || avgVelocity < 0.01) {
                    console.log('Minimal movement, snapping to nearest card');
                    applyGentleSnap(slider);
                    return;
                }

                console.log(`Swipe velocity: ${avgVelocity.toFixed(3)} px/ms`);

                if (avgVelocity < VELOCITY_THRESHOLD) {
                    // GENTLE SWIPE - Soft, steady snap
                    applyGentleSnap(slider);
                } else {
                    // VIGOROUS SWIPE - Wheel of Fortune momentum (ends with snap)
                    applyMomentumScroll(slider, velocity);
                }
            }, { passive: true });

            // Also snap after mouse/touch scroll stops (for non-swipe scrolling)
            let scrollTimeout;
            slider.addEventListener('scroll', () => {
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    // Snap to nearest card after scrolling stops
                    const scrollLeft = slider.scrollLeft;
                    const cardWidth = getCardWidth(slider);
                    const currentIndex = Math.round(scrollLeft / cardWidth);
                    const targetScroll = currentIndex * cardWidth;
                    
                    // Only snap if not already perfectly aligned
                    if (Math.abs(scrollLeft - targetScroll) > 1) {
                        console.log('Scroll stopped, snapping to nearest card');
                        applyGentleSnap(slider);
                    }
                }, 150); // Snap 150ms after scroll stops
            }, { passive: true });

            // Apply rubber band snap to nearest card
            function applyGentleSnap(slider) {
                console.log('Applying rubber band snap...');
                
                const scrollLeft = slider.scrollLeft;
                const cardWidth = getCardWidth(slider);
                const currentIndex = Math.round(scrollLeft / cardWidth);
                const targetScroll = currentIndex * cardWidth;

                smoothScrollTo(slider, targetScroll, RUBBER_BAND_DURATION);
            }

            // Apply momentum scroll with gradual deceleration
            function applyMomentumScroll(slider, initialVelocity) {
                console.log('Applying momentum scroll (Wheel of Fortune style)...');
                
                let currentVelocity = initialVelocity * 1000; // Convert to px/s
                let lastTime = Date.now();

                const animate = () => {
                    const currentTime = Date.now();
                    const deltaTime = (currentTime - lastTime) / 1000; // seconds
                    lastTime = currentTime;

                    // Apply friction (deceleration)
                    currentVelocity *= MOMENTUM_FRICTION;

                    // Calculate scroll distance for this frame
                    const scrollDelta = currentVelocity * deltaTime;

                    // Apply scroll
                    slider.scrollLeft -= scrollDelta;

                    // Check bounds and snap if hit
                    const maxScroll = slider.scrollWidth - slider.clientWidth;
                    if (slider.scrollLeft <= 0) {
                        slider.scrollLeft = 0;
                        console.log('Hit left boundary, snapping');
                        applyGentleSnap(slider);
                        return;
                    } else if (slider.scrollLeft >= maxScroll) {
                        slider.scrollLeft = maxScroll;
                        console.log('Hit right boundary, snapping');
                        applyGentleSnap(slider);
                        return;
                    }

                    // Continue if velocity is still significant
                    if (Math.abs(currentVelocity) > MIN_VELOCITY) {
                        momentumRAF = requestAnimationFrame(animate);
                    } else {
                        // ALWAYS snap when momentum stops
                        console.log('Momentum stopped, snapping to nearest card');
                        applyGentleSnap(slider);
                    }
                };

                momentumRAF = requestAnimationFrame(animate);
            }

            // Helper: Get card width
            function getCardWidth(slider) {
                const card = slider.querySelector('.project-card');
                if (!card) return 340; // Default fallback
                const cardWidth = card.offsetWidth;
                const gap = parseInt(getComputedStyle(slider.querySelector('.projects-track')).gap) || 0;
                return cardWidth + gap;
            }

            // Helper: Smooth scroll to target with rubber band (spring) easing
            function smoothScrollTo(element, target, duration) {
                const start = element.scrollLeft;
                const distance = target - start;
                const startTime = Date.now();

                // Rubber band / spring easing function
                const easeOutElastic = (t) => {
                    const c4 = (2 * Math.PI) / 3;
                    
                    if (t === 0) return 0;
                    if (t === 1) return 1;
                    
                    // Elastic spring effect - like a rubber band
                    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
                };

                // Alternative: Softer spring (less bouncy)
                const easeOutBack = (t) => {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;
                    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
                };

                const animate = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Use softer spring for more natural rubber band feel
                    const easedProgress = easeOutBack(progress);

                    element.scrollLeft = start + (distance * easedProgress);

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                };

                requestAnimationFrame(animate);
            }
        });
    }
})();

