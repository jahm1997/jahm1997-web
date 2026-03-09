const componentTargets = [...document.querySelectorAll('[data-component]')];

// Carga modular de secciones HTML para mantener una arquitectura desacoplada.
async function loadComponent(target) {
    const name = target.getAttribute('data-component');
    const response = await fetch(`components/${name}.html`);
    if (!response.ok) {
        throw new Error(`No se pudo cargar el componente: ${name}`);
    }
    target.innerHTML = await response.text();
}

async function mountComponents() {
    await Promise.all(componentTargets.map(loadComponent));
}

function initNavbar() {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initCounters() {
    const nodes = [...document.querySelectorAll('[data-counter]')];
    if (!nodes.length) return;

    // Se activa sólo cuando la métrica entra al viewport para reducir trabajo inicial.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = Number(el.getAttribute('data-counter'));
            const decimal = target % 1 !== 0;
            const duration = 1100;
            const start = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const value = target * progress;
                el.textContent = decimal ? value.toFixed(2) : String(Math.floor(value));
                if (progress < 1) requestAnimationFrame(tick);
            };

            requestAnimationFrame(tick);
            observer.unobserve(el);
        });
    }, { threshold: 0.35 });

    nodes.forEach((node) => observer.observe(node));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const body = `Hola, soy ${name} (${email}).%0D%0A%0D%0A${encodeURIComponent(message)}`;
        const subject = encodeURIComponent('Consulta técnica desde landing JAHM Tech');
        window.location.href = `mailto:jahm1997@gmail.com?subject=${subject}&body=${body}`;
        feedback.textContent = 'Abriendo tu cliente de correo para enviar la consulta.';
    });
}

function setCurrentYear() {
    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
}

function initSmoothAnchorOffset() {
    const navbar = document.querySelector('.navbar');
    const navHeight = navbar ? navbar.getBoundingClientRect().height : 68;

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            event.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

mountComponents()
    .then(() => {
        setCurrentYear();
        initNavbar();
        initCounters();
        initContactForm();
        initSmoothAnchorOffset();
        document.dispatchEvent(new CustomEvent('components:ready'));
    })
    .catch((error) => {
        console.error(error);
    });
