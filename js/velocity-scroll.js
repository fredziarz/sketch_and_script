(function() {
    'use strict';

    const VELOCITY_THRESHOLD = 0.5; // Below this = gentle, above = vigorous
    const GENTLE_SCROLL_DURATION = 400; // ms for gentle snap
    const MOMENTUM_FRICTION = 0.95; // Friction for "Wheel of Fortune" effect
    const MIN_VELOCITY = 0.1; // Stop when velocity is very low

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', initVelocityScroll);

    function initVelocityScroll() {
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

            // Touch end - apply physics
            slider.addEventListener('touchend', (e) => {
                if (!isScrolling) return;

                const totalTime = Date.now() - touchStartTime;
                const totalDistance = lastTouchX - touchStartX;
                const avgVelocity = Math.abs(velocity);

                console.log(`Swipe velocity: ${avgVelocity.toFixed(3)} px/ms`);

                if (avgVelocity < VELOCITY_THRESHOLD) {
                    // GENTLE SWIPE - Soft, steady snap
                    applyGentleSnap(slider);
                } else {
                    // VIGOROUS SWIPE - Wheel of Fortune momentum
                    applyMomentumScroll(slider, velocity);
                }
            }, { passive: true });

            // Apply gentle snap to nearest card
            function applyGentleSnap(slider) {
                console.log('Applying gentle snap...');
                
                const scrollLeft = slider.scrollLeft;
                const cardWidth = getCardWidth(slider);
                const currentIndex = Math.round(scrollLeft / cardWidth);
                const targetScroll = currentIndex * cardWidth;

                smoothScrollTo(slider, targetScroll, GENTLE_SCROLL_DURATION);
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

                    // Check bounds
                    const maxScroll = slider.scrollWidth - slider.clientWidth;
                    if (slider.scrollLeft <= 0) {
                        slider.scrollLeft = 0;
                        currentVelocity = 0;
                    } else if (slider.scrollLeft >= maxScroll) {
                        slider.scrollLeft = maxScroll;
                        currentVelocity = 0;
                    }

                    // Continue if velocity is still significant
                    if (Math.abs(currentVelocity) > MIN_VELOCITY) {
                        momentumRAF = requestAnimationFrame(animate);
                    } else {
                        // Final gentle snap when momentum stops
                        console.log('Momentum stopped, final snap');
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

            // Helper: Smooth scroll to target
            function smoothScrollTo(element, target, duration) {
                const start = element.scrollLeft;
                const distance = target - start;
                const startTime = Date.now();

                const easeOutCubic = (t) => {
                    return 1 - Math.pow(1 - t, 3);
                };

                const animate = () => {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutCubic(progress);

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

