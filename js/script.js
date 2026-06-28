// ===================================
// Sketch & Script Portfolio - JavaScript
// ===================================

// ==================
// Navigation
// ==================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');

            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================
// Contact Form
// ==================

const contactForm = document.getElementById('contact-form');

function showFormStatus(message, isError) {
    let status = document.getElementById('contact-form-status');
    if (!status && contactForm) {
        status = document.createElement('div');
        status.id = 'contact-form-status';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        contactForm.appendChild(status);
    }
    if (status) {
        status.textContent = message;
        status.className = isError ? 'form-status form-status-error' : 'form-status form-status-success';
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        try {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            showFormStatus('', false);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showFormStatus('Thank you for your message! I\'ll get back to you soon.', false);
                this.reset();
            } else {
                showFormStatus('Failed to send message. Please try again or email: michalwicherek@gmail.com', true);
            }
        } catch (error) {
            console.error('Error:', error);
            showFormStatus('An error occurred. Please email directly: michalwicherek@gmail.com', true);
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ==================
// Intersection Observer (skill categories only; cards handled by page-transitions.js)
// ==================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(category);
});

// ==================
// Scroll Indicator Fade
// ==================

function initScrollIndicatorFade() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.8';
            scrollIndicator.style.pointerEvents = 'auto';
        }

        clearTimeout(scrollTimeout);

        scrollTimeout = setTimeout(() => {
            if (window.scrollY <= 50) {
                scrollIndicator.style.opacity = '0.8';
            }
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollIndicatorFade();
});
