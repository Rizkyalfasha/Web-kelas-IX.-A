// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress < 30) {
            loadingText.textContent = 'Memuat aset...';
        } else if (progress < 60) {
            loadingText.textContent = 'Menyiapkan konten...';
        } else if (progress < 90) {
            loadingText.textContent = 'Hampir selesai...';
        } else {
            loadingText.textContent = 'Selamat datang!';
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'visible';
                initializeAnimations();
                createParticles();
            }, 500);
        }
    }, 100);
});

// ===== MOBILE NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR SCROLL EFFECTS =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    }
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== HERO IMAGE SIZE CONTROL =====
const imageSizeSelect = document.getElementById('imageSize');
const heroImage = document.getElementById('heroImage');

imageSizeSelect.addEventListener('change', function() {
    const selectedSize = this.value;
    
    // Remove existing size classes
    heroImage.classList.remove('small', 'medium', 'large');
    
    // Add new size class with animation
    heroImage.style.transform = 'scale(0.8)';
    heroImage.style.transition = 'all 0.4s ease';
    
    setTimeout(() => {
        heroImage.classList.add(selectedSize);
        heroImage.style.transform = 'scale(1)';
    }, 200);
    
    // Show notification
    const sizeText = selectedSize === 'small' ? 'Kecil' : 
                    selectedSize === 'medium' ? 'Sedang' : 'Besar';
    showNotification(`Ukuran foto diubah ke ${sizeText}`, 'success');
    
    // Save preference
    localStorage.setItem('preferredImageSize', selectedSize);
});

// Load saved image size preference
window.addEventListener('load', function() {
    const savedSize = localStorage.getItem('preferredImageSize');
    if (savedSize) {
        imageSizeSelect.value = savedSize;
        heroImage.classList.remove('small', 'medium', 'large');
        heroImage.classList.add(savedSize);
    }
});

// ===== SECTION NAVIGATION BUTTONS =====
document.querySelectorAll('[data-section]').forEach(button => {
    button.addEventListener('click', function() {
        const sectionId = this.dataset.section;
        const targetSection = document.getElementById(sectionId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Button animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    updateCounter();
}

// Initialize counters when they come into view
const observeCounters = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-target]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const suffix = counter.textContent.includes('%') ? '%' : '';
                animateCounter(counter, target, 1500, suffix);
            });
            observeCounters.unobserve(entry.target);
        }
    });
});

// Observe hero stats and students stats
document.querySelectorAll('.hero-stats, .students-stats').forEach(section => {
    observeCounters.observe(section);
});

// ===== DYNAMIC STUDENTS LIST =====
const studentsData = [
    { name: 'Ahmad Rizky Pratama', number: '01' },
    { name: 'Aisyah Putri', number: '02' },
    { name: 'Bayu Setiawan', number: '03' },
    { name: 'Bella Safira', number: '04' },
    { name: 'Budi Santoso', number: '05' },
    { name: 'Citra Dewi', number: '06' },
    { name: 'Dani Firmansyah', number: '07' },
    { name: 'Dewi Sartika', number: '08' },
    { name: 'Eka Pradana', number: '09' },
    { name: 'Fania Rahayu', number: '10' },
    { name: 'Gilang Pratama', number: '11' },
    { name: 'Hana Melati', number: '12' },
    { name: 'Indra Gunawan', number: '13' },
    { name: 'Jasmine Putri', number: '14' },
    { name: 'Kevin Adriano', number: '15' },
    { name: 'Larasati', number: '16' },
    { name: 'Maya Sari', number: '17' },
    { name: 'Nanda Pratiwi', number: '18' },
    { name: 'Oscar Ramadan', number: '19' },
    { name: 'Putri Maharani', number: '20' },
    { name: 'Qori Aisyah', number: '21' },
    { name: 'Rina Melati', number: '22' },
    { name: 'Sari Indah', number: '23' },
    { name: 'Taufik Hidayat', number: '24' },
    { name: 'Umi Kalsum', number: '25' },
    { name: 'Vina Cantika', number: '26' },
    { name: 'Wahyu Setiawan', number: '27' },
    { name: 'Xania Putri', number: '28' },
    { name: 'Yuda Pratama', number: '29' },
    { name: 'Zahra Aulia', number: '30' },
    { name: 'Zaki Firmansyah', number: '31' },
    { name: 'Zara Maharani', number: '32' }
];

function generateStudentsList() {
    const studentsGrid = document.querySelector('.students-grid');
    
    studentsData.forEach((student, index) => {
        const studentCard = document.createElement('div');
        studentCard.className = 'student-card';
        studentCard.setAttribute('data-aos', 'fade-up');
        studentCard.setAttribute('data-aos-delay', (index % 8) * 100);
        
        const initials = student.name.split(' ')
            .map(word => word.charAt(0))
            .join('')
            .substring(0, 2);
        
        studentCard.innerHTML = `
            <div class="student-avatar">
                ${initials}
            </div>
            <div class="student-name">${student.name}</div>
            <div class="student-number">No. Absen: ${student.number}</div>
        `;
        
        studentsGrid.appendChild(studentCard);
    });
}

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.dataset.filter;
        
        // Filter gallery items with animation
        galleryItems.forEach((item, index) => {
            if (filterValue === 'all' || item.dataset.category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        const filterText = filterValue === 'all' ? 'Semua' : 
                          filterValue === 'study' ? 'Belajar' :
                          filterValue === 'activity' ? 'Kegiatan' : 'Prestasi';
        showNotification(`Filter ${filterText} diterapkan`, 'success');
    });
});

// ===== GALLERY MODAL =====
document.querySelectorAll('.view-btn, .gallery-item img').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const galleryItem = this.closest('.gallery-item');
        const img = galleryItem.querySelector('img');
        const title = galleryItem.querySelector('h4').textContent;
        const description = galleryItem.querySelector('p').textContent;
        
        createModal(img.src, title, description);
    });
});

function createModal(imageSrc, title, description) {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${imageSrc}" alt="${title}">
            <div class="modal-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 15px;
        overflow: hidden;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 20px;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10001;
        transition: background 0.3s ease;
    `;
    
    const image = modal.querySelector('img');
    image.style.cssText = `
        width: 100%;
        max-height: 70vh;
        object-fit: contain;
    `;
    
    const info = modal.querySelector('.modal-info');
    info.style.cssText = `
        padding: 2rem;
        text-align: center;
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modal.style.opacity = '1';
        content.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal function
    function closeModal() {
        modal.style.opacity = '0';
        content.style.transform = 'scale(0.8)';
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SCROLL ANIMATIONS =====
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attributes
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ===== PARTICLES SYSTEM =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 200);
    }
    
    // Continue creating particles
    setInterval(createParticle, 3000);
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 10 + 10;
    
    particle.style.left = startX + 'px';
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.animationDuration = duration + 's';
    particle.style.opacity = Math.random() * 0.5 + 0.1;
    
    document.getElementById('particles').appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration * 1000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    const colors = {
        success: 'linear-gradient(135deg, #28a745, #20c997)',
        error: 'linear-gradient(135deg, #dc3545, #e55353)',
        warning: 'linear-gradient(135deg, #ffc107, #ffca2c)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colors[type]};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 600;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// ===== TYPING EFFECT =====
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 500);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Alt + number keys for quick navigation
    if (e.altKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
                showNotification('Navigasi ke Home', 'info');
                break;
            case '2':
                e.preventDefault();
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
                showNotification('Navigasi ke Tentang', 'info');
                break;
            case '3':
                e.preventDefault();
                document.getElementById('structure').scrollIntoView({ behavior: 'smooth' });
                showNotification('Navigasi ke Struktur', 'info');
                break;
            case '4':
                e.preventDefault();
                document.getElementById('students').scrollIntoView({ behavior: 'smooth' });
                showNotification('Navigasi ke Siswa', 'info');
                break;
            case '5':
                e.preventDefault();
                document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
                showNotification('Navigasi ke Galeri', 'info');
                break;
        }
    }
    
    // ESC key to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.gallery-modal');
        if (modal) {
            modal.querySelector('.modal-close').click();
        }
        
        const activeMobileMenu = document.querySelector('.nav-menu.active');
        const activeHamburger = document.querySelector('.hamburger.active');
        
        if (activeMobileMenu && activeHamburger) {
            activeHamburger.classList.remove('active');
            activeMobileMenu.classList.remove('active');
        }
    }
});

// ===== SOCIAL LINKS TRACKING =====
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.classList.contains('whatsapp') ? 'WhatsApp' : 'TikTok';
        const name = this.closest('.position-card').querySelector('h3').textContent;
        
        showNotification(`Membuka ${platform} ${name}`, 'success');
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// ===== ACTIVE NAVIGATION HIGHLIGHTING =====
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PARALLAX EFFECTS =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    
    // Floating shapes parallax
    document.querySelectorAll('.shape').forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ===== IMAGE LAZY LOADING =====
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

// Observe all images
document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ===== THEME SWITCHER (Optional Easter Egg) =====
let clickCount = 0;
const logo = document.querySelector('.nav-logo');

logo.addEventListener('click', function() {
    clickCount++;
    
    if (clickCount === 5) {
        // Activate party mode
        document.body.style.animation = 'rainbow 2s linear infinite';
        showNotification('🎉 Party Mode Activated! Kelas 9A is the best!', 'success', 5000);
        
        // Add confetti effect
        createConfetti();
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        // Reset after 10 seconds
        setTimeout(() => {
            document.body.style.animation = '';
            clickCount = 0;
            style.remove();
        }, 10000);
    }
});

// ===== CONFETTI EFFECT =====
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#28a745', '#ffc107', '#dc3545'];
    
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
            animation: confettiFall ${Math.random() * 2 + 2}s linear;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 4000);
    }
    
    // Add confetti animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        style.remove();
    }, 4000);
}

// ===== PERFORMANCE MONITORING =====
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const navigation = performance.getEntriesByType('navigation')[0];
                if (navigation) {
                    const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
                    
                    if (loadTime > 3000) {
                        console.warn('Slow page load:', loadTime + 'ms');
                    }
                    
                    console.log('Page loaded in:', loadTime + 'ms');
                }
            }, 0);
        });
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchBtn = document.createElement('button');
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.className = 'search-toggle';
    searchBtn.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(searchBtn);
    
    searchBtn.addEventListener('click', function() {
        // Toggle search functionality
        showNotification('Fitur pencarian akan segera hadir!', 'info');
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Terjadi kesalahan. Silakan refresh halaman.', 'error');
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise Rejection:', e.reason);
    showNotification('Terjadi kesalahan jaringan.', 'error');
});

// ===== DATA PERSISTENCE =====
function saveUserData(key, value) {
    try {
        localStorage.setItem(`kelas9a_${key}`, JSON.stringify(value));
    } catch (e) {
        console.warn('LocalStorage not available, using memory storage');
        window.classData = window.classData || {};
        window.classData[key] = value;
    }
}

function loadUserData(key) {
    try {
        const data = localStorage.getItem(`kelas9a_${key}`);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return window.classData && window.classData[key] ? window.classData[key] : null;
    }
}

// ===== ACCESSIBILITY IMPROVEMENTS =====
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Skip to content link for screen readers
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link sr-only';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: #667eea;
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

// ===== FINAL INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    generateStudentsList();
    measurePerformance();
    initializeSearch();
    
    // Apply typing effect to hero title
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 4000);
    }
    
    // Load user preferences
    const savedTheme = loadUserData('theme');
    if (savedTheme === 'dark') {
        // Apply dark theme if needed
        document.body.classList.add('dark-theme');
    }
    
    // Welcome message
    setTimeout(() => {
        showNotification('🎓 Selamat datang di website Kelas IX.A! Gunakan Alt+1-5 untuk navigasi cepat.', 'success', 5000);
    }, 5000);
    
    console.log('🎓 Website Kelas IX.A successfully loaded!');
    console.log('🎯 Features: Responsive design, animations, particles, modals');
    console.log('⌨️ Shortcuts: Alt+1-5 for quick navigation');
    console.log('🎨 Easter egg: Click logo 5 times for party mode!');
    console.log('📱 Mobile optimized with touch gestures');
});

// ===== TOUCH GESTURES FOR MOBILE =====
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
    
    // Detect swipe gestures
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next section
                navigateToNextSection();
            } else {
                // Swipe right - previous section
                navigateToPreviousSection();
            }
        }
    }
    
    startX = null;
    startY = null;
});

function navigateToNextSection() {
    const sections = ['home', 'about', 'structure', 'students', 'gallery'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
        const nextSection = sections[currentIndex + 1];
        document.getElementById(nextSection).scrollIntoView({ behavior: 'smooth' });
        showNotification('Swipe: ' + nextSection, 'info', 1000);
    }
}

function navigateToPreviousSection() {
    const sections = ['home', 'about', 'structure', 'students', 'gallery'];
    const currentSection = getCurrentSection();
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
        const prevSection = sections[currentIndex - 1];
        document.getElementById(prevSection).scrollIntoView({ behavior: 'smooth' });
        showNotification('Swipe: ' + prevSection, 'info', 1000);
    }
}

function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let current = 'home';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    return current;
}