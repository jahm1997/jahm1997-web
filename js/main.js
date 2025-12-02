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
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');

    const i18n = {
        es: {
            'nav.home': 'Inicio',
            'nav.about': 'Sobre Mí',
            'nav.services': 'Servicios',
            'nav.portfolio': 'Portafolio',
            'nav.contact': 'Contacto',
            'hero.title1': 'Liderando Proyectos',
            'hero.title2': 'IIoT & Full Stack',
            'hero.desc': 'Desarrollador Full Stack Senior especializado en Internet de las Cosas (IIoT), telecomunicaciones y sector industrial. Reduzco tiempos de entrega en 25% y optimizo flujos de trabajo en 60% con soluciones escalables.',
            'hero.viewServices': 'Ver Servicios',
            'hero.contact': 'Contactar',
            'sections.about': 'Sobre Mí',
            'sections.services': 'Servicios',
            'sections.portfolio': 'Portafolio',
            'sections.contact': 'Contacto',
            'about.subtitle': 'Conoce al profesional detrás de las soluciones',
            'about.desc1': 'Desarrollador Full Stack Senior con más de 2 años liderando proyectos estratégicos en Internet de las Cosas (IIoT), telecomunicaciones y sector industrial. Implementé buenas prácticas que redujeron tiempos de entrega en 25%.',
            'about.desc2': 'Diseñé herramientas completas que optimizaron flujos de trabajo en 60%, además de contribuir al crecimiento del equipo mediante mentorías y programas de capacitación interna.',
            'skills.java': 'Java',
            'skills.python': 'Python',
            'skills.webframeworks': 'React / Vue / Angular',
            'skills.spring': 'Spring Boot',
            'skills.node': 'Node.js / JavaScript',
            'skills.aws': 'AWS / Cloud',
            'services.subtitle': 'Soluciones que impulsan tu negocio',
            'services.iiot.title': 'Desarrollo IIoT',
            'services.iiot.desc': 'Diseño e implementación de soluciones de Internet de las Cosas para el sector industrial, incluyendo sensores, gateways y plataformas de monitoreo en tiempo real.',
            'services.iiot.feature1': 'Arquitecturas robustas y escalables',
            'services.iiot.feature2': 'Integración de sensores y dispositivos',
            'services.iiot.feature3': 'Monitoreo y control remoto',
            'services.aws.title': 'Infraestructura Cloud AWS',
            'services.aws.desc': 'Gestión completa de servidores en la nube y on-premise, incluyendo balanceo de carga, backups automáticos y monitoreo continuo.',
            'services.aws.feature1': 'Configuración de servidores virtuales',
            'services.aws.feature2': 'Balanceo de carga y alta disponibilidad',
            'services.aws.feature3': 'Copias de seguridad automatizadas',
            'services.security.title': 'Redes y Seguridad',
            'services.security.desc': 'Administración de redes de datos con configuraciones Fortinet y FortiGate, garantizando disponibilidad, estabilidad y seguridad de los servicios.',
            'services.security.feature1': 'Configuración de firewalls Fortinet',
            'services.security.feature2': 'Seguridad de red empresarial',
            'services.security.feature3': 'Monitoreo 24/7 de infraestructura',
            'services.fullstack.title': 'Desarrollo Full Stack',
            'services.fullstack.desc': 'Desarrollo de aplicaciones web completas con tecnologías modernas, desde la arquitectura hasta el despliegue en producción.',
            'services.fullstack.feature1': 'React, Vue, Angular',
            'services.fullstack.feature2': 'Spring Boot, Node.js',
            'services.fullstack.feature3': 'SQL y NoSQL databases',
            'services.optimization.title': 'Optimización de Procesos',
            'services.optimization.desc': 'Reducción de tiempos de entrega en 25% y optimización de flujos de trabajo en 60% mediante mejores prácticas y automatización.',
            'services.optimization.feature1': 'Implementación de buenas prácticas',
            'services.optimization.feature2': 'Automatización de procesos',
            'services.optimization.feature3': 'Mejora continua y SCRUM',
            'services.leadership.title': 'Liderazgo Técnico',
            'services.leadership.desc': 'Coordinación de equipos técnicos multidisciplinarios, mentoría y capacitación para garantizar entregas de alto impacto y crecimiento del equipo.',
            'services.leadership.feature1': 'Gestión de equipos técnicos',
            'services.leadership.feature2': 'Mentoría y capacitación',
            'services.leadership.feature3': 'Promoción de cultura técnica',
            'portfolio.subtitle': 'Algunos de mis proyectos destacados',
            'portfolio.item1.title': 'Sistema IIoT Industrial',
            'portfolio.item1.desc': 'Plataforma completa de monitoreo industrial con sensores, gateways y dashboard en tiempo real para optimizar procesos productivos.',
            'portfolio.item2.title': 'Migración Cloud AWS',
            'portfolio.item2.desc': 'Rediseño completo de infraestructura on-premise a cloud con alta disponibilidad, balanceo de carga y reducción de costos operativos.',
            'portfolio.item3.title': 'Red Empresarial Segura',
            'portfolio.item3.desc': 'Implementación de red corporativa con firewalls Fortinet, VPN segura y monitoreo 24/7 para industria crítica.',
            'portfolio.item4.title': 'Dashboard Analytics',
            'portfolio.item4.desc': 'Sistema de visualización de datos en tiempo real con análisis predictivo para toma de decisiones empresariales.',
            'contact.subtitle': '¿Listo para transformar tu negocio? Hablemos',
            'contact.headingMain': 'Hablemos de tu Proyecto',
            'contact.results': 'Resultados Comprobados',
            'contact.desc': '¿Listo para optimizar tu empresa con soluciones IIoT y reducir tiempos de entrega en 25%? Transformemos juntos tu visión en una realidad tecnológica escalable.',
            'contact.direct': 'Contacto Directo',
            'contact.location': 'Cartagena, Colombia',
            'contact.form.name': 'Tu nombre',
            'contact.form.email': 'Tu email',
            'contact.form.subject': 'Asunto',
            'contact.form.message': 'Tu mensaje',
            'contact.send': 'Enviar Mensaje',
            'social.whatsapp': 'WhatsApp',
            'social.email': 'Email',
            'social.linkedin': 'LinkedIn',
            'footer.about': 'Desarrollador Full Stack Senior especializado en IIoT, telecomunicaciones y sector industrial. Reduzco tiempos de entrega en 25% y optimizo flujos de trabajo en 60%.',
            'footer.services.heading': 'Servicios',
            'footer.contact.heading': 'Contacto',
            'footer.copy': '© 2024 Joseph Herrera. Todos los derechos reservados.'
        },
        en: {
            'nav.home': 'Home',
            'nav.about': 'About',
            'nav.services': 'Services',
            'nav.portfolio': 'Portfolio',
            'nav.contact': 'Contact',
            'hero.title1': 'Leading Projects',
            'hero.title2': 'IIoT & Full Stack',
            'hero.desc': 'Senior Full Stack Developer specialized in IIoT, telecommunications and the industrial sector. I reduce delivery times by 25% and optimize workflows by 60% with scalable solutions.',
            'hero.viewServices': 'View Services',
            'hero.contact': 'Contact',
            'sections.about': 'About Me',
            'sections.services': 'Services',
            'sections.portfolio': 'Portfolio',
            'sections.contact': 'Contact',
            'about.subtitle': 'Meet the professional behind the solutions',
            'about.desc1': 'Senior Full Stack Developer with 2+ years leading strategic projects in the Internet of Things (IIoT), telecommunications and the industrial sector. I implemented best practices that reduced delivery times by 25%.',
            'about.desc2': 'I designed complete tools that optimized workflows by 60%, and contributed to team growth through mentoring and internal training programs.',
            'skills.java': 'Java',
            'skills.python': 'Python',
            'skills.webframeworks': 'React / Vue / Angular',
            'skills.spring': 'Spring Boot',
            'skills.node': 'Node.js / JavaScript',
            'skills.aws': 'AWS / Cloud',
            'services.subtitle': 'Solutions that drive your business',
            'services.iiot.title': 'IIoT Development',
            'services.iiot.desc': 'Design and implementation of Internet of Things solutions for the industrial sector, including sensors, gateways and real-time monitoring platforms.',
            'services.iiot.feature1': 'Robust and scalable architectures',
            'services.iiot.feature2': 'Sensor and device integration',
            'services.iiot.feature3': 'Remote monitoring and control',
            'services.aws.title': 'AWS Cloud Infrastructure',
            'services.aws.desc': 'Full management of cloud and on-premise servers, including load balancing, automated backups and continuous monitoring.',
            'services.aws.feature1': 'Virtual server configuration',
            'services.aws.feature2': 'Load balancing and high availability',
            'services.aws.feature3': 'Automated backups',
            'services.security.title': 'Networks & Security',
            'services.security.desc': 'Administration of data networks with Fortinet and FortiGate configurations, ensuring service availability, stability and security.',
            'services.security.feature1': 'Fortinet firewall configuration',
            'services.security.feature2': 'Enterprise network security',
            'services.security.feature3': '24/7 infrastructure monitoring',
            'services.fullstack.title': 'Full Stack Development',
            'services.fullstack.desc': 'Development of complete web applications with modern technologies, from architecture to production deployment.',
            'services.fullstack.feature1': 'React, Vue, Angular',
            'services.fullstack.feature2': 'Spring Boot, Node.js',
            'services.fullstack.feature3': 'SQL and NoSQL databases',
            'services.optimization.title': 'Process Optimization',
            'services.optimization.desc': '25% reduction in delivery times and 60% workflow optimization through best practices and automation.',
            'services.optimization.feature1': 'Implementation of best practices',
            'services.optimization.feature2': 'Process automation',
            'services.optimization.feature3': 'Continuous improvement and SCRUM',
            'services.leadership.title': 'Technical Leadership',
            'services.leadership.desc': 'Coordination of multidisciplinary technical teams, mentoring and training to ensure high-impact deliveries and team growth.',
            'services.leadership.feature1': 'Technical team management',
            'services.leadership.feature2': 'Mentoring and training',
            'services.leadership.feature3': 'Promotion of technical culture',
            'portfolio.subtitle': 'Some of my featured projects',
            'portfolio.item1.title': 'Industrial IIoT System',
            'portfolio.item1.desc': 'Complete industrial monitoring platform with sensors, gateways and real-time dashboard to optimize production processes.',
            'portfolio.item2.title': 'AWS Cloud Migration',
            'portfolio.item2.desc': 'Complete redesign from on-premise to cloud with high availability, load balancing and cost reduction.',
            'portfolio.item3.title': 'Secure Enterprise Network',
            'portfolio.item3.desc': 'Corporate network implementation with Fortinet firewalls, secure VPN and 24/7 monitoring for critical industry.',
            'portfolio.item4.title': 'Analytics Dashboard',
            'portfolio.item4.desc': 'Real-time data visualization system with predictive analysis for business decision-making.',
            'contact.subtitle': 'Ready to transform your business? Let’s talk',
            'contact.headingMain': 'Let’s Talk About Your Project',
            'contact.results': 'Proven Results',
            'contact.desc': 'Ready to optimize your company with IIoT solutions and reduce delivery times by 25%? Let’s turn your vision into a scalable technological reality together.',
            'contact.direct': 'Direct Contact',
            'contact.location': 'Cartagena, Colombia',
            'contact.form.name': 'Your name',
            'contact.form.email': 'Your email',
            'contact.form.subject': 'Subject',
            'contact.form.message': 'Your message',
            'contact.send': 'Send Message',
            'social.whatsapp': 'WhatsApp',
            'social.email': 'Email',
            'social.linkedin': 'LinkedIn',
            'footer.about': 'Senior Full Stack Developer specialized in IIoT, telecommunications and the industrial sector. I reduce delivery times by 25% and optimize workflows by 60%.',
            'footer.services.heading': 'Services',
            'footer.contact.heading': 'Contact',
            'footer.copy': '© 2024 Joseph Herrera. All rights reserved.'
        }
    };

    function applyLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = i18n[lang][key];
            if (text !== undefined) {
                el.textContent = text;
            }
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const text = i18n[lang][key];
            if (text !== undefined) {
                el.setAttribute('placeholder', text);
            }
        });
        localStorage.setItem('lang', lang);
        if (langToggle) langToggle.textContent = lang.toUpperCase();
    }

    const systemLang = (navigator.language || 'es').startsWith('es') ? 'es' : 'en';
    const savedLang = localStorage.getItem('lang') || systemLang;
    applyLanguage(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const next = (localStorage.getItem('lang') === 'es') ? 'en' : 'es';
            applyLanguage(next);
        });
    }

    function applyTheme(pref) {
        if (pref === 'system') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', pref);
        }
        localStorage.setItem('theme', pref);
        if (themeToggle) {
            themeToggle.textContent = pref === 'dark' ? '🌙' : pref === 'light' ? '☀️' : '🖥️';
        }
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    mediaQuery.addEventListener('change', () => {
        if ((localStorage.getItem('theme') || 'system') === 'system') {
            applyTheme('system');
        }
    });

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = localStorage.getItem('theme') || 'system';
            const next = current === 'system' ? (mediaQuery.matches ? 'light' : 'dark') : current === 'dark' ? 'light' : 'system';
            applyTheme(next);
        });
    }
