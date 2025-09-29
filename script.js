// ===== GLOBAL VARIABLES =====
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const ctaButton = document.getElementById('ctaButton');
const header = document.querySelector('.header');
const scrollTop = document.getElementById('scrollTop');

// ===== LOADING SCREEN =====
class LoadingManager {
    constructor() {
        this.loadingDuration = 4000; // 4 seconds
        this.init();
    }

    init() {
        this.startLoading();
        this.setupProgressAnimation();
    }

    startLoading() {
        // Simulate loading progress
        const progressBar = document.querySelector('.loader-progress');
        let progress = 0;
        
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => this.hideLoading(), 500);
            }
        }, 200);
    }

    setupProgressAnimation() {
        // Add typewriter effect to subtitle
        const subtitle = document.querySelector('.loader-subtitle');
        const text = subtitle.textContent;
        subtitle.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            subtitle.textContent += text.charAt(i);
            i++;
            if (i >= text.length) {
                clearInterval(typeInterval);
            }
        }, 100);
    }

    hideLoading() {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            mainContent.classList.add('loaded');
            this.initializeAnimations();
        }, 800);
    }

    initializeAnimations() {
        // Initialize AOS-like animations
        this.observeElements();
        // Initialize other animations
        setTimeout(() => {
            this.startCounterAnimations();
        }, 1000);
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    startCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            this.animateCounter(counter, 0, target, 2000);
        });
    }

    animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
}

// ===== NAVIGATION MANAGER =====
class NavigationManager {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollEffects();
        this.setupSmoothScroll();
    }

    setupEventListeners() {
        // Hamburger menu toggle
        hamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // CTA button click
        ctaButton.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    }

    closeMenu() {
        this.isMenuOpen = false;
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Header background change
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Scroll to top button
            if (currentScrollY > 300) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }

            // Parallax effects
            this.updateParallax(currentScrollY);

            lastScrollY = currentScrollY;
        });

        // Scroll to top functionality
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    updateParallax(scrollY) {
        const heroSection = document.querySelector('.hero');
        const heroParticles = document.querySelector('.hero-particles');
        const heroImage = document.querySelector('.hero-image');

        if (heroSection && scrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            
            if (heroParticles) {
                heroParticles.style.transform = `translateY(${scrollY * 0.3}px)`;
            }
            
            if (heroImage) {
                heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        }
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== ANIMATIONS MANAGER =====
class AnimationsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupGalleryAnimations();
        this.setupStructureAnimations();
        this.createFloatingElements();
        this.setupProgressIndicator();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Special animations for different sections
                    if (entry.target.classList.contains('struktur-grid')) {
                        this.animateStructureCards();
                    }
                    
                    if (entry.target.classList.contains('gallery-grid')) {
                        this.animateGalleryItems();
                    }
                }
            });
        }, { 
            threshold: 0.1, 
            rootMargin: '0px 0px -50px 0px' 
        });

        // Observe sections for animation
        document.querySelectorAll('.about-content, .struktur-grid, .gallery-grid, .kontak-content').forEach(el => {
            observer.observe(el);
        });
    }

    animateStructureCards() {
        const cards = document.querySelectorAll('.struktur-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    animateGalleryItems() {
        const items = document.querySelectorAll('.gallery-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.struktur-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateY(5deg)';
                
                // Add glow effect
                const badge = this.querySelector('.card-badge');
                if (badge) {
                    badge.style.transform = 'scale(1.1)';
                }
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateY(0deg)';
                
                const badge = this.querySelector('.card-badge');
                if (badge) {
                    badge.style.transform = 'scale(1)';
                }
            });
        });

        // Social media links animation
        document.querySelectorAll('.social-link, .social-btn').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(5deg)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });

        // Gallery items 3D effect
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateX(10deg) rotateY(5deg)';
            });

            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
            });
        });
    }

    setupGalleryAnimations() {
        // Initialize gallery items with hidden state
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px) scale(0.9)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    setupStructureAnimations() {
        // Initialize structure cards with hidden state
        document.querySelectorAll('.struktur-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    createFloatingElements() {
        // Create floating particles for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                particle.style.cssText = `
                    position: absolute;
                    width: ${Math.random() * 6 + 4}px;
                    height: ${Math.random() * 6 + 4}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: float ${Math.random() * 3 + 4}s ease-in-out infinite;
                    animation-delay: ${Math.random() * 2}s;
                    pointer-events: none;
                `;
                heroSection.appendChild(particle);
            }
        }
    }

    setupProgressIndicator() {
        // Create scroll progress indicator
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10001;
            transition: width 0.3s ease;
            border-radius: 0 2px 2px 0;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// ===== EFFECTS MANAGER =====
class EffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupRippleEffect();
        this.setupMouseTracker();
        this.setupTypingEffect();
        this.setupImageLazyLoading();
        this.setupEasterEgg();
    }

    setupRippleEffect() {
        const buttons = document.querySelectorAll('.cta-button, .btn-gradient');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;

                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation to CSS
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupMouseTracker() {
        let mouseX = 0, mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX / window.innerWidth - 0.5;
            mouseY = e.clientY / window.innerHeight - 0.5;
        });

        // Apply parallax effect to floating elements
        setInterval(() => {
            const floatingElements = document.querySelectorAll('.floating-particle, .hero-particles');
            floatingElements.forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                const x = mouseX * speed * 30;
                const y = mouseY * speed * 30;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        }, 16); // ~60fps
    }

    setupTypingEffect() {
        const typeElements = document.querySelectorAll('[data-type]');
        
        typeElements.forEach(element => {
            const text = element.getAttribute('data-type') || element.textContent;
            const speed = parseInt(element.getAttribute('data-speed')) || 100;
            
            element.textContent = '';
            this.typeWriter(element, text, speed);
        });
    }

    typeWriter(element, text, speed = 100) {
        let i = 0;
        const typing = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        };
        typing();
    }

    setupImageLazyLoading() {
        const images = document.querySelectorAll('img');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.style.opacity = '0';
                    img.style.transform = 'scale(0.9)';
                    img.style.transition = 'all 0.6s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    setupEasterEgg() {
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.code);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
                this.activateEasterEgg();
                konamiCode = [];
            }
        });
    }

    activateEasterEgg() {
        // Rainbow mode activation
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Create celebration particles
        this.createCelebrationParticles();
        
        setTimeout(() => {
            document.body.style.animation = 'none';
            this.showEasterEggMessage();
        }, 2000);

        // Add rainbow animation
        if (!document.querySelector('#easter-egg-style')) {
            const style = document.createElement('style');
            style.id = 'easter-egg-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    25% { filter: hue-rotate(90deg); }
                    50% { filter: hue-rotate(180deg); }
                    75% { filter: hue-rotate(270deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createCelebrationParticles() {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: hsl(${Math.random() * 360}, 70%, 60%);
                border-radius: 50%;
                top: ${Math.random() * 100}vh;
                left: ${Math.random() * 100}vw;
                animation: celebration 3s ease-out forwards;
                pointer-events: none;
                z-index: 10000;
            `;
            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 3000);
        }

        // Add celebration animation
        const celebrationStyle = document.createElement('style');
        celebrationStyle.textContent = `
            @keyframes celebration {
                0% {
                    transform: scale(0) rotate(0deg);
                    opacity: 1;
                }
                50% {
                    transform: scale(1) rotate(180deg);
                    opacity: 0.8;
                }
                100% {
                    transform: scale(0) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(celebrationStyle);
        setTimeout(() => celebrationStyle.remove(), 3000);
    }

    showEasterEggMessage() {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            animation: modalFadeIn 0.3s ease;
        `;

        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: modalSlideIn 0.5s ease;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        `;

        content.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="color: #667eea; margin-bottom: 1rem;">Selamat!</h2>
            <p style="margin-bottom: 2rem; color: #666;">Anda menemukan Easter Egg rahasia Kelas IX.A!</p>
            <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                    style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-weight: 600;">
                Tutup
            </button>
        `;

        modal.appendChild(content);
        document.body.appendChild(modal);

        // Add modal animations
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            @keyframes modalFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes modalSlideIn {
                from { transform: translateY(-50px) scale(0.9); }
                to { transform: translateY(0) scale(1); }
            }
        `;
        document.head.appendChild(modalStyle);

        setTimeout(() => {
            modal.remove();
            modalStyle.remove();
        }, 10000); // Auto close after 10 seconds
    }
}

// ===== UTILITIES =====
class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    static easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// ===== PERFORMANCE MANAGER =====
class PerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeAnimations();
        this.lazyLoadImages();
        this.preloadCriticalAssets();
    }

    optimizeAnimations() {
        // Use requestAnimationFrame for smooth animations
        const throttledScroll = Utils.throttle(() => {
            // Scroll-based animations go here
        }, 16); // ~60fps

        window.addEventListener('scroll', throttledScroll);
    }

    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    preloadCriticalAssets() {
        // Preload important images
        const criticalImages = [
            'https://i.ibb.co/8BvL5yN/class-hero.jpg',
            'https://i.ibb.co/qWFRzXs/class-photo.jpg'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = src;
            link.as = 'image';
            document.head.appendChild(link);
        });
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const loadingManager = new LoadingManager();
    const navigationManager = new NavigationManager();
    const animationsManager = new AnimationsManager();
    const effectsManager = new EffectsManager();
    const performanceManager = new PerformanceManager();

    // Console message
    console.log(`
    🎓 Website Kelas IX.A berhasil dimuat!
    
    ✨ Fitur yang tersedia:
    • Animasi loading yang smooth
    • Navigasi responsif dengan hamburger menu
    • Parallax effects dan hover animations
    • Counter animations untuk statistik
    • Lazy loading untuk performa optimal
    • Easter egg rahasia (coba Konami Code!)
    
    🎮 Easter Egg: ↑↑↓↓←→←→BA
    
    Made with ❤️ for Kelas IX.A
    `);
});

// ===== WINDOW EVENTS =====
window.addEventListener('load', () => {
    // Additional initialization after full page load
    console.log('🚀 All assets loaded successfully!');
});

window.addEventListener('beforeunload', () => {
    // Cleanup before page unload
    document.body.style.opacity = '0';
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoadingManager,
        NavigationManager,
        AnimationsManager,
        EffectsManager,
        Utils,
        PerformanceManager
    };
}