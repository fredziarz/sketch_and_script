/**
 * DOM hide/show filters for static project cards (coding.html).
 * Architecture page uses load-projects.js (re-render from JSON).
 */
(function () {
    'use strict';

    function initDomProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        if (filterButtons.length === 0 || projectCards.length === 0) return;

        filterButtons.forEach(btn => {
            btn.setAttribute('aria-pressed', btn.classList.contains('active') ? 'true' : 'false');
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                projectCards.forEach(card => {
                    const category = card.dataset.category;
                    const show = filter === 'all' || category === filter;
                    card.style.display = show ? 'block' : 'none';
                    if (show) {
                        card.style.opacity = '';
                        card.style.transition = '';
                    }
                });
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDomProjectFilters);
    } else {
        initDomProjectFilters();
    }
})();
