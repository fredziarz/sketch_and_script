(function () {
    'use strict';

    function loopSlot(index, count) {
        if (index <= 0) return count;
        if (index > count) return 1;
        return index;
    }

    const header = document.getElementById('header');
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const backdrop = document.getElementById('menu-backdrop');
    const main = document.getElementById('main');
    const footer = document.querySelector('.footer');

    const compact = window.matchMedia('(max-width: 1100px)');
    const setOpen = open => {
        const on = open && compact.matches;
        toggle.setAttribute('aria-expanded', String(on));
        toggle.setAttribute('aria-label', on ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
        menu.classList.toggle('open', on);
        document.body.classList.toggle('menu-open', on);
        backdrop.hidden = !on;
        main.inert = on;
        footer.inert = on;
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    compact.addEventListener('change', () => { if (!compact.matches) setOpen(false); });
    backdrop.addEventListener('click', () => setOpen(false));
    header.addEventListener('pointerdown', (e) => {
        if (toggle.getAttribute('aria-expanded') !== 'true') return;
        if (e.target.closest('#menu') || e.target.closest('#menu-toggle')) return;
        setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setOpen(false);
    });
    menu.addEventListener('click', (e) => {
        if (e.target.closest('a')) setOpen(false);
    });

    const track = document.querySelector('.cards');
    const cardPrev = document.querySelector('.cards-edge.prev');
    const cardNext = document.querySelector('.cards-edge.next');
    if (track && track.children.length > 1) {
        const originals = [...track.children];
        const count = originals.length;
        const titles = originals.map(card => card.querySelector('h3').textContent);
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        let clones = [];
        let slot = 1;
        const step = () => track.clientWidth;
        const labelCards = () => {
            const on = compact.matches && clones.length > 0;
            if (cardPrev) cardPrev.hidden = !on;
            if (cardNext) cardNext.hidden = !on;
            if (!on) return;
            cardPrev.textContent = titles[(slot - 2 + count) % count];
            cardNext.textContent = titles[slot % count];
        };
        const go = dir => {
            const left = track.scrollLeft + dir * step();
            if (reduce.matches) track.scrollLeft = left;
            else track.scrollTo({ left, behavior: 'smooth' });
        };
        const arm = () => {
            if (!compact.matches || clones.length) return;
            const last = originals[count - 1].cloneNode(true);
            const first = originals[0].cloneNode(true);
            for (const node of [last, first]) {
                node.setAttribute('aria-hidden', 'true');
                node.inert = true;
            }
            track.prepend(last);
            track.append(first);
            clones = [last, first];
            slot = 1;
            track.scrollLeft = step();
            labelCards();
        };
        const disarm = () => {
            for (const node of clones) node.remove();
            clones = [];
            track.scrollLeft = 0;
            labelCards();
        };
        // Jedna kopia na końcach. Szybkie machnięcie przez wiele projektów może raz szarpnąć na szwie.
        const place = () => {
            if (!clones.length) return;
            const w = step();
            if (w < 1) return;
            const index = Math.round(track.scrollLeft / w);
            slot = loopSlot(index, count);
            if (slot !== index) track.scrollLeft = slot * w;
            labelCards();
        };
        if (cardPrev) cardPrev.addEventListener('click', () => go(-1));
        if (cardNext) cardNext.addEventListener('click', () => go(1));
        track.addEventListener('scrollend', place);
        window.addEventListener('resize', () => { if (clones.length) track.scrollLeft = slot * step(); });
        const syncCards = () => (compact.matches ? arm() : disarm());
        compact.addEventListener('change', syncCards);
        syncCards();
    }

    const packages = document.querySelector('.scope-scroll');
    const edgePrev = document.querySelector('.scope-edge.prev');
    const edgeNext = document.querySelector('.scope-edge.next');
    if (packages && edgePrev && edgeNext && packages.children.length > 2) {
        const items = [...packages.children];
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        const overflowing = () => packages.scrollWidth > packages.clientWidth + 1;
        let parked = true;
        const index = () => {
            const box = packages.getBoundingClientRect();
            const mid = box.left + box.width / 2;
            let best = 0;
            let dist = Infinity;
            items.forEach((item, i) => {
                const r = item.getBoundingClientRect();
                const d = Math.abs(r.left + r.width / 2 - mid);
                if (d < dist) { dist = d; best = i; }
            });
            return best;
        };
        const center = (item, smooth) => {
            if (!item || !overflowing()) return;
            const box = packages.getBoundingClientRect();
            const r = item.getBoundingClientRect();
            const delta = r.left - box.left - (box.width - r.width) / 2;
            if (Math.abs(delta) <= 1) return;
            const left = packages.scrollLeft + delta;
            if (smooth) packages.scrollTo({ left, behavior: 'smooth' });
            else packages.scrollLeft = left;
        };
        const label = (button, item) => {
            button.hidden = !item;
            if (item) button.textContent = item.querySelector('h3').textContent;
        };
        const edges = () => {
            const i = overflowing() ? index() : -1;
            label(edgePrev, i < 0 ? null : items[i - 1]);
            label(edgeNext, i < 0 ? null : items[i + 1]);
        };
        const settle = () => {
            center(items[parked ? 1 : index()], false);
            edges();
        };
        edgePrev.addEventListener('click', () => { parked = false; center(items[index() - 1], !reduce.matches); });
        edgeNext.addEventListener('click', () => { parked = false; center(items[index() + 1], !reduce.matches); });
        packages.addEventListener('pointerdown', () => { if (overflowing()) parked = false; });
        packages.addEventListener('scrollend', () => {
            if (parked) center(items[1], false);
            edges();
        });
        settle();
        document.fonts.ready.then(settle);
        let was = overflowing();
        window.addEventListener('resize', () => {
            const now = overflowing();
            if (now && !was) parked = true;
            was = now;
            settle();
        });
    }

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
