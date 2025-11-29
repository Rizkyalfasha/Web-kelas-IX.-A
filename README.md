# 🎓 Website Kelas 9.A

Website resmi kelas 9.A dengan desain modern dan interaktif untuk lomba website kelas.

## 📁 Struktur File

```
kelas-9a-website/
├── index.html       # File HTML utama
├── style.css        # File CSS untuk styling
├── script.js        # File JavaScript untuk interaktivitas
└── README.md        # Dokumentasi (file ini)
```

## ✨ Fitur Unggulan

### 1. **Desain Modern & Responsif**
- Gradient background yang menarik
- Animasi smooth pada hover
- Mobile-friendly (responsive design)
- Efek glassmorphism pada card

### 2. **5 Menu Utama**
- 👥 **Struktur Kelas** - Menampilkan pengurus kelas
- 📚 **Daftar Siswa** - List lengkap siswa dengan kontak
- 📅 **Jadwal Pelajaran** - Jadwal per hari
- 🧹 **Jadwal Piket** - Pembagian piket harian
- 🏫 **Piket Umum** - Jadwal piket mingguan

### 3. **Integrasi Sosial Media**
- Link langsung ke WhatsApp (klik nomor)
- Link langsung ke TikTok (klik username)
- Tombol interaktif dengan animasi

## 🚀 Cara Menggunakan

### Instalasi
1. Download semua file (index.html, style.css, script.js)
2. Simpan dalam satu folder yang sama
3. Buka file `index.html` dengan browser

### Edit Data
Buka `index.html` dengan text editor dan ganti:

#### Data Siswa
```html
<div class="student-card">
    <div class="student-name">Nama Siswa</div>
    <div class="student-role">Jabatan</div>
    <div class="contact-links">
        <a href="https://wa.me/628123456789" class="contact-btn">📱 WhatsApp</a>
        <a href="https://www.tiktok.com/@username" class="contact-btn">🎵 TikTok</a>
    </div>
</div>
```

#### Format Nomor WhatsApp
- Hapus angka 0 di depan
- Tambahkan 62
- Contoh: 0812-3456-7890 → 6281234567890

#### Format Username TikTok
- Ganti `@username` dengan username asli
- Contoh: `@username` → `@kelastigaa`

## 🎨 Kustomisasi Warna

Edit file `style.css` untuk mengubah warna:

```css
/* Warna gradient utama */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Warna tombol */
.nav-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Pilihan Warna Alternatif:
- **Biru-Hijau**: `#11998e 0%, #38ef7d 100%`
- **Pink-Orange**: `#f093fb 0%, #f5576c 100%`
- **Merah-Ungu**: `#eb3349 0%, #f45c43 100%`
- **Hijau-Biru**: `#56ccf2 0%, #2f80ed 100%`

## 📱 Fitur Tambahan

### Animasi JavaScript
- Fade in saat load
- Hover effects
- Smooth scroll
- Parallax background

### Interaktivitas
- Tombol navigasi dengan transisi smooth
- Card hover dengan scale effect
- Link eksternal otomatis buka tab baru

## 🏆 Tips untuk Lomba

1. **Pastikan Data Lengkap**
   - Isi semua nama siswa
   - Update nomor WhatsApp yang valid
   - Tambahkan username TikTok yang benar

2. **Cek Responsivitas**
   - Test di desktop
   - Test di tablet
   - Test di smartphone

3. **Optimasi Gambar**
   - Jika menambah foto, gunakan format WebP
   - Kompres gambar agar loading cepat

4. **Browser Testing**
   - Chrome ✓
   - Firefox ✓
   - Safari ✓
   - Edge ✓

## 📝 Checklist Sebelum Submit

- [ ] Semua nama siswa sudah diganti
- [ ] Nomor WhatsApp sudah benar (format 628...)
- [ ] Username TikTok sudah benar
- [ ] Jadwal pelajaran sudah diupdate
- [ ] Jadwal piket sudah sesuai
- [ ] Test semua link berfungsi
- [ ] Tampilan mobile sudah dicek
- [ ] Tidak ada typo di konten

## 🛠️ Troubleshooting

### Link WhatsApp tidak berfungsi?
- Pastikan format: `https://wa.me/628123456789`
- Hapus spasi, tanda strip, atau kurung
- Cek nomor sudah aktif WhatsApp

### Link TikTok tidak berfungsi?
- Pastikan format: `https://www.tiktok.com/@username`
- Username harus sesuai dengan profile TikTok
- Cek akun TikTok tidak private

### Tampilan berantakan?
- Pastikan ketiga file (HTML, CSS, JS) dalam folder yang sama
- Cek nama file: `style.css` dan `script.js` (huruf kecil)
- Clear cache browser (Ctrl+F5)

## 💡 Pengembangan Lebih Lanjut

Ide fitur tambahan:
- Galeri foto kegiatan kelas
- Prestasi kelas
- Blog/artikel kelas
- Countdown ujian
- Quotes motivasi

## 📞 Support

Jika ada pertanyaan atau butuh bantuan:
1. Check dokumentasi ini
2. Tanya guru/pembimbing
3. Diskusi dengan teman sekelas

## 📄 Lisensi

Website ini dibuat untuk keperluan lomba kelas 9.A
Free to use and modify untuk keperluan pendidikan

---

**Dibuat dengan ❤️ oleh Kelas 9.A**

*Semoga Sukses Lombanya! 🏆*