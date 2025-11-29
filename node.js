// Fungsi untuk menampilkan section yang dipilih
function showSection(sectionId) {
    // Sembunyikan semua section
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Hapus class active dari semua tombol
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Tampilkan section yang dipilih
    document.getElementById(sectionId).classList.add('active');

    // Tambahkan class active ke tombol yang diklik
    event.target.classList.add('active');
}

// Animasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Animasi fade in untuk semua card
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.animation = `fadeIn 0.5s ease forwards`;
            card.style.animationDelay = `${index * 0.1}s`;
        }, 100);
    });

    // Smooth scroll untuk navigasi
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Hover effect untuk student cards
    const studentCards = document.querySelectorAll('.student-card');
    studentCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Efek parallax sederhana untuk background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        document.body.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    });

    // Console log untuk debugging
    console.log('Website Kelas 9.A berhasil dimuat!');
    console.log('Selamat datang di website kelas terbaik! 🎓');
});

// Fungsi untuk menampilkan waktu saat ini (opsional)
function displayCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    console.log('Waktu akses:', timeString);
}

displayCurrentTime();

// Easter egg: Ketik "kelas9a" di console untuk animasi khusus
window.addEventListener('keypress', function(e) {
    if (e.key === 'k') {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = 'fadeIn 0.5s ease';
            }, 10);
        });
    }
});