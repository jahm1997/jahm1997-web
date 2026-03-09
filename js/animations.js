function initRevealAnimations() {
    const revealItems = [...document.querySelectorAll('.reveal')];
    if (!revealItems.length) return;

    // Microinteracciones por scroll con observador nativo para mantener performance.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -30px 0px' });

    revealItems.forEach((item) => observer.observe(item));
}

function initStoryProgress() {
    const sections = [...document.querySelectorAll('main .section')];
    if (!sections.length) return;

    const onScroll = () => {
        const middle = window.scrollY + window.innerHeight * 0.45;
        sections.forEach((section) => {
            const active = middle >= section.offsetTop && middle <= section.offsetTop + section.offsetHeight;
            section.classList.toggle('section--active', active);
        });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

document.addEventListener('components:ready', () => {
    initRevealAnimations();
    initStoryProgress();
});
