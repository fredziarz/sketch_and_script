(function () {
    'use strict';

    const header = document.getElementById('header');
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    toggle.addEventListener('click', () => {
        const open = toggle.getAttribute('aria-expanded') !== 'true';
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('open', open);
    });
    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.classList.remove('open');
        }
    });

    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const slides = [...document.querySelectorAll('.slide')];
    const pause = document.querySelector('.slides-pause');
    if (slides.length > 1) {
        let current = 0;
        let timer = null;
        const show = (n) => {
            slides[current].classList.remove('on');
            current = n % slides.length;
            slides[current].classList.add('on');
        };
        const play = () => { timer = setInterval(() => show(current + 1), 6000); };
        const stop = () => { clearInterval(timer); timer = null; };
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) play();
        pause.setAttribute('aria-pressed', String(!timer));
        pause.addEventListener('click', () => {
            timer ? stop() : play();
            pause.setAttribute('aria-pressed', String(!timer));
            pause.textContent = timer ? '❚❚' : '▶';
        });
        pause.textContent = timer ? '❚❚' : '▶';
    } else if (pause) {
        pause.hidden = true;
    }

    const form = document.getElementById('contact-form');
    if (form) {
        const status = form.querySelector('.form-status');
        const button = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const label = button.textContent;
            button.disabled = true;
            button.textContent = form.dataset.sending;
            status.textContent = '';
            status.classList.remove('error');
            try {
                const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
                const json = await res.json();
                if (!json.success) throw new Error(json.message);
                status.textContent = form.dataset.success;
                form.reset();
            } catch (err) {
                console.error(err);
                status.textContent = form.dataset.error;
                status.classList.add('error');
            } finally {
                button.disabled = false;
                button.textContent = label;
            }
        });
    }
})();
