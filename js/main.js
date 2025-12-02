// Navegación responsive y funcionalidades principales
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajustar por la altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Crear mensaje para WhatsApp
            const whatsappMessage = `Hola, soy ${name}. ${message}`;
            const whatsappUrl = `https://wa.me/573013316136?text=${encodeURIComponent(whatsappMessage)}`;
            
            // También enviar por email
            const mailtoLink = `mailto:jahm1997@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hola, soy ${name} (${email}). ${message}`)}`;
            
            // Mostrar opciones al usuario
            showContactOptions(whatsappUrl, mailtoLink);
            
            // Limpiar formulario
            this.reset();
        });
    }
    
    // Función para mostrar opciones de contacto
    function showContactOptions(whatsappUrl, mailtoLink) {
        // Crear modal o alerta personalizada
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                margin: 20px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            ">
                <h3 style="margin-bottom: 1rem; color: #333;">¡Gracias por tu mensaje!</h3>
                <p style="margin-bottom: 1.5rem; color: #666;">Elige cómo prefieres contactarme:</p>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <a href="${whatsappUrl}" target="_blank" style="
                        background: #25d366;
                        color: white;
                        padding: 1rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    ">
                        <i class="fab fa-whatsapp"></i>
                        Contactar por WhatsApp
                    </a>
                    <a href="${mailtoLink}" style="
                        background: #ea4335;
                        color: white;
                        padding: 1rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    ">
                        <i class="fas fa-envelope"></i>
                        Enviar por Email
                    </a>
                    <button onclick="this.closest('.modal').remove()" style="
                        background: #6b7280;
                        color: white;
                        padding: 0.8rem;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-weight: bold;
                    ">
                        Cerrar
                    </button>
                </div>
            </div>
        `;
        
        modal.classList.add('modal');
        document.body.appendChild(modal);
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
    
    // Botones de contacto directo
    document.querySelectorAll('.social-link.whatsapp').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const message = prompt('¿Qué deseas consultar?');
            if (message) {
                const whatsappUrl = `https://wa.me/573013316136?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    });
    
    // Función para crear partículas flotantes
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        document.body.appendChild(particlesContainer);
        
        // Crear partículas
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 20}s;
                animation-duration: ${15 + Math.random() * 10}s;
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    // Crear partículas solo en pantallas grandes
    if (window.innerWidth > 768) {
        createParticles();
    }
    
    // Efecto de lluvia de código en el hero
    function createCodeRain() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        
        const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        
        for (let i = 0; i < 50; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            drop.textContent = characters[Math.floor(Math.random() * characters.length)];
            drop.style.cssText = `
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 3}s;
                animation-duration: ${2 + Math.random() * 2}s;
            `;
            rainContainer.appendChild(drop);
        }
        
        hero.appendChild(rainContainer);
    }
    
    createCodeRain();
    
    // Efecto de onda al hacer clic en botones
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Animación de números contadores
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }
    
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animar barras de habilidades
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width;
                }
                
                // Animar contadores
                if (entry.target.classList.contains('counter')) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.animate-in, .animate-scale, .animate-rotate, .skill-progress, .counter').forEach(el => {
        observer.observe(el);
    });
    
    // Efecto de parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Prevenir envío de formulario con Enter en campos individuales
    document.querySelectorAll('.form-group input').forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = this.closest('.form-group').nextElementSibling?.querySelector('input, textarea');
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.querySelector('.btn-primary[type="submit"]').click();
                }
            }
        });
    });
    
    // Validación en tiempo real del formulario
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let errorMessage = '';
        
        // Remover mensaje de error previo
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('error');
        
        // Validaciones
        if (value === '') {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        } else if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
        } else if (field.name === 'name' && value.length < 2) {
            isValid = false;
            errorMessage = 'El nombre debe tener al menos 2 caracteres';
        }
        
        if (!isValid) {
            field.classList.add('error');
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = errorMessage;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                font-weight: 500;
            `;
            field.parentNode.appendChild(errorElement);
        }
        
        return isValid;
    }
    
    // Validar todo el formulario antes de enviar
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // Actualizar partículas cuando cambie el tamaño de la ventana
    window.addEventListener('resize', function() {
        const particlesContainer = document.querySelector('.particles');
        if (particlesContainer) {
            if (window.innerWidth <= 768) {
                particlesContainer.remove();
            }
        } else if (window.innerWidth > 768) {
            createParticles();
        }
    });
    
    // Lazy loading para imágenes (si se agregan)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Detectar idioma del navegador y ajustar mensajes
    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.startsWith('es')) {
        // Ya está en español
    } else {
        // Podrías agregar traducciones aquí si lo deseas
    }
    
    // Consola de bienvenida
    console.log('%c¡Bienvenido a mi portafolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
    console.log('%c¿Necesitas ayuda con tu proyecto? ¡Contáctame!', 'color: #6b7280; font-size: 14px;');
    console.log('%cWhatsApp: +57 301 331 6136 | Email: jahm1997@gmail.com', 'color: #059669; font-size: 14px;');
});