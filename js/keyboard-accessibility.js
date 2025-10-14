// ===================================
//   Keyboard Accessibility Enhancement
//   Sketch & Script Portfolio
// ===================================

(function() {
    'use strict';

    // ===================================
    // Keyboard Navigation for Filter Buttons
    // ===================================
    
    function enhanceFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        if (filterButtons.length === 0) return;

        filterButtons.forEach((button, index) => {
            // Add ARIA attributes
            button.setAttribute('role', 'button');
            button.setAttribute('tabindex', '0');
            
            // Add keyboard support
            button.addEventListener('keydown', function(e) {
                // Enter or Space to activate
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
                
                // Arrow key navigation
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextButton = filterButtons[(index + 1) % filterButtons.length];
                    nextButton.focus();
                }
                
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevIndex = index - 1 < 0 ? filterButtons.length - 1 : index - 1;
                    filterButtons[prevIndex].focus();
                }
                
                // Home/End keys
                if (e.key === 'Home') {
                    e.preventDefault();
                    filterButtons[0].focus();
                }
                
                if (e.key === 'End') {
                    e.preventDefault();
                    filterButtons[filterButtons.length - 1].focus();
                }
            });
        });
    }

    // ===================================
    // Enhanced Focus Management for Cards
    // ===================================
    
    function enhanceCardFocus() {
        const cards = document.querySelectorAll('.project-card, .game-card');
        
        cards.forEach(card => {
            const link = card.querySelector('a');
            if (link) {
                // Make card focusable
                card.setAttribute('tabindex', '-1');
                
                // When card receives focus, focus the link inside
                card.addEventListener('focus', function() {
                    link.focus();
                });
            }
        });
    }

    // ===================================
    // Mobile Menu Keyboard Enhancement
    // ===================================
    
    function enhanceMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (!navToggle || !navMenu) return;

        navToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navToggle.click();
                
                // Focus first nav link when menu opens
                if (navMenu.classList.contains('active')) {
                    const firstLink = navMenu.querySelector('.nav-link');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            }
        });

        // Trap focus inside menu when open on mobile
        navMenu.addEventListener('keydown', function(e) {
            if (!navMenu.classList.contains('active')) return;
            
            const focusableElements = navMenu.querySelectorAll('.nav-link');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            // Escape to close
            if (e.key === 'Escape') {
                navToggle.click();
                navToggle.focus();
            }
            
            // Tab trap
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    // ===================================
    // Visual Focus Indicator Enhancement
    // ===================================
    
    function enhanceFocusIndicators() {
        // Add focus-visible polyfill behavior
        document.addEventListener('mousedown', function() {
            document.body.classList.add('using-mouse');
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                document.body.classList.remove('using-mouse');
            }
        });
    }

    // ===================================
    // Keyboard Shortcuts (Optional)
    // ===================================
    
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Don't activate if user is typing in input/textarea
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                return;
            }
            
            // Alt + H for Home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
            
            // Alt + A for Architecture
            if (e.altKey && e.key === 'a') {
                e.preventDefault();
                window.location.href = 'architecture.html';
            }
            
            // Alt + C for Coding
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                window.location.href = 'coding.html';
            }
            
            // / to focus search/filter (if exists)
            if (e.key === '/') {
                e.preventDefault();
                const firstFilter = document.querySelector('.filter-btn');
                if (firstFilter) {
                    firstFilter.focus();
                }
            }
        });
    }

    // ===================================
    // ARIA Live Region for Filter Updates
    // ===================================
    
    function addAriaLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.setAttribute('class', 'sr-only'); // Screen reader only
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        
        document.body.appendChild(liveRegion);
        
        // Update live region when filters change
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = button.dataset.filter;
                const visibleCards = document.querySelectorAll('.project-card:not([style*="display: none"]), .game-card:not([style*="display: none"])');
                const count = visibleCards.length;
                const message = category === 'all' 
                    ? `Showing all ${count} projects`
                    : `Filtered to ${count} ${category} projects`;
                
                liveRegion.textContent = message;
            });
        });
    }

    // ===================================
    // Initialize All Enhancements
    // ===================================
    
    function init() {
        enhanceFilterButtons();
        enhanceCardFocus();
        enhanceMobileMenu();
        enhanceFocusIndicators();
        addKeyboardShortcuts();
        addAriaLiveRegion();
        
        console.log('Keyboard accessibility enhanced');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

