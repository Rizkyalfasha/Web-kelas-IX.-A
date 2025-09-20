// ===== PRELOADER & INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePreloader();
    initializeNavigation();
    initializeAnimations();
    initializeParticles();
    initializeImageControls();
    initializeScrollEffects();
    initializeGallery();
    initializeToast();
    initializeModal();
    
    console.log('🎓 Website Kelas IX.A berhasil dimuat!');
});

// ===== PRELOADER FUNCTIONS =====
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const progressFill = document.querySelector('.progress-fill');
    const loadingPercentage = document.querySelector('.loading-percentage');
    const loadingStatus = document.querySelector('.loading-status');
    
    let progress = 0;
    const loadingMessages = [
        'Memuat aset...',
        'Menyiapkan konten...',
        'Mengatur layout...',
        'Hampir selesai...',
        'Selamat datang!'
    ];
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        // Update loading message based on progress
        const messageIndex = Math.floor((progress / 100) * (loadingMessages.length - 1));
        loadingStatus.textContent = loadingMessages[messageIndex];
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = 'visible';
                
                // Start main animations after preloader
                setTimeout(() => {
                    startMainAnimations();
                    createWelcomeMessage();
                }, 500);
            }, 1000);
        }
    }, 100);
}

function startMainAnimations() {
    // Trigger AOS animations
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('aos-animate');
        }, index * 100);
    });
    
    // Start counter animations
    animateCounters();
    
    // Start typing effect for hero title
    startTypingEffect();
}

// ===== NAVIGATION FUNCTIONS =====
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
    
    // Navbar scroll effects
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        // Add/remove scrolled class
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (mobile)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation based on scroll position
        updateActiveNavigationOnScroll();
    });
}

function updateActiveNavigation(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavigationOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL FUNCTIONS =====
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        updateActiveNavigation(`#${sectionId}`);
        showToast(`Navigasi ke ${sectionId}`, 'success');
    }
}

function initializeScrollEffects() {
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        updateActiveNavigation('#home');
        showToast('Kembali ke atas', 'info');
    });
    
    // Scroll indicator in hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            scrollToSection('about');
        });
    }
}

// ===== ANIMATION FUNCTIONS =====
function initializeAnimations() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter animation after a delay
        setTimeout(updateCounter, 2000);
    });
}

function startTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    const texts = ['Selamat Datang', 'di Kelas', 'IX.A'];
    
    titleLines.forEach((line, index) => {
        const text = texts[index];
        let charIndex = 0;
        
        // Clear the text first
        line.textContent = '';
        
        const typeWriter = () => {
            if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing with delay
        setTimeout(typeWriter, 3000 + (index * 800));
    });
}

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 10;
        const opacity = Math.random() * 0.5 + 0.1;
        
        particle.style.cssText = `
            left: ${startX}px;
            width: ${size}px;
            height: ${size}px;
            animation-duration: ${duration}s;
            opacity: ${opacity};
        `;
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(createParticle, i * 300);
    }
    
    // Continue creating particles
    setInterval(createParticle, 2000);
}

// ===== IMAGE CONTROLS =====
function initializeImageControls() {
    const imageSizeSelect = document.getElementById('imageSize');
    const heroImage = document.getElementById('heroImage');
    
    imageSizeSelect.addEventListener('change', function() {
        const selectedSize = this.value;
        
        // Remove existing size classes
        heroImage.classList.remove('small', 'medium', 'large', 'extra-large');
        
        // Add animation effect
        heroImage.style.transform = 'scale(0.9)';
        heroImage.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        setTimeout(() => {
            heroImage.classList.add(selectedSize);
            heroImage.style.transform = 'scale(1)';
        }, 200);
        
        // Show toast notification
        const sizeText = {
            'small': 'Kecil',
            'medium': 'Sedang', 
            'large': 'Besar',
            'extra-large': 'Sangat Besar'
        };
        
        showToast(`Ukuran foto diubah ke ${sizeText[selectedSize]}`, 'success');
        
        // Save preference to localStorage
        try {
            localStorage.setItem('preferredImageSize', selectedSize);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    });
    
    // Load saved preference
    try {
        const savedSize = localStorage.getItem('preferredImageSize');
        if (savedSize) {
            imageSizeSelect.value = savedSize;
            heroImage.classList.remove('small', 'medium', 'large', 'extra-large');
            heroImage.classList.add(savedSize);
        }
    } catch (e) {
        console.warn('LocalStorage not available');
    }
}

// ===== GALLERY FUNCTIONS =====
function initializeGallery() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Show toast
            const filterText = {
                'all': 'Semua',
                'academic': 'Akademik',
                'extracurricular': 'Ekstrakurikuler',
                'achievement': 'Prestasi',
                'event': 'Acara'
            };
            
            showToast(`Filter ${filterText[filter]} diterapkan`, 'info');
        });
    });
}

// ===== MODAL FUNCTIONS =====
function initializeModal() {
    const modal = document.getElementById('imageModal');
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openImageModal(button) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h4').textContent;
    const description = galleryItem.querySelector('p').textContent;
    
    // Set modal content
    modalImage.src = img.src;
    modalImage.alt = title;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    showToast('Gambar dibuka dalam modal', 'info');
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== TOAST NOTIFICATION FUNCTIONS =====
function initializeToast() {
    // Create toast container if it doesn't exist
    if (!document.getElementById('toast')) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle"></i>
                <span class="toast-message"></span>
            </div>
        `;
        document.body.appendChild(toast);
    }
}

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    const toastIcon = toast.querySelector('i');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    const icons = {
        'info': 'fas fa-info-circle',
        'success': 'fas fa-check-circle',
        'warning': 'fas fa-exclamation-triangle',
        'error': 'fas fa-times-circle'
    };
    
    toastIcon.className = icons[type] || icons.info;
    
    // Show toast
    toast.classList.add('active');
    
    // Hide toast after duration
    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

// ===== SOCIAL MEDIA INTERACTIONS =====
function initializeSocialLinks() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.classList.contains('whatsapp') ? 'WhatsApp' : 'TikTok';
            const name = this.closest('.structure-card').querySelector('h3').textContent;
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            showToast(`Membuka ${platform} ${name}`, 'success');
        });
    });
}

// ===== BUTTON INTERACTIONS =====
function initializeButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = this.querySelector('.btn-ripple');
            if (ripple) {
                ripple.style.width = '0';
                ripple.style.height = '0';
                
                setTimeout(() => {
                    ripple.style.width = '200px';
                    ripple.style.height = '200px';
                }, 10);
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 600);
            }
        });
    });
}

// ===== KEYBOARD SHORTCUTS =====
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for navigation
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    scrollToSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    scrollToSection('about');
                    break;
                case '3':
                    e.preventDefault();
                    scrollToSection('structure');
                    break;
                case '4':
                    e.preventDefault();
                    scrollToSection('gallery');
                    break;
                case '5':
                    e.preventDefault();
                    scrollToSection('contact');
                    break;
            }
        }
        
        // ESC key to close modals and mobile menu
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal.active');
            const mobileMenu = document.querySelector('.nav-menu.active');
            const hamburger = document.querySelector('.hamburger.active');
            
            if (modal) {
                closeModal();
            }
            
            if (mobileMenu && hamburger) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Spacebar to scroll down
        if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight * 0.8);
        }
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Hero content parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            const parallaxSpeed = scrolled * 0.3;
            heroContent.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    });
}

// ===== INTERSECTION OBSERVER FOR COUNTERS =====
function initializeCounterObserver() {
    const counterElements = document.querySelectorAll('[data-count]');
    let countersAnimated = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    });
    
    if (counterElements.length > 0) {
        counterObserver.observe(counterElements[0].closest('.hero-stats') || counterElements[0]);
    }
}

// ===== TOUCH GESTURES FOR MOBILE =====
function initializeTouchGestures() {
    let startX = null;
    let startY = null;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Detect swipe gestures (horizontal)
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next section
                navigateToNextSection();
            } else {
                // Swipe right - previous section
                navigateToPreviousSection();
            }
        }
        
        startX = null;
        startY = null;
    });
}

function navigateToNextSection() {
    const sections = ['home', 'about', 'structure', 'gallery', 'contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        scrollToSection(nextSection);
        showToast(`Swipe: ${nextSection}`, 'info', 1500);
    }
}

function navigateToPreviousSection() {
    const sections = ['home', 'about', 'structure', 'gallery', 'contact'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        scrollToSection(prevSection);
        showToast(`Swipe: ${prevSection}`, 'info', 1500);
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    return current;
}

// ===== EASTER EGGS =====
function initializeEasterEggs() {
    let logoClickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    logo.addEventListener('click', function() {
        logoClickCount++;
        
        if (logoClickCount === 5) {
            activatePartyMode();
            logoClickCount = 0;
        }
        
        // Reset counter after 5 seconds of no clicks
        setTimeout(() => {
            logoClickCount = 0;
        }, 5000);
    });
}

function activatePartyMode() {
    // Add party mode class to body
    document.body.classList.add('party-mode');
    
    // Create confetti
    createConfetti();
    
    // Show special toast
    showToast('🎉 PARTY MODE ACTIVATED! Kelas 9A is the BEST! 🎊', 'success', 5000);
    
    // Add rainbow animation to title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.animation = 'rainbow 2s linear infinite';
    }
    
    // Add party CSS
    const partyStyle = document.createElement('style');
    partyStyle.innerHTML = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg) saturate(1.5); }
            100% { filter: hue-rotate(360deg) saturate(1.5); }
        }
        
        .party-mode .hero {
            animation: partyBackground 3s ease-in-out infinite;
        }
        
        @keyframes partyBackground {
            0%, 100% { background: linear-gradient(135deg, #667eea, #764ba2); }
            25% { background: linear-gradient(135deg, #fa709a, #fee140); }
            50% { background: linear-gradient(135deg, #43e97b, #38f9d7); }
            75% { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        }
    `;
    document.head.appendChild(partyStyle);
    
    // Reset after 10 seconds
    setTimeout(() => {
        document.body.classList.remove('party-mode');
        if (heroTitle) {
            heroTitle.style.animation = '';
        }
        document.head.removeChild(partyStyle);
        showToast('Party mode deactivated', 'info');
    }, 10000);
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#fa709a', '#fee140', '#43e97b', '#4facfe'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            z-index: 10000;
            pointer-events: none;
            animation: confettiFall ${Math.random() * 2 + 3}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 5000);
    }
    
    // Add confetti animation
    const confettiStyle = document.createElement('style');
    confettiStyle.innerHTML = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
            }
        }
    `;
    document.head.appendChild(confettiStyle);
    
    setTimeout(() => {
        if (confettiStyle.parentNode) {
            document.head.removeChild(confettiStyle);
        }
    }, 5000);
}

// ===== PERFORMANCE MONITORING =====
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                    
                    console.log(`📊 Page loaded in: ${loadTime}ms`);
                    
                    if (loadTime > 3000) {
                        console.warn('⚠️ Slow page load detected');
                    }
                }
                
                // Monitor largest contentful paint
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log(`🎨 LCP: ${lastEntry.startTime}ms`);
                });
                observer.observe({entryTypes: ['largest-contentful-paint']});
            }, 0);
        });
    }
}

// ===== ERROR HANDLING =====
function initializeErrorHandling() {
    window.addEventListener('error', function(e) {
        console.error('❌ JavaScript Error:', e.error);
        showToast('Terjadi kesalahan. Silakan refresh halaman.', 'error');
    });
    
    window.addEventListener('unhandledrejection', function(e) {
        console.error('❌ Promise Rejection:', e.reason);
        showToast('Terjadi kesalahan jaringan.', 'error');
    });
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
function initializeAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.className = 'sr-only';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===== LAZY LOADING =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                img.style.opacity = '0';
                img.style.transform = 'scale(0.9)';
                img.style.transition = 'all 0.5s ease';
                
                img.onload = function() {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                };
                
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    // Add search functionality (future feature)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            showToast('Fitur pencarian akan segera hadir!', 'info');
        }
    });
}

// ===== WELCOME MESSAGE =====
function createWelcomeMessage() {
    setTimeout(() => {
        showToast('🎓 Selamat datang di website Kelas IX.A! Gunakan Alt+1-5 untuk navigasi cepat.', 'success', 5000);
    }, 2000);
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeGallery();
    initializeModal();
    initializeToast();
    initializeSocialLinks();
    initializeButtons();
    initializeKeyboardShortcuts();
    initializeParallax();
    initializeCounterObserver();
    initializeTouchGestures();
    initializeEasterEggs();
    initializePerformanceMonitoring();
    initializeErrorHandling();
    initializeAccessibility();
    initializeLazyLoading();
    initializeSearch();
    
    console.log('🎓 Website Kelas IX.A loaded successfully!');
    console.log('⌨️ Keyboard shortcuts: Alt+1-5 for navigation');
    console.log('🎨 Easter egg: Click logo 5 times for party mode!');
    console.log('📱 Mobile: Swipe left/right to navigate sections');
    console.log('♿ Accessibility: Full keyboard navigation support');
});

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EXPORT FUNCTIONS FOR GLOBAL USE =====
window.scrollToSection = scrollToSection;
window.openImageModal = openImageModal;
window.showToast = showToast;