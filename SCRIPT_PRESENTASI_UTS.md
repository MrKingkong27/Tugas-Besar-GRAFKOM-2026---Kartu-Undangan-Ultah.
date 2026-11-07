# PANDUAN BELAJAR & SCRIPT PRESENTASI UTS GRAFIKA KOMPUTER
**Proyek:** Kartu Undangan Interaktif Ulang Tahun Berbasis Pure Software Rasterizer (2D Canvas)  
**Standar Silabus:** Grafika Komputer 2D (DIP, Primitif Garis DDA/Bresenham, Lingkaran/Elips Midpoint, Transformasi 2D Homogen & Komposit, Kurva Parametrik Polar, Polygon & FloodFill)

> **PENEGASAN KEPATUHAN ATURAN TUGAS (100% MEMENUHI SYARAT):**  
> 1. **Tidak Ada Library 3D / WebGL:** Proyek ini **100% murni Grafika 2D**. Tidak menggunakan Three.js, Babylon.js, maupun WebGL context.  
> 2. **Tidak Ada Canvas Drawing API Built-In:** Tidak menggunakan `ctx.lineTo()`, `ctx.arc()`, `ctx.fill()`, atau `ctx.stroke()`.  
> 3. **Hanya Menggunakan Buffer Memori:** Seluruh piksel diproses mandiri melalui `Uint8ClampedArray` dan ditampilkan hanya menggunakan `getImageData` dan `putImageData`.  
> 4. **Seluruh Teori Berdasarkan Materi Kuliah:** Slide 01 (DIP), Slide 02 (Titik & Garis DDA/Bresenham), Slide 03 (Lingkaran, Elips, & Polar), Slide 05 (Transformasi 2D Homogen), dan Slide 06 (Transformasi Komposit).

---

## 🚀 TAUTAN & CARA MENJALANKAN (RUN) APLIKASI

Karena aplikasi ini menggunakan **JavaScript ES6 Module (`type="module"`)**, browser memerlukan protokol web (Local Server) untuk memuat modul file tanpa batasan keamanan CORS:

### 1. Tautan Publik Online (Bisa Diakses Siapa Saja 24/7 di HP/Laptop)
* **🌐 Link Live Demo Aplikasi (GitHub Pages):**  
  👉 **[https://kingz2472053.github.io/undangan-grafkom-2026/](https://kingz2472053.github.io/undangan-grafkom-2026/)**  
  *(Sudah aktif online 100%! Bisa langsung diklik dan dibuka oleh dosen/siapa saja tanpa menyalakan komputer)*

* **Repository Kode Sumber:**  
  👉 **[https://github.com/kingz2472053/undangan-grafkom-2026](https://github.com/kingz2472053/undangan-grafkom-2026)** atau **[https://github.com/MrKingkong27/Tugas-Besar-GRAFKOM-2026---Kartu-Undangan-Ultah.](https://github.com/MrKingkong27/Tugas-Besar-GRAFKOM-2026---Kartu-Undangan-Ultah.)**

### 2. Tautan Langsung & Eksekusi di VS Code (Lokal)
* **Ekstensi Live Server:**  
  Klik kanan pada file [index.html](file:///d:/Semester%205/GRAFKOM/undangan/index.html) $\to$ Pilih **"Open with Live Server"**.  
  Browser akan otomatis terbuka di tautan:  
  👉 **[http://localhost:5500/index.html](http://localhost:5500/index.html)** atau **[http://127.0.0.1:5500/index.html](http://127.0.0.1:5500/index.html)**

### 3. Menjalankan via Terminal (Lokal)
Buka terminal di folder project (`d:\Semester 5\GRAFKOM\undangan`) dan jalankan salah satu perintah berikut:
* **Menggunakan Python:**
  ```bash
  python -m http.server 8000
  ```
  Lalu buka di browser: 👉 **[http://localhost:8000](http://localhost:8000)**
* **Menggunakan Node.js / npx:**
  ```bash
  npx serve .
  ```
  Lalu buka tautan port yang muncul di terminal (biasanya **[http://localhost:3000](http://localhost:3000)**).

### 3. File Lokal
* Path Dokumen Utama: [index.html](file:///d:/Semester%205/GRAFKOM/undangan/index.html)
* Stylesheet: [style.css](file:///d:/Semester%205/GRAFKOM/undangan/style.css)
* Entry Script: [main.js](file:///d:/Semester%205/GRAFKOM/undangan/js/main.js)

---

## 1. STRUKTUR PEMBAGIAN TIM & MATERI (4 ORANG)

Pembagian dibagi secara seimbang mencakup teori grafika komputer 2D, implementasi kode program, serta kesiapan menghadapi pertanyaan kritis dosen:

| Anggota | Peran / Topik Utama | Modul / File Kode Utama | Bobot Teori & Praktik |
| :--- | :--- | :--- | :--- |
| **Anggota 1** | **Moderator, Pipeline Grafika & Framebuffer** | `main.js`, `Canvas.js`, `Teks.js` | Tujuan & Alasan Proyek, Arsitektur Software Rasterizer, Framebuffer 1D, Typography Rasterizer |
| **Anggota 2** | **Aljabar Linier, Matriks 2D & Image Blitting** | `Matriks.js`, `Transformasi.js`, `Blit.js` | Matriks Homogen 3x3, Transformasi Komposit ($M = T \cdot S \cdot T^{-1}$), Inverse Mapping |
| **Anggota 3** | **Algoritma Primitif & Poligon / FloodFill** | `Primitif.js`, `Parametrik.js`, `Poligon.js` | DDA vs Bresenham, Midpoint Circle 8-Oktan, Kurva Parametrik Polar (Cardioid & Mawar), Stack-Based FloodFill |
| **Anggota 4** | **State Machine, Model Lilin & Interaktivitas** | `Undangan.js`, `Kartu.js`, `Partikel.js`, `GUI.js` | FSM 5 Fase, Silinder Volumetrik 2D & Shading Gradasi (DIP), Api Parametrik Berkedip, Fisika Partikel Euler |

---

## 2. MODUL ANGGOTA 1: TUJUAN, ARSITEKTUR PIPELINE & FRAMEBUFFER

### A. Materi Pembelajaran & Konsep Dasar
1. **Tujuan Proyek:**
   - **Tujuan Akademik:** Membuktikan pemahaman fundamental grafika komputer 2D level rendah (*low-level computer graphics*) tanpa bantuan pustaka rendering bawaan (*no high-level engine*). Mahasiswa memanipulasi susunan bit/byte warna secara langsung pada memori frame buffer.
   - **Tujuan Aplikasi:** Menghasilkan media kartu undangan digital interaktif modern berbasis web yang memadukan estetika visual (animasi amplop terbuka, kartu bergeser naik, kue tart dan lilin menyala, semburan balon & konfeti) dengan efisiensi komputasi algoritma klasik grafika komputer 2D.
2. **Alasan Teknis & Filosofi Pemilihan Arsitektur:**
   - **Mengapa Pure Software Rasterizer?** Canvas 2D API modern menyediakan fungsi tingkat tinggi seperti `ctx.arc()`, `ctx.lineTo()`, atau `ctx.fill()`. Namun, fungsi tersebut merupakan "kotak hitam" (*black box*) yang menyembunyikan kalkulasi aljabar dan rasterisasi piksel. Dengan memanfaatkan hanya `getImageData` dan `putImageData`, kita membangun sendiri *Graphics Processing Pipeline* dari tingkat dasar: *Vertex $\to$ Transform $\to$ Rasterize $\to$ Pixel Buffer*.
   - **Mengapa Arsitektur Modular (ES6 Module)?** Pemisahan file modular (`Canvas.js`, `Matriks.js`, `Primitif.js`, dsb.) mencegah *spaghetti code*, memudahkan pembagian tugas tim, serta mengisolasi tanggung jawab tiap algoritma sesuai materi perkuliahan.
3. **Mekanisme Linear Framebuffer (1D Array Indexing):**
   - Layar berupa matriks 2D berukuran $W \times H$. Namun, memori komputer menyimpannya sebagai array satu dimensi (`Uint8ClampedArray`) dengan urutan komponen warna RGBA:
     $$\text{Index} = (x + y \times \text{width}) \times 4$$
     - `data[Index + 0] = Red (0-255)`
     - `data[Index + 1] = Green (0-255)`
     - `data[Index + 2] = Blue (0-255)`
     - `data[Index + 3] = Alpha (0-255)`
4. **Rasterisasi Teks (`Teks.js`):**
   - Menggunakan offscreen buffer terisolasi hanya untuk mengubah karakter teks menjadi representasi biner raster piksel, kemudian ditransfer ke framebuffer utama secara manual per piksel tanpa memanggil fungsi gambar canvas utama.

---

### B. Script Presentasi Anggota 1 (Durasi: ±3 Menit)

> **[CUE: Berdiri tegap, buka presentasi, tunjukkan slide pembuka dan aplikasi web]**  
> *"Selamat pagi/siang Bapak/Ibu Dosen penguji dan rekan-rekan sekalian. Kami dari kelompok [Nama Kelompok] akan mempresentasikan proyek tugas besar Grafika Komputer: **Aplikasi Kartu Undangan Interaktif Berbasis Pure Software Rasterizer 2D**.*  
>  
> *Sebelum masuk ke teknis, saya ingin menjelaskan **tujuan dan alasan utama** mengapa kami memilih proyek ini:*  
> *Pertama, **tujuannya** adalah menciptakan sebuah pengalaman undangan digital interaktif di mana pengguna tidak hanya melihat gambar statis, melainkan dapat berinteraksi membuka amplop, membaca kartu perayaan, melihat kue ulang tahun dengan lilin beranimasi dinamis, dan meletuskan balon serta konfeti secara real-time.*  
> *Kedua, **alasan teknisnya**, kami membuktikan bahwa seluruh efek visual ini dibangun secara murni menggunakan konsep fundamental grafika komputer 2D. Sesuai instruksi tugas, kami **sama sekali tidak menggunakan fungsi gambar built-in HTML5 Canvas** seperti `ctx.lineTo`, `ctx.arc`, atau `ctx.fill`, dan **tidak menggunakan WebGL atau library 3D eksternal**. Satu-satunya API Canvas yang kami gunakan hanyalah `getImageData` dan `putImageData` sebagai jembatan memori display buffer.*  
>  
> *Arsitektur program kami bagi ke dalam modul-modul Javascript ES6 yang terstruktur rapi. Komponen intinya ada pada class `Canvas` di file `Canvas.js`. Layar beresolusi $W \times H$ dikelola dalam array memori satu dimensi berformat RGBA. Untuk menulis warna pada koordinat $(x, y)$, kami mengimplementasikan pemetaan matematis:*  
> $$\text{Index} = (x + y \times \text{width}) \times 4$$  
> *Di modul `Teks.js`, kami merasterisasi teks menjadi matriks piksel secara offscreen lalu mentransfer susunan piksel tersebut langsung ke dalam framebuffer utama.*  
>  
> *Selanjutnya, bagaimana koordinat dan objek dalam aplikasi ini diposisikan, dirotasi, dan dianimasikan melalui perhitungan matriks homogen akan dijelaskan oleh rekan saya, [Nama Anggota 2]. Silakan."*

---

### C. Pertanyaan Kritis Dosen & Jawaban Ilmiah (Anggota 1)

* **Tanya 1: Mengapa kalian mengalikan koordinat dengan 4 pada rumus indeks framebuffer?**  
  *Jawaban:* "Karena setiap piksel pada `ImageData` diwakili oleh 4 byte data berurutan, yaitu Red, Green, Blue, dan Alpha (RGBA). Setiap channel bernilai 8-bit unsigned integer (0–255)."
* **Tanya 2: Mengapa tidak langsung memanggil `ctx.fillText()` pada canvas utama?**  
  *Jawaban:* "Karena ketentuan tugas melarang pemakaian fitur visual built-in Canvas. Kami mematuhi prinsip *pure rasterizer* di mana canvas utama murni berfungsi sebagai display surface untuk menerima raw pixel buffer via `putImageData`."

---

## 3. MODUL ANGGOTA 2: ALJABAR LINIER, TRANSFORMASI 2D & BLITTING

### A. Materi Pembelajaran & Konsep Dasar
1. **Representasi Koordinat Homogen ($3 \times 3$):**
   - Koordinat Kartesius 2D $(x, y)$ direpresentasikan sebagai vektor kolom 3D: $\begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$.
   - **Tujuan:** Sesuai materi Slide 05, ini memungkinkan operasi translasi (pergeseran) dapat dinyatakan sebagai perkalian matriks, sehingga translasi, rotasi, dan skala dapat digabung (*composite*) menjadi satu matriks transformasi tunggal.
2. **Matriks Transformasi Dasar 2D:**
   - **Translasi ($T$):** $\begin{bmatrix} 1 & 0 & dx \\ 0 & 1 & dy \\ 0 & 0 & 1 \end{bmatrix}$
   - **Skala ($S$):** $\begin{bmatrix} sx & 0 & 0 \\ 0 & sy & 0 \\ 0 & 0 & 1 \end{bmatrix}$
   - **Rotasi ($R$):** $\begin{bmatrix} \cos\theta & -\sin\theta & 0 \\ \sin\theta & \cos\theta & 0 \\ 0 & 0 & 1 \end{bmatrix}$
3. **Transformasi Komposit Terhadap Titik Pivot Tertentu ($M = T \cdot S \cdot T^{-1}$):**
   - Sesuai materi Slide 06 (Composite Transformation), digunakan pada penutup amplop saat membuka dan melipat. Agar penutup amplop melipat tepat pada garis lipatan atas ($y = y_0$), kita tidak boleh menskalakan terhadap titik origin $(0,0)$.
   - Tahapannya: Geser pivot ke origin ($T^{-1}$), lakukan scaling sumbu Y ($S_y$), lalu kembalikan pivot ke posisi semula ($T$).
4. **Sifat Non-Komutatif Perkalian Matriks:**
   - $A \times B \neq B \times A$. Urutan perkalian sangat krusial; operasi yang dilakukan pertama kali dikalikan dari sisi paling kanan terhadap vektor posisi: $v' = M \cdot v$.
5. **Inverse Mapping Blit (`Blit.js`):**
   - Saat merender gambar atau sprite yang mengalami rotasi/skala, perulangan dilakukan pada piksel tujuan (destination pixels) yang dipetakan mundur menggunakan matriks invers ($M^{-1}$) ke koordinat sumber (source coordinates). Hal ini mencegah terjadinya celah kosong (*pixel holes/aliasing gap*).

---

### B. Script Presentasi Anggota 2 (Durasi: ±3 Menit)

> **[CUE: Berdiri, tampilkan diagram matriks atau file `Matriks.js` dan `Transformasi.js`]**  
> *"Terima kasih [Nama Anggota 1]. Saya [Nama Anggota 2] akan menjelaskan bagaimana aspek aljabar linier dan transformasi 2D diterapkan pada proyek ini.*  
>  
> *Semua entitas visual yang bergerak, berputar, membesar, atau melipat dikendalikan oleh matriks homogen 2D berukuran $3 \times 3$ yang kami definisikan di `Matriks.js`. Sesuai materi kuliah Slide 05, koordinat homogen digunakan agar operasi translasi linier dapat diubah menjadi operasi perkalian matriks, sehingga dapat digabung secara komposit dengan rotasi dan penskalaan.*  
>  
> *Salah satu implementasi transformasi paling krusial ada pada animasi pembukaan flap penutup amplop surat di `Undangan.js`. Sesuai konsep Slide 06 tentang Fixed-Point Transformation, agar flap amplop tampak melipat secara natural ke atas, flap harus mengalami skala pada sumbu Y ($S_y$) terhadap garis engsel lipatannya, bukan terhadap titik $(0,0)$ layar. Untuk itu, kami menggunakan rumus transformasi komposit:*  
> $$M = T(x_p, y_p) \times S(1, s) \times T(-x_p, -y_p)$$  
> *Kami juga sangat memperhatikan sifat **non-komutatif** perkalian matriks, di mana urutan operasi perkalian tidak boleh tertukar karena akan menghasilkan posisi visual yang keliru.*  
>  
> *Selain itu, pada modul `Blit.js`, kami menerapkan metode **Inverse Mapping**. Ketika mentransfer piksel dari offscreen buffer ke canvas utama di bawah pengaruh matriks transformasi, kita melacak piksel tujuan kembali ke piksel sumber dengan mengalikan matriks invers. Ini menjamin tidak adanya celah kosong atau lubang piksel yang biasanya muncul jika menggunakan forward mapping biasa.*  
>  
> *Selanjutnya, bagaimana garis, lingkaran, kurva dekoratif, dan pewarnaan poligon digambar piksel demi piksel akan dijelaskan oleh rekan saya, [Nama Anggota 3]."*

---

### C. Pertanyaan Kritis Dosen & Jawaban Ilmiah (Anggota 2)

* **Tanya 1: Mengapa kalian memilih Inverse Mapping dibanding Forward Mapping saat memetakan piksel?**  
  *Jawaban:* "Forward mapping memetakan $(x, y)$ sumber ke $(x', y')$ tujuan yang sering menghasilkan bilangan desimal. Ketika dibulatkan ke integer, ada piksel tujuan yang terlewati sehingga gambar berlubang (*holes*). Inverse mapping menjamin setiap piksel pada kanvas tujuan pasti memiliki pasangan sampel dari gambar asal."
* **Tanya 2: Mengapa matriks harus dikalikan dari kanan ke kiri?**  
  *Jawaban:* "Karena vektor posisi berupa vektor kolom $v = [x, y, 1]^T$. Jika transformasi pertama adalah $A$ lalu $B$, maka secara aljabar ditulis $v' = B \times (A \times v) = (B \times A) \times v$."

---

## 4. MODUL ANGGOTA 3: ALGORITMA PRIMITIF, KURVA PARAMETRIK & FLOODFILL

### A. Materi Pembelajaran & Konsep Dasar
1. **Algoritma Garis: DDA vs Bresenham (`Primitif.js`):**
   - **DDA (Digital Differential Analyzer - Slide 02):** Menghitung step $\Delta x$ dan $\Delta y$ menggunakan bilangan pecahan floating-point (`x += xInc; y += yInc`). Membutuhkan pembulatan `Math.round()`.
   - **Bresenham Line (Slide 02):** Menggunakan parameter keputusan bilangan bulat (*integer decision parameter* $p_k = 2\Delta y - \Delta x$) tanpa perkalian atau pembagian pecahan. Sangat efisien dan presisi matematis.
2. **Midpoint Circle Algorithm & Simetri 8-Oktan (Slide 03):**
   - Menghitung satu oktan ($0 \le y \le x$), lalu merefleksikan piksel ke 7 oktan lainnya:
     $$(x, y), (y, x), (-x, y), (-y, x), (-x, -y), (-y, -x), (x, -y), (y, -x)$$
   - Menggunakan parameter keputusan integer $p_0 = 1 - r$.
3. **Kurva Parametrik Polar (Slide 03):**
   - **Cardioid (Bentuk Hati / Segel Amplop):**
     $$r(\theta) = a(1 - \cos\theta)$$
   - **Rose Curve (Rhodonea / Pita Penghargaan Emas):**
     $$r(\theta) = a \cdot \cos(k\theta)$$
     Menghasilkan kelopak simetris murni dari persamaan trigonometri polar.
4. **Stack-Based FloodFill (`Poligon.js`):**
   - Menggantikan rekursi biasa dengan antrian tumpukan (*explicit array stack*).
   - **Alasan Fatal:** Rekursi biasa pada resolusi $500 \times 650$ piksel akan menyebabkan **Maximum Call Stack Size Exceeded (Stack Overflow)** karena kedalaman pemanggilan fungsi mencapai puluhan ribu kali. Array stack pada memori heap mencegah crash browser.

---

### B. Script Presentasi Anggota 3 (Durasi: ±3 Menit)

> **[CUE: Tunjukkan kode `Primitif.js` dan bagian pita, segel amplop, dan hiasan kartu]**  
> *"Terima kasih [Nama Anggota 2]. Saya [Nama Anggota 3] akan menjelaskan fondasi algoritma primitif, kurva parametrik, dan pewarnaan poligon.*  
>  
> *Semua bentuk geometris yang tampak di layar dibuat menggunakan algoritma dasar grafika komputer 2D:*  
> *1. Untuk garis pembatas kartu dan pita banner, kami mengimplementasikan **Bresenham Line Algorithm** dan **DDA** sesuai materi Slide 02. Pada Bresenham, kami menggunakan variabel keputusan integer murni sehingga komputasi per piksel hanya melibatkan penambahan dan pengurangan integer tanpa floating-point.*  
> *2. Untuk balon dan stempel segel, kami menggunakan **Midpoint Circle Algorithm** dari Slide 03. Algoritma ini hanya menghitung koordinat pada 1 oktan ($45^\circ$) lalu merefleksikannya secara simetris ke 8 oktan sekaligus, sehingga efisiensi komputasi meningkat drastis.*  
>  
> *3. Selain primitif standar, kami mengimplementasikan kurva parametrik polar pada `Parametrik.js`. Segel hati pada amplop digambar menggunakan persamaan polar **Cardioid**, sedangkan stempel roda pita emas di kartu digambar menggunakan persamaan polar **Rose Curve** ($r = a \cos(k\theta)$).*  
>  
> *4. Bagian yang sangat krusial adalah pewarnaan bidang pada `Poligon.js`. Kami mengimplementasikan algoritma **FloodFill 4-Connected**. Di sini kami secara sadar **tidak menggunakan rekursi fungsi**, melainkan menggunakan **Stack berbasis struktur data Array**.*  
> *Mengapa? Karena rekursi pada kanvas ukuran $500 \times 650$ piksel akan langsung menabrak batas memori JavaScript dan memicu error fatal `Stack Overflow`. Dengan stack eksplisit di heap memory, algoritma dapat mewarnai seluruh area poligon kompleks dengan cepat, stabil, dan aman.*  
>  
> *Selanjutnya, bagaimana seluruh komponen ini dihidupkan dalam siklus animasi, rendering lilin bergradasi, dan interaktivitas pengguna akan dijelaskan oleh [Nama Anggota 4]."*

---

### C. Pertanyaan Kritis Dosen & Jawaban Ilmiah (Anggota 3)

* **Tanya 1: Mengapa algoritma rekursif FloodFill berbahaya di lingkungan browser?**  
  *Jawaban:* "Call stack engine V8 JavaScript dibatasi sekitar 10.000 level pemanggilan fungsi. Jika area gambar memiliki luas 50.000 piksel, rekursi fungsi pasti melempar `RangeError: Maximum call stack size exceeded`. Menggunakan *explicit array stack* memindahkan beban memori dari call stack ke memori heap yang kapasitasnya jauh lebih besar."
* **Tanya 2: Mengapa Midpoint Circle menggunakan 8 oktan simetri sedangkan elips hanya 4 kuadran?**  
  *Jawaban:* "Lingkaran memiliki jari-jari seragam di semua arah sehingga simetris terhadap sumbu $x$, $y$, dan garis diagonal $y = x$. Sedangkan elips memiliki jari-jari berbeda ($r_x \ne r_y$), sehingga kelengkungannya tidak simetris terhadap garis diagonal, hanya simetris terhadap sumbu horizontal dan vertikal (4 kuadran)."

---

## 5. MODUL ANGGOTA 4: STATE MACHINE, RENDERING LILIN & INTERAKTIVITAS

### A. Materi Pembelajaran & Konsep Dasar
1. **Finite State Machine (FSM) 5 Fase (`Undangan.js`):**
   - `JATUH`: Amplop bergerak turun dari atas kanvas diiringi percepatan gravitasi linear ($y = y + v_y$).
   - `MENDARAT`: Animasi squish & squash saat menyentuh bagian tengah kanvas.
   - `BUKA`: Flap atas amplop melipat ke belakang menggunakan scaling matriks komposit.
   - `NAIK`: Lembaran kartu bergeser ke atas keluar dari dalam kantung amplop.
   - `PENUH`: Kartu membesar mengisi tampilan utama dengan ornamen lengkap, kue tart, lilin menyala, dan siap menerima interaksi pengguna.
2. **Rendering Lilin & Kue Volumetrik 2D dengan Shading Gradasi (DIP & Garis DDA):**
   - **TIDAK MENGGUNAKAN 3D ENGINE:** Lilin dan kue dibangun murni menggunakan primitif 2D yang diajarkan:
     - Tutup dan dasar kue/lilin menggunakan **Elips 2D** (`Bentuk.elips`).
     - Badan kue dan lilin menggunakan garis-garis vertikal **DDA Line** yang digambar kolom demi kolom.
   - **Shading Gradasi Warna (Materi Intro to DIP):**
     Nilai intensitas warna RGB dimodulasi per kolom $x$ untuk menghasilkan efek kedalaman silindris (*curved surface gradient*):
     $$\text{Warna}(x) = \text{WarnaDasar} + \text{Faktor}(x) \times \text{Highlight}$$
     Ini menghasilkan bayangan redup di tepi kiri-kanan dan garis kilau terang di bagian tengah, murni menggunakan komputasi piksel 2D.
3. **Animasi Api Lilin Berkedip Dinamis (Harmonic Time Functions):**
   - Bentuk api dimodelkan dengan kurva polar **Cardioid / Teardrop** (`Bentuk.cardioid`).
   - Nyala api beranimasi dinamis menggunakan fungsi harmonik trigonometri waktu nyata:
     - Goyangan horizontal: $x_{\text{api}} = x_{\text{sumbu}} + 1.0 \cdot \sin(18t) + 0.5 \cdot \cos(27t)$
     - Denyut kembang-kempis: $r_{\text{api}} = 3.5 + 0.4 \cdot \sin(14t)$
     - Percikan api (*spark/ember*) dan pendaran halo cahaya dihitung periodik.
4. **Sistem Partikel Fisika Euler 2D (`Partikel.js`):**
   - Menangani balon terbang dan konfeti perayaan saat tombol GUI atau tombol keyboard ditekan.
   - Menggunakan integrasi Euler 2D sederhana: $\vec{v} \leftarrow \vec{v} + \vec{g} \cdot \Delta t$ dan $\vec{r} \leftarrow \vec{r} + \vec{v} \cdot \Delta t$.

---

### B. Script Presentasi Anggota 4 (Durasi: ±3 Menit)

> **[CUE: Demonstrasikan aplikasi langsung, buka undangan, tunjukkan kue & lilin yang menyala, tekan balon dan konfeti]**  
> *"Terima kasih [Nama Anggota 3]. Saya [Nama Anggota 4] akan menjelaskan logika State Machine, rendering lilin bergradasi warna, sistem partikel, dan interaktivitas aplikasi.*  
>  
> *Aplikasi ini bekerja menggunakan **Finite State Machine (FSM)** yang mengatur alur animasi secara deterministik melalui 5 fase:*  
> *1. Fase **JATUH** — Amplop bergerak turun dari atas dengan percepatan linear.*  
> *2. Fase **MENDARAT** — Terjadi efek elastis saat amplop berhenti di titik tengah.*  
> *3. Fase **BUKA** — Flap penutup atas amplop membuka ke belakang melalui matriks komposit.*  
> *4. Fase **NAIK** — Kartu undangan terdorong keluar dari dalam amplop.*  
> *5. Fase **PENUH** — Kartu mengembang penuh ke tengah layar menampilkan kue ulang tahun berornamen lengkap.*  
>  
> *Pada bagian kue ulang tahun dan lilin, kami **tidak menggunakan library 3D atau WebGL sama sekali**. Sesuai materi kuliah, efek kedalaman silindris kue dan lilin dibangun murni dari kombinasi **Elips 2D** untuk penampang atas/bawah, serta garis vertikal **DDA Line** yang digambar kolom demi kolom dengan **shading gradasi warna (DIP)**. Warna di tepi dibuat lebih gelap dan di bagian tengah diberi highlight kilau terang.*  
>  
> *Untuk nyala api lilin, kami memanfaatkan kurva polar **Cardioid** yang dianimasikan secara dinamis menggunakan **fungsi harmonik sinus dan kosinus** terhadap waktu clock frame. Ini menghasilkan gerakan api yang meliuk dan berkedip secara natural.*  
>  
> *Terakhir, untuk aspek interaktivitas, kami menyediakan tombol GUI dan event keyboard. Saat tombol reaksi balon atau konfeti ditekan, sistem partikel pada `Partikel.js` mengkalkulasi gerak fisika partikel 2D menggunakan integrasi Euler secara real-time.*  
>  
> *Dengan demikian, seluruh ketentuan tugas UTS—mulai dari ketiadaan fungsi bawaan canvas, penerapan modul JavaScript, animasi, interaktivitas, poligon & floodfill, hingga materi transformasi 2D dan kurva parametrik—telah terimplementasi secara lengkap, murni, dan sesuai silabus perkuliahan. Terima kasih, kami persilakan jika ada pertanyaan dari Bapak/Ibu Dosen."*

---

### C. Pertanyaan Kritis Dosen & Jawaban Ilmiah (Anggota 4)

* **Tanya 1: Apakah kalian menggunakan WebGL atau library 3D untuk menggambar kue dan lilin?**  
  *Jawaban:* "Sama sekali tidak, Pak/Bu. Proyek kami 100% 2D Graphics. Kue dan lilin digambar murni menggunakan Elips 2D untuk penampang, dipadukan dengan garis DDA vertikal per piksel yang diberi modulasi nilai RGB (DIP shading) untuk menghasilkan efek gradasi permukaan melengkung."
* **Tanya 2: Mengapa sistem partikel menggunakan integrasi Euler?**  
  *Jawaban:* "Integrasi Euler 2D ($\vec{v} \leftarrow \vec{v} + \vec{g} \cdot \Delta t$ dan $\vec{r} \leftarrow \vec{r} + \vec{v} \cdot \Delta t$) sangat ringan dan cepat dihitung pada CPU per frame, sehingga animasi puluhan partikel balon dan konfeti tetap berjalan lancar pada 60 FPS tanpa menurunkan performa rasterizer."

---

## 6. TABEL RANGKUMAN CEPAT UNTUK PENGUASAAN TIM

| Pertanyaan Penguji | Konsep Materi Terkait | Jawaban Singkat & Tegas |
| :--- | :--- | :--- |
| *Apakah proyek ini pakai library 3D?* | Kepatuhan Aturan | "Tidak sama sekali. 100% Grafika 2D berbasis DDA, Elips Midpoint, dan Manipulasi Piksel RGBA." |
| *Mengapa tidak pakai canvas `stroke()`?* | Framebuffer & DIP | "Karena kami membangun pure software rasterizer; canvas hanya menerima piksel final melalui `putImageData`." |
| *Kenapa matriks 2D ukurannya $3 \times 3$?* | Koordinat Homogen (Slide 05) | "Supaya translasi linear bisa direpresentasikan sebagai perkalian matriks, memungkinkan penggabungan komposit ($T \cdot R \cdot S$)." |
| *Kenapa tidak rekursi biasa di FloodFill?* | Stack vs Call Stack | "Mencegah error fatal browser `Maximum call stack size exceeded` dengan memanfaatkan tumpukan array di memori heap." |
| *Bagaimana api lilin bisa beranimasi dinamis?* | Kurva Parametrik & Harmonik | "Bentuk dasar dihitung dari kurva polar Cardioid yang dimodulasi fungsi sinus/kosinus terhadap waktu nyata." |
| *Bagaimana teks bisa muncul tanpa font HTML?* | Rasterisasi Bitmap | "Teks dirasterisasi secara offscreen ke buffer sementara lalu ditransfer piksel demi piksel ke framebuffer utama." |

---
*Dokumen ini 100% sesuai dengan Silabus UTS Grafika Komputer 2D.*
