(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.projects-slider-wrapper').forEach(wrapper => {
            const slider = wrapper.querySelector('.projects-slider');
            const track = wrapper.querySelector('.projects-track');
            const prevBtn = wrapper.querySelector('.slider-nav-prev');
            const nextBtn = wrapper.querySelector('.slider-nav-next');

            if (!slider || !track || !prevBtn || !nextBtn) return;

            const getCardWidth = () => {
                const card = track.querySelector('.project-card');
                if (!card) return 340;
                return card.offsetWidth + (parseInt(getComputedStyle(track).gap) || 32);
            };

            const isMobile = () => window.innerWidth <= 768;

            const updateButtons = () => {
                const visible = !isMobile();
                prevBtn.style.opacity = visible ? '1' : '0';
                nextBtn.style.opacity = visible ? '1' : '0';
            };

            prevBtn.addEventListener('click', () => {
                slider.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', () => {
                slider.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
            });

            slider.addEventListener('keydown', e => {
                if (e.key === 'ArrowLeft') { e.preventDefault(); prevBtn.click(); }
                else if (e.key === 'ArrowRight') { e.preventDefault(); nextBtn.click(); }
            });

            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    setTimeout(() => { slider.scrollLeft = 0; }, 50);
                });
            });

            updateButtons();
            window.addEventListener('resize', updateButtons);
        });
    });
})();