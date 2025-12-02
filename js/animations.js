// Animaciones avanzadas y efectos visuales

// Sistema de animaciones por scroll
class ScrollAnimator {
    constructor() {
        this.elements = [];
        this.isScrolling = false;
        this.init();
    }
    
    init() {
        this.observeElements();
        this.setupScrollEffects();
        this.setupParallaxEffects();
    }
    
    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, observerOptions);
        
        // Observar elementos con clases de animación
        const elementsToObserve = [
            '.service-card',
            '.portfolio-item',
            '.about-content',
            '.contact-content',
            '.skill-item',
            '.section-header'
        ];
        
        elementsToObserve.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-in');
                observer.observe(el);
            });
        });
    }
    
    animateElement(element) {
        // Remover clases previas
        element.classList.remove('animate-in');
        
        // Aplicar animación según el tipo de elemento
        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        } else if (element.classList.contains('portfolio-item')) {
            this.animatePortfolioItem(element);
        } else if (element.classList.contains('skill-item')) {
            this.animateSkillItem(element);
        } else {
            this.animateGeneric(element);
        }
    }
    
    animateServiceCard(card) {
        const delay = Array.from(card.parentNode.children).indexOf(card) * 100;
        
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.9)';
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            });
        }, delay);
    }
    
    animatePortfolioItem(item) {
        const delay = Array.from(item.parentNode.children).indexOf(item) * 150;
        
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'rotateY(90deg)';
            item.style.transition = 'all 0.8s ease';
            
            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'rotateY(0deg)';
            });
        }, delay);
    }
    
    animateSkillItem(item) {
        const progressBar = item.querySelector('.skill-progress');
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px)';
            item.style.transition = 'all 0.5s ease';
            
            requestAnimationFrame(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                
                // Animar la barra de progreso
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            });
        }
    }
    
    animateGeneric(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Efecto de opacidad para el navbar
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                const opacity = Math.min(scrolled / 100, 0.95);
                navbar.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            }
            
            // Efecto de parallax para el hero
            const hero = document.querySelector('.hero');
            if (hero && scrolled < windowHeight) {
                const heroContent = hero.querySelector('.hero-container');
                if (heroContent) {
                    const speed = 0.5;
                    const yPos = scrolled * speed;
                    heroContent.style.transform = `translateY(${yPos}px)`;
                }
            }
            
            // Efecto de aparición para elementos
            document.querySelectorAll('.fade-in-scroll').forEach(element => {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                const isVisible = (scrolled + windowHeight) > elementTop && scrolled < (elementTop + elementHeight);
                
                if (isVisible) {
                    const visibilityRatio = Math.min(Math.max((scrolled + windowHeight - elementTop) / (windowHeight + elementHeight), 0), 1);
                    element.style.opacity = visibilityRatio;
                    element.style.transform = `translateY(${(1 - visibilityRatio) * 30}px)`;
                }
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
}

// Efectos de mouse interactivos
class MouseEffects {
    constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        this.setupMouseTracking();
        this.setup3DEffects();
        this.setupMagneticButtons();
    }
    
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.update3DEffects();
        });
    }
    
    setup3DEffects() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item, .floating-card');
        
        elements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'transform 0.1s ease';
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    update3DEffects() {
        const elements = document.querySelectorAll('.service-card:hover, .portfolio-item:hover, .floating-card:hover');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const rotateX = (this.mouseY - centerY) / 20;
            const rotateY = (this.mouseX - centerX) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
    }
    
    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .social-link');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createMagneticEffect(button, e);
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    createMagneticEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (event.clientX - centerX) / 10;
        const deltaY = (event.clientY - centerY) / 10;
        
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    }
}

// Sistema de partículas
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
    }
    
    setupCanvas() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Actualizar posición
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Dibujar partícula
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(37, 99, 235, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        // Conectar partículas cercanas
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
        const maxDistance = 100;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// Efectos de texto animado
class TextAnimator {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupTypewriterEffect();
        this.setupTextGlow();
        this.setupTextReveal();
    }
    
    setupTypewriterEffect() {
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        
        typewriterElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            // Iniciar cuando el elemento sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typeWriter();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
    
    setupTextGlow() {
        const glowElements = document.querySelectorAll('[data-glow]');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.classList.add('neon-glow');
            });
            
            element.addEventListener('mouseleave', () => {
                element.classList.remove('neon-glow');
            });
        });
    }
    
    setupTextReveal() {
        const revealElements = document.querySelectorAll('[data-reveal]');
        
        revealElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.style.transition = 'all 0.8s ease';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    }
}

// Sistema de sonido (opcional)
class SoundSystem {
    constructor() {
        this.sounds = {};
        this.enabled = false;
        this.init();
    }
    
    init() {
        this.setupSoundToggle();
        this.createSounds();
    }
    
    setupSoundToggle() {
        // Crear botón de toggle de sonido
        const soundToggle = document.createElement('button');
        soundToggle.innerHTML = '🔊';
        soundToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
        `;
        
        soundToggle.addEventListener('click', () => {
            this.enabled = !this.enabled;
            soundToggle.innerHTML = this.enabled ? '🔊' : '🔇';
            soundToggle.style.background = this.enabled ? 'rgba(37, 99, 235, 0.8)' : 'rgba(0, 0, 0, 0.7)';
        });
        
        document.body.appendChild(soundToggle);
    }
    
    createSounds() {
        // Crear sonidos sintéticos usando Web Audio API
        if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }
    
    playSound(type) {
        if (!this.enabled || !this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        switch (type) {
            case 'hover':
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
                break;
            case 'click':
                oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
                break;
            default:
                oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
        }
        
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
}

// Inicializar todos los sistemas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Solo inicializar en pantallas grandes
    if (window.innerWidth > 768) {
        new ScrollAnimator();
        new MouseEffects();
        new ParticleSystem();
    }
    
    new TextAnimator();
    new SoundSystem();
    
    // Agregar efectos de sonido a elementos interactivos
    document.querySelectorAll('.btn, .nav-link, .service-card, .social-link').forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (window.soundSystem) {
                window.soundSystem.playSound('hover');
            }
        });
        
        element.addEventListener('click', () => {
            if (window.soundSystem) {
                window.soundSystem.playSound('click');
            }
        });
    });
    
    // Hacer disponible globalmente
    window.soundSystem = new SoundSystem();
});