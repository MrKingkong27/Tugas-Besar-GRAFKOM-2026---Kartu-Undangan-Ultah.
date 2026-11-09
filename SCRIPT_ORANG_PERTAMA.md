# SCRIPT & PANDUAN LENGKAP: ORANG PERTAMA (PEMBUKA & PIPELINE BUFFER)

**Peran:** Moderator Pembuka, Penjelas Latar Belakang & Tujuan, Arsitek Pipeline Software Rasterizer  
**Alokasi Waktu:** ± 3 – 4 Menit  
**File Kode yang Dikuasai:** `main.js`, `js/lib/Graflib.js` (`draw_dot`, `get_dot`, array buffer), dan `js/gfx/Teks.js`

---

## 1. PANDUAN SIKAP & STRATEGI PENYAMPAIAN (CUE)
* **Sikap Tubuh:** Berdiri tegak di sisi proyektor/layar, pandangan menyapu ke dosen penguji dan rekan sekelas secara percaya diri.
* **Intonasi:** Buka dengan nada suara yang tegas, antusias, dan terstruktur. Jangan terburu-buru.
* **Alur Berpikir (Mind Map):**
  1. *Salam & Perkenalan* (Siapa kita).
  2. *Topik & Demo Sekilas* (Apa produknya).
  3. *Tujuan & Urgensi Ilmiah* (Mengapa memilih ini & kenapa tidak pakai library instan).
  4. *Arsitektur Low-Level* (Bagaimana piksel diatur di memori: linear 1D buffer RGBA).
  5. *Pembagian Tim & Transisi* (Oper estafet ke Anggota 2).

---

## 2. NASKAH LENGKAP KATA DEMI KATA (VERBATIM SCRIPT)

> ### [BAGIAN 1: PEMBUKAAN & PERKENALAN] *(Durasi: ~30 detik)*
> 
> *"Selamat pagi/siang Bapak/Ibu Dosen Penguji serta rekan-rekan sekalian.*  
> *Kami dari kelompok [Sebutkan Nama Kelompok / Nomor Kelompok], yang beranggotakan:*  
> *1. Saya sendiri, [Nama Anda], sebagai pembicara pertama,*  
> *2. Rekan saya [Nama Anggota 2],*  
> *3. Rekan saya [Nama Anggota 3], dan*  
> *4. Rekan saya [Nama Anggota 4].*  
> 
> *Pada kesempatan UTS Grafika Komputer kali ini, kami mempersembahkan proyek tugas besar kami yang berjudul: **Kartu Undangan Ulang Tahun Interaktif Berbasis Pure Software Rasterizer 2D**."*

---

> ### [BAGIAN 2: LATAR BELAKANG, TUJUAN & ALASAN PEMILIHAN TEMA] *(Durasi: ~60 detik)*
> 
> *"Sebelum rekan-rekan saya membedah rumus matematis dan algoritmanya, izinkan saya menjelaskan **latar belakang, tujuan, dan alasan fundamental** mengapa kami memilih proyek ini.*  
> 
> *Secara fungsional, **tujuan aplikasi ini** adalah mengubah paradigma kartu undangan digital yang biasanya hanya berupa gambar statis atau video berulang, menjadi sebuah aplikasi grafika interaktif real-time. Pengguna dapat berinteraksi membuka amplop, membaca kartu perayaan yang dipersonalisasi, melihat lilin kue yang menyala dinamis, hingga meletuskan balon dan konfeti perayaan.*  
> 
> *Namun yang terpenting adalah **tujuan dan alasan akademisnya**.*  
> *Di era web modern, sangat mudah membuat animasi menggunakan library instan seperti Three.js, p5.js, atau Canvas 2D API bawaan seperti `ctx.arc()`, `ctx.lineTo()`, dan `ctx.fill()`. Tetapi fungsi-fungsi tersebut adalah **black box**—semua proses pembentukan garis, lingkaran, dan pewarnaan ditangani otomatis oleh browser tanpa mahasiswa memahami proses pembentukan citra di baliknya.*  
> 
> *Sesuai instruksi dan silabus UTS Grafika Komputer, proyek kami dibangun dengan filosofi **Pure Software Rasterizer**. Kami **100% TIDAK MENGGUNAKAN** fungsi gambar bawaan Canvas, dan **TIDAK MENGGUNAKAN** WebGL atau library pihak ketiga apa pun. Satu-satunya fungsi Canvas yang kami gunakan adalah `getImageData` untuk mengalokasikan array memori piksel, dan `putImageData` untuk menempelkan hasil akhir ke layar."*

---

> ### [BAGIAN 3: PIPELINE GRAFIKA & MEKANISME FRAMEBUFFER 1D] *(Durasi: ~90 detik)*
> 
> **[CUE: Arahkan pointer/tangan ke slide arsitektur atau buka file `js/lib/Graflib.js` dan `main.js`]**  
> 
> *"Sekarang, bagaimana seluruh visual ini bisa tergambar di layar?*  
> *Inilah inti dari tanggung jawab modul yang saya bawakan di file `main.js` dan `Graflib.js`.*  
> 
> *Layar canvas berukuran $800 \times 560$ piksel. Secara logika manusia, layar adalah matriks 2 dimensi berkoordinat $(x, y)$. Namun, memori komputer pada `ImageData` menyimpannya sebagai array linear 1 dimensi bertipe `Uint8ClampedArray`.*  
> *Karena setiap piksel layar tersusun atas 4 komponen warna berurutan, yaitu **Red, Green, Blue, dan Alpha (RGBA)** berukuran 8-bit, maka untuk mewarnai satu titik koordinat $(x, y)$, kami mengimplementasikan pemetaan indeks memori klasik dari materi **Intro to Digital Image Processing**:*  
> 
> $$\text{Index} = 4 \times (x + y \times \text{lebar\_canvas})$$  
> 
> *Pada fungsi `draw_dot(x, y, color)` di `Graflib.js`:*  
> - *Indeks pertama adalah komponen **Merah (Red)**,*  
> - *Indeks plus satu adalah **Hijau (Green)**,*  
> - *Indeks plus dua adalah **Biru (Blue)**, dan*  
> - *Indeks plus tiga adalah **Alpha (Transparansi)** yang kami set penuh ke nilai 255.*  
> 
> *Fungsi `draw_dot` inilah atom paling dasar dari aplikasi kami. Seluruh garis, kurva polar, bayangan, kue, lilin, dan poligon di aplikasi ini pada akhirnya diturunkan menjadi ribuan pemanggilan `draw_dot` per detiknya.*  
> 
> *Lalu bagaimana dengan teks di kartu undangan?*  
> *Di file `Teks.js`, kami tidak memanggil `ctx.fillText()` pada canvas utama. Kami merasterisasi teks ke buffer offscreen kecil, mengambil bit-bit warnanya, lalu mentransfer susunan piksel teks tersebut ke framebuffer utama secara manual.*  
> 
> *Seluruh siklus ini diikat dalam siklus `requestAnimationFrame` pada `main.js`, di mana data piksel diproses di CPU lalu dikirimkan ke layar pada kecepatan 60 Frame Per Second."*

---

> ### [BAGIAN 4: TRANSISI KE PEMBICARA KE-2] *(Durasi: ~20 detik)*
> 
> **[CUE: Hadapkan badan ke arah Anggota 2 dengan gestur mempersilakan]**  
> 
> *"Dengan fondasi framebuffer dan rasterizer piksel yang sudah siap, pertanyaan berikutnya adalah: **bagaimana objek-objek grafika seperti amplop dan kartu dapat berpindah posisi, berputar, membesar, dan melipat secara presisi?***  
> 
> *Bagian matematis mengenai representasi koordinat homogen dan transformasi komposit 2D ini akan dibahas secara mendalam oleh rekan saya, **[Nama Anggota 2]**. Kepada [Nama Anggota 2], saya persilakan."*

---

## 3. BEDAH KODE WAJIB HAFAL (BAGIAN ORANG PERTAMA)

Jika dosen meminta Anda membuka kode program di laptop, berikut adalah 3 blok kode utama yang menjadi tanggung jawab Anda:

### 1. `main.js` (Pipeline Loop Utama)
```javascript
let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

// 1. Ambil array memori mentah dari canvas (SATU-SATUNYA akses Canvas API)
const image_data = context.getImageData(0, 0, canvas_handler.width, canvas_handler.height);

// 2. Bungkus ke dalam instance Graphics Library kita
let lib = new Graflib(canvas_handler.width, canvas_handler.height, image_data);

function gambar() {
    latar.gambar(lib);      // Isi buffer dengan background
    undangan.gambar();      // Gambar amplop, kartu, lilin, dsb.
    context.putImageData(image_data, 0, 0); // Tempelkan buffer RGBA ke display
}
```
> **Penjelasan ke Dosen:** *"Di sini terlihat jelas bahwa seluruh penggambaran dilakukan di CPU pada objek `lib` (`image_data`). Canvas hanya berfungsi sebagai display output via `putImageData`."*

### 2. `Graflib.js` (`draw_dot` & Indexing Piksel)
```javascript
draw_dot(x, y, color) {
    if (x < 0 || x >= this.canvas_width || y < 0 || y >= this.canvas_height) return;
    if (this.clip != null) {
        if (x < this.clip.x1 || x >= this.clip.x2 || y < this.clip.y1 || y >= this.clip.y2) return;
    }
    let index = 4 * (x + (y * this.canvas_width));
    this.data[index] = color.r;
    this.data[index + 1] = color.g;
    this.data[index + 2] = color.b;
    this.data[index + 3] = 255;
}
```
> **Penjelasan ke Dosen:** *"Validasi `x < 0` dan `x >= width` serta pengecekan `clip` rectangle berfungsi sebagai boundary checking dan viewport clipping agar rendering kartu tidak menembus batas saku amplop. Pengalian 4 dilakukan karena setiap piksel terdiri dari format 4 channel: RGBA."*

### 3. `Teks.js` (Rasterisasi Teks Mandiri)
```javascript
static buat(teks, ukuran, warna, gaya, keluarga) {
    let kanvas = document.createElement("canvas");
    let ctx = kanvas.getContext("2d");
    // Rasterisasi karakter teks di offscreen buffer terisolasi
    ctx.fillText(teks, 4, tinggi / 2);
    // Kembalikan pixel buffer murni untuk di-blit manual ke kanvas utama
    return ctx.getImageData(0, 0, kanvas.width, kanvas.height);
}
```
> **Penjelasan ke Dosen:** *"Kanvas utama tetap steril dari fungsi gambar built-in. Teks dirasterisasi secara offscreen menjadi ImageData, lalu dimasukkan ke pipeline kanvas utama menggunakan modul blit buatan kami sendiri."*

---

## 4. BANK PERTANYAAN KRITIS DOSEN & JAWABAN ILMIAH

### Q1: *"Mengapa kalian memilih tema Kartu Undangan, bukan Game 2D atau Image Processing?"*
> **Jawaban Anda:**  
> *"Tema kartu undangan interaktif ini kami pilih karena merupakan perpaduan paling komprehensif untuk mendemonstrasikan **seluruh silabus UTS Grafika Komputer sekaligus**.  
> Di sini kami memerlukan:  
> 1. **Transformasi komposit & matriks homogen** untuk melipat amplop dan menggeser kartu,  
> 2. **Primitif garis DDA dan Bresenham** untuk bingkai dan pita,  
> 3. **Kurva polar Cardioid dan Rose Curve** untuk segel amplop dan nyala api lilin,  
> 4. **Algoritma FloodFill Stack** untuk pewarnaan bidang kartu dan balon, serta  
> 5. **Manipulasi intensitas piksel (DIP)** untuk gradasi shading silinder kue dan lilin.  
> Semua materi terintegrasi dalam satu skenario visual yang elegan dan interaktif."*

### Q2: *"Mengapa indeks memori harus dikalikan 4? Mengapa tidak langsung array 2D `data[y][x]`?"*
> **Jawaban Anda:**  
> *"Secara hardware, memori video (VRAM) dan arsitektur RAM komputer selalu dialokasikan secara linear berurutan (kontigu/flat array). Menyimpan sebagai array 1D (`Uint8ClampedArray`) jauh lebih cepat dalam traversal memori dan cache locality dibandingkan array of arrays 2D. Angka 4 merepresentasikan 4 byte per piksel: Byte 0 untuk Red, Byte 1 untuk Green, Byte 2 untuk Blue, dan Byte 3 untuk Alpha."*

### Q3: *"Apa bukti bahwa kalian tidak menggunakan fungsi built-in Canvas seperti `ctx.arc()` atau `ctx.lineTo()`?"*
> **Jawaban Anda:**  
> *"Dapat dicek langsung pada seluruh file di direktori `js/`. Canvas utama kami hanya memanggil `getImageData` di awal dan `putImageData` di akhir frame loop `main.js`. Seluruh lingkaran digambar melalui algoritma matematika diskrit Midpoint Circle dan Polar di `Graflib.js`, dan seluruh garis digambar dengan DDA dan Bresenham Line."*

### Q4: *"Kenapa proyek kalian dibagi ke dalam banyak file JS? Bukankah lebih mudah satu file saja?"*
> **Jawaban Anda:**  
> *"Kami menggunakan arsitektur modular ES6 (`import`/`export`) dan Object-Oriented Programming (Class). Tujuannya adalah menerapkan prinsip **Separation of Concerns (SoC)**: memisahkan pustaka matematika (`MatrixClass.js`), pustaka primitif grafika (`Graflib.js`), representasi entitas (`Amplop.js`, `Kartu.js`), dan state flow (`Undangan.js`). Hal ini mencegah spaghetti code, memudahkan kolaborasi 4 anggota tim, dan membuktikan penguasaan software engineering grafika komputer."*

---
*Dokumen ini siap dicetak atau dihafalkan sebagai panduan resmi pembuka presentasi UTS.*

