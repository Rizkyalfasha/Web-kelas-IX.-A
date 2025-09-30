// ===== DOM ELEMENTS =====
const loadingScreen = document.getElementById('loadingScreen');
const mainContent = document.getElementById('mainContent');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const navHamburger = document.getElementById('navHamburger');
const heroBtn = document.getElementById('heroBtn');
const scrollToTop = document.getElementById('scrollToTop');
const contactForm = document.getElementById('contactForm');
const imageModal = document.getElementById('imageModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');

// ===== LOADING SCREEN MANAGER =====
class LoadingManager {
    constructor() {
        this.duration = 4000; // 4 seconds
        this.init();
    }

    init() {
        this.startLoading();
    }

    startLoading() {
        const progress = document.querySelector('.loader-progress');
        let currentProgress = 0;
        const targetProgress = 100;
        const duration = this.duration;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progressPercent = Math.min((elapsed / duration) * 100, 100);
            
            progress.style.width = progressPercent + '%';

            if (progressPercent < 100) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => this.hideLoading(), 500);
            }
        };

        requestAnimationFrame(animate);
    }

    hideLoading() {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            mainContent.classList.add('loaded');
            this.initializeAfterLoad();
        }, 800);
    }

    initializeAfterLoad() {
        // Initialize animations
        this.animateOnScroll();
        // Start counter animations
        setTimeout(() => this.animateCounters(), 1000);
    }

    animateOnScroll() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });

        // Animate struktur cards
        document.querySelectorAll('.struktur-card').forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
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
        this.setActiveLink();
    }

    setupEventListeners() {
        // Hamburger menu toggle
        navHamburger.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
                this.setActiveLinkFromClick(link);
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navHamburger.contains(e.target) && 
                !navMenu.contains(e.target) && 
                this.isMenuOpen) {
                this.closeMenu();
            }
        });

        // Hero button
        if (heroBtn) {
            heroBtn.addEventListener('click', () => {
                document.getElementById('about').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        navHamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : 'auto';
    }

    closeMenu() {
        this.isMenuOpen = false;
        navHamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    setupScrollEffects() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Navbar background change
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Scroll to top button
            if (currentScrollY > 300) {
                scrollToTop.classList.add('visible');
            } else {
                scrollToTop.classList.remove('visible');
            }

            // Set active link based on scroll position
            this.setActiveLink();

            lastScrollY = currentScrollY;
        });

        // Scroll to top functionality
        scrollToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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

    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    setActiveLinkFromClick(clickedLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        clickedLink.classList.add('active');
    }
}

// ===== GALLERY MANAGER =====
class GalleryManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupImageModal();
    }

    setupFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupImageModal() {
        const galleryItems = document.querySelectorAll('.gallery-item');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const caption = item.querySelector('.gallery-content h4').textContent;
                
                modalImage.src = img.src;
                modalCaption.textContent = caption;
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        modalClose.addEventListener('click', () => this.closeModal());
        
        // Close on overlay click
        document.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal());

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }

    closeModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ===== CONTACT FORM MANAGER =====
class ContactFormManager {
    constructor() {
        this.init();
    }

    init() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Create WhatsApp message
        const whatsappMessage = `Halo! Saya ${name}%0A%0AEmail: ${email}%0ATelepon: ${phone}%0A%0APesan:%0A${message}`;
        const whatsappUrl = `https://wa.me/628123456789?text=${whatsappMessage}`;

        // Show success animation
        this.showSuccessMessage();

        // Redirect to WhatsApp after delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 1500);
    }

    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 2rem 3rem;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            z-index: 10002;
            text-align: center;
            animation: zoomIn 0.3s ease;
        `;
        successDiv.innerHTML = `
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 0.5rem;">Pesan Terkirim!</h3>
            <p>Anda akan diarahkan ke WhatsApp...</p>
        `;

        document.body.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 2000);
    }
}

// ===== EFFECTS MANAGER =====
class EffectsManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupParallax();
        this.setupHoverEffects();
        this.setupScrollAnimations();
        this.setupRippleEffect();
        this.createProgressBar();
    }

    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            
            // Hero parallax
            const hero = document.querySelector('.hero');
            if (hero && scrollY < window.innerHeight) {
                hero.style.transform = `translateY(${scrollY * 0.5}px)`;
            }

            // Shapes parallax
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                shape.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }

    setupHoverEffects() {
        // Card hover effects
        document.querySelectorAll('.struktur-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Social link hover
        document.querySelectorAll('.social-link, .social-btn').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.15) rotate(5deg)';
            });

            link.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }

    setupScrollAnimations() {
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

        document.querySelectorAll('.text-card, .info-card, .visual-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    setupRippleEffect() {
        const buttons = document.querySelectorAll('.hero-btn, .submit-btn, .filter-btn');

        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation to CSS
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
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

    createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(135deg, #667eea, #764ba2);
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
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    const loadingManager = new LoadingManager();
    const navigationManager = new NavigationManager();
    const galleryManager = new GalleryManager();
    const contactFormManager = new ContactFormManager();
    const effectsManager = new EffectsManager();

    // Console welcome message
    console.log('%c🎓 Website Kelas IX.A', 'font-size: 24px; font-weight: bold; color: #667eea;');
    console.log('%c✨ Loaded Successfully!', 'font-size: 16px; color: #764ba2;');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cFitur-fitur:', 'font-weight: bold; color: #667eea;');
    console.log('• Loading screen dengan animasi');
    console.log('• Navigasi responsif & smooth scroll');
    console.log('• 9 struktur pengurus dengan foto & kontak');
    console.log('• Galeri dengan filter kategori');
    console.log('• Form kontak terintegrasi WhatsApp');
    console.log('• Parallax effects & hover animations');
    console.log('• Image modal untuk galeri');
    console.log('• Scroll progress indicator');
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #667eea;');
    console.log('%cMade with ❤️ for Kelas IX.A', 'font-style: italic; color: #764ba2;');
});

// ===== WINDOW EVENTS =====
window.addEventListener('load', () => {
    console.log('✅ All resources loaded!');
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoadingManager,
        NavigationManager,
        GalleryManager,
        ContactFormManager,
        EffectsManager,
        Utils
    };
}