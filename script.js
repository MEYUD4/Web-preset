// Menjalankan kode setelah semua konten HTML dimuat
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA UNTUK SEMUA HALAMAN ---
    // (Fungsi login ada di sini)

    // --- LOGIKA KHUSUS Halaman index.html ---
    const presetGrid = document.getElementById('preset-grid');
    if (presetGrid) {
        // Jika kita di index.html (ada grid preset)
        loadPublicPresets();
    }

    // --- LOGIKA KHUSUS Halaman admin.html ---
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        // Jika kita di admin.html (ada form upload)
        setupAdminPage();
    }
});

// === FUNGSI ADMIN LOGIN ===
// Ini ditaruh di luar agar bisa diakses oleh tombol onclick
function goToAdminLogin() {
    const pin = prompt("Hanya Admin. Masukkan PIN Anda:", "");
    
    // PERHATIAN: Ini adalah login yang SANGAT TIDAK AMAN.
    // PIN '334466' bisa dilihat siapa saja.
    // Di website asli, PIN ini harus dicek oleh server (backend).
    
    if (pin === "334466") {
        alert("Login Berhasil! Mengarahkan ke Admin Panel...");
        window.location.href = "admin.html"; // Pindah ke halaman admin
    } else if (pin != null) {
        alert("PIN Salah. Akses Ditolak.");
    }
}


// === DATA SIMULASI (DATABASE PALSU) ===
// Di website asli, data ini datang dari database (Firebase, MySQL, dll)
const simulasiDatabase = [
    {
        id: "preset1",
        judul: "Preset Jedag Jedug Viral TikTok",
        link_xml: "https://link.com/file.xml",
        link_5mb: "https://link.com/file.5mb",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-small.mp4" // Contoh video
    },
    {
        id: "preset2",
        judul: "Preset Transisi Foto Estetik",
        link_xml: "https://link.com/file2.xml",
        link_5mb: "https://link.com/file2.5mb",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-woman-running-above-the-clouds-4240-small.mp4" // Contoh video
    },
    {
        id: "preset3",
        judul: "Preset Color Grading Sinematik",
        link_xml: "https://link.com/file3.xml",
        link_5mb: "https://link.com/file3.5mb",
        video_url: "https://assets.mixkit.co/videos/preview/mixkit-road-in-the-middle-of-a-forest-41540-small.mp4" // Contoh video
    }
];

// === FUNGSI UNTUK Halaman index.html ===
function loadPublicPresets() {
    const grid = document.getElementById('preset-grid');
    
    // Simulasi pengambilan data dari server (butuh 1 detik)
    setTimeout(() => {
        grid.innerHTML = ''; // Hapus tulisan "Memuat..."
        
        simulasiDatabase.forEach(preset => {
            const card = document.createElement('div');
            card.className = 'preset-card';
            
            card.innerHTML = `
                <video src="${preset.video_url}" muted autoplay loop playsinline alt="Preview ${preset.judul}"></video>
                <div class="card-content">
                    <h3>${preset.judul}</h3>
                    <div class="links">
                        <a href="${preset.link_xml}" class="link-button xml" target="_blank">🔗 Link XML</a>
                        <a href="${preset.link_5mb}" class="link-button mb5" target="_blank">📦 Link 5MB</a>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }, 1000); // Penundaan 1 detik
}

// === FUNGSI UNTUK Halaman admin.html ===
function setupAdminPage() {
    const form = document.getElementById('upload-form');
    const adminList = document.getElementById('admin-preset-list');

    // 1. Tampilkan daftar preset yang ada (untuk dihapus)
    adminList.innerHTML = ''; // Kosongkan dulu
    simulasiDatabase.forEach(preset => {
        const card = document.createElement('div');
        card.className = 'preset-card';
        card.innerHTML = `
            <video src="${preset.video_url}" muted autoplay loop playsinline alt="Preview ${preset.judul}"></video>
            <div class="card-content">
                <h3>${preset.judul}</h3>
                <button class="delete-button" onclick="simulasiHapus('${preset.id}')">Hapus Preset</button>
            </div>
        `;
        adminList.appendChild(card);
    });

    // 2. Tambahkan event listener untuk form upload
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Mencegah halaman refresh

        // Ambil data dari form
        const judul = e.target.judul.value;
        const link_xml = e.target.link_xml.value;
        const link_5mb = e.target.link_5mb.value;
        const video_file = e.target.video_preview.files[0];

        // Tampilkan pesan simulasi
        alert(`
            --- SIMULASI UPLOAD BERHASIL ---
            Judul: ${judul}
            Link XML: ${link_xml}
            Link 5MB: ${link_5mb}
            Nama File Video: ${video_file.name}
            
            Di website asli, file video akan di-upload ke server/storage
            dan semua info akan disimpan ke database.
        `);
        
        form.reset(); // Kosongkan form setelah submit
    });
}

// Fungsi simulasi hapus
function simulasiHapus(id) {
    if (confirm(`Apakah Anda yakin ingin menghapus preset dengan ID: ${id}?`)) {
        alert(`
            --- SIMULASI HAPUS BERHASIL ---
            Preset ${id} akan dihapus dari database oleh backend.
            Halaman ini akan me-refresh untuk melihat perubahan.
        `);
        // Di aplikasi nyata, Anda akan memanggil API hapus, lalu me-refresh daftar
        // location.reload(); 
    }
}
