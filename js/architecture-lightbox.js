/**
 * Architecture project gallery lightbox — touch, keyboard, click navigation.
 */
(function () {
    'use strict';

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const galleryImages = document.querySelectorAll('.image-large');
    const heroImage = document.querySelector('.hero-image');

    const allImages = [];
    if (heroImage) allImages.push(heroImage);
    galleryImages.forEach((img) => allImages.push(img));

    // ponytail: fail loud if gallery markup is missing
    if (allImages.length === 0) {
        console.warn('architecture-lightbox: no .hero-image or .image-large elements found');
        return;
    }

    let currentIndex = 0;
    let lastFocus = null;
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.setAttribute('aria-hidden', 'true');

    function updateLightbox(index) {
        currentIndex = index;
        const img = allImages[currentIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${allImages.length}`;
    }

    function openLightbox(index) {
        lastFocus = document.activeElement;
        updateLightbox(index);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxPrev.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }

    function nextImage(e) {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex + 1) % allImages.length;
        updateLightbox(currentIndex);
    }

    function prevImage(e) {
        if (e) e.stopPropagation();
        currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
        updateLightbox(currentIndex);
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
        }
    }

    allImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(index);
        });
    });

    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevImage();
        }
    });

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
})();
