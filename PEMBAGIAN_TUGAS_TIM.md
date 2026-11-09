# DOKUMEN PEMBAGIAN TUGAS & KODINGAN TIM (4 ORANG)
**Proyek:** Kartu Undangan Ulang Tahun Interaktif Berbasis Pure Software Rasterizer 2D  
**Mata Kuliah:** Grafika Komputer — Tugas Besar UTS  

---

## 1. DIAGRAM ARSITEKTUR & PEMBAGIAN MODUL

Proyek dibagi secara adil dan merata ke dalam 4 pilar arsitektur grafika komputer:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          ARSITEKTUR & PEMBAGIAN TUGAS TIM (4 PILAR)                    │
├────────────────────┬────────────────────┬─────────────────────┬────────────────────────┤
│      ORANG 1       │      ORANG 2       │       ORANG 3       │        ORANG 4         │
│  (Setup & Frame-   │ (Aljabar Matriks   │ (Primitif, Kurva &  │  (FSM, Lilin Shading,  │
│   buffer Library)  │   & Blit Engine)   │ Polygon/FloodFill)  │  Partikel & Interaksi) │
├────────────────────┼────────────────────┼─────────────────────┼────────────────────────┤
│ • index.html       │ • MatrixClass.js   │ • Primitif Graflib  │ • Undangan.js (FSM)    │
│ • style.css        │ • Blit di Graflib  │ • Bentuk.js (Kurva) │ • Amplop.js & Kartu.js │
│ • main.js          │ • Easing.js        │ • Ikon.js           │ • Toolbar.js           │
│ • Buffer Graflib   │                    │ • Latar.js          │ • Partikel.js          │
│ • Teks.js          │                    │                     │                        │
└────────────────────┴────────────────────┴─────────────────────┴────────────────────────┘
```

---

## 2. TABEL RANGKUMAN PENGERJAAN & FILE KODINGAN

| Anggota | Peran Utama | Tugas Pengerjaan Nyata (Siapa Buat Apa) | File / Modul yang Dikerjakan | Kodingan Spesifik yang Wajib Diperlihatkan ke Dosen |
| :--- | :--- | :--- | :--- | :--- |
| **ORANG 1** | **Setup Halaman & Framebuffer Library** | Menyiapkan layout HTML/CSS, inisialisasi buffer canvas (`getImageData`/`putImageData`), loop 60 FPS, memori array 1D RGBA, dan rasterisasi teks. | • `index.html`<br>• `style.css`<br>• `js/main.js`<br>• `js/lib/Graflib.js` *(Buffer)*<br>• `js/gfx/Teks.js` | • `main.js`: Baris 9–13 & 48–52<br>• `Graflib.js`: Baris 21–28 (`draw_dot`)<br>• `Teks.js`: Baris 3–19 |
| **ORANG 2** | **Aljabar Matriks 2D & Image Blitting** | Mengembangkan library matriks homogen $3 \times 3$ (translasi, rotasi, skala, fixed-point scale, invers), fungsi `blit` Inverse Mapping, dan fungsi easing. | • `js/lib/MatrixClass.js`<br>• `js/lib/Graflib.js` *(Fungsi `blit`)*<br>• `js/gfx/Easing.js` | • `MatrixClass.js`: Baris 3–16 (`multiply`) & 56–68 (`create_fixedp_scale`)<br>• `Graflib.js`: Baris 205–241 (`blit` invers)<br>• `Easing.js`: Baris 18–24 (`outBounce`) |
| **ORANG 3** | **Primitif, Kurva Polar & Polygon/FloodFill** | Mengembangkan algoritma garis DDA & Bresenham, lingkaran Midpoint 8-oktan & Polar, `polygon`, `floodFillStack`, serta kurva parametrik (Cardioid, Rose Curve, Fraktal). | • `js/lib/Graflib.js` *(Primitif & Fill)*<br>• `js/gfx/Bentuk.js`<br>• `js/gfx/Ikon.js`<br>• `js/gfx/Latar.js` | • `Graflib.js`: Baris 46–93 (DDA & Bresenham)<br>• `Graflib.js`: Baris 112–141 (Midpoint 8-Oktan)<br>• `Graflib.js`: Baris 151–171 (`floodFillStack`)<br>• `Bentuk.js`: Baris 36–58 (Rose Curve & Cardioid) |
| **ORANG 4** | **FSM Animasi, Lilin Shading & Interaktivitas** | Mengembangkan Finite State Machine 5 fase di scene coordinator, model amplop & kartu, kue tart & shading silinder lilin (DIP), api berkedip real-time, toolbar GUI, dan fisika partikel Euler. | • `js/scenes/Undangan.js`<br>• `js/entities/Amplop.js`<br>• `js/entities/Kartu.js`<br>• `js/entities/Toolbar.js`<br>• `js/gfx/Partikel.js` | • `Undangan.js`: Baris 40–79 & 101–166 (FSM & Event)<br>• `Kartu.js`: Baris 94–103 & 133–149 (Shading Kue & Lilin)<br>• `Kartu.js`: Baris 44–75 (Api Harmonik $\sin(18t)$)<br>• `Partikel.js`: Baris 42–64 (Fisika Euler) |

---

## 3. DETAIL LENGKAP TIAP ANGGOTA

---

### 👤 ORANG 1: Setup Halaman, Pipeline Display & Library Framebuffer

* **Deskripsi Peran:** Bertanggung jawab atas fondasi display aplikasi web, alokasi memori citra pada level CPU, pemetaan indeks array satu dimensi, serta isolasi rasterisasi teks typography.
* **Tugas Pengerjaan Nyata:**
  1. Merancang antarmuka web, wadah canvas beresolusi $800 \times 560$ piksel, form input data tamu, dan tombol kontrol di [index.html](file:///d:/Semester%205/GRAFKOM/undangan/index.html) dan [style.css](file:///d:/Semester%205/GRAFKOM/undangan/style.css).
  2. Membangun siklus rendering game loop `requestAnimationFrame` pada [main.js](file:///d:/Semester%205/GRAFKOM/undangan/js/main.js), memastikan canvas murni menerima data piksel final melalui `putImageData`.
  3. Membangun struktur memori kelas `Graflib` pada [Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js) yang memanipulasi buffer `Uint8ClampedArray` melalui fungsi `draw_dot`, `get_dot`, dan `is_color_same`.
  4. Membuat modul perender font mandiri [Teks.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Teks.js) yang meraster teks ke offscreen buffer terisolasi tanpa mencemari kanvas utama.
* **Bagian Kodingan Spesifik yang Wajib Diperlihatkan ke Dosen:**
  1. **[js/main.js](file:///d:/Semester%205/GRAFKOM/undangan/js/main.js#L9-L13) & [Baris 48–52](file:///d:/Semester%205/GRAFKOM/undangan/js/main.js#L48-L52):**
     ```javascript
     const image_data = context.getImageData(0, 0, canvas_handler.width, canvas_handler.height);
     let lib = new Graflib(canvas_handler.width, canvas_handler.height, image_data);
     ...
     function gambar() {
         latar.gambar(lib);
         undangan.gambar();
         context.putImageData(image_data, 0, 0);
     }
     ```
  2. **[js/lib/Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L21-L28):**
     ```javascript
     draw_dot(x, y, color) {
         if (x < 0 || x >= this.canvas_width || y < 0 || y >= this.canvas_height) return;
         let index = 4 * (x + (y * this.canvas_width));
         this.data[index] = color.r;
         this.data[index + 1] = color.g;
         this.data[index + 2] = color.b;
         this.data[index + 3] = 255;
     }
     ```
  3. **[js/gfx/Teks.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Teks.js#L3-L19):**
     Fungsi `Teks.buat()` yang meraster teks ke canvas offscreen sementara lalu mengembalikan `ImageData` mentah untuk di-blit ke kanvas utama.

---

### 👤 ORANG 2: Library Aljabar Linier Matriks 2D & Blit Inverse Mapping

* **Deskripsi Peran:** Bertanggung jawab atas fondasi matematika ruang 2 dimensi menggunakan koordinat homogen $3 \times 3$, transformasi komposit terhadap pivot lipatan, serta algoritma sampling piksel citra (*blitting*).
* **Tugas Pengerjaan Nyata:**
  1. Mengembangkan kelas matematika [MatrixClass.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/MatrixClass.js) yang mengimplementasikan perkalian matriks baris $\times$ kolom, translasi, rotasi trigonometri, skala, pemodelan matriks komposit, serta invers matriks berordo $3 \times 3$.
  2. Mengimplementasikan fungsi transformasi terhadap titik tumpu (*fixed-point transformation* $M = T \cdot S \cdot T^{-1}$) untuk melipat flap amplop surat.
  3. Mengembangkan algoritma transfer piksel citra `blit()` pada [Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L173-L241) yang dilengkapi teknik **Inverse Mapping** ($M^{-1}$) agar hasil transformasi rotasi/skala tidak menghasilkan celah piksel berlubang (*pixel holes*).
  4. Menyediakan modul kurva akselerasi animasi pada [Easing.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Easing.js) (`lerp`, `outBounce`, `outQuad`, `inOutQuad`).
* **Bagian Kodingan Spesifik yang Wajib Diperlihatkan ke Dosen:**
  1. **[js/lib/MatrixClass.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/MatrixClass.js#L3-L16):**
     ```javascript
     multiply(matA, matB) {
         const hasil = [];
         for (let i = 0; i < matA.length; i++) {
             hasil[i] = [];
             for (let j = 0; j < matB[0].length; j++) {
                 let jumlah = 0;
                 for (let k = 0; k < matB.length; k++) {
                     jumlah += matA[i][k] * matB[k][j];
                 }
                 hasil[i][j] = jumlah;
             }
         }
         return hasil;
     }
     ```
  2. **[js/lib/MatrixClass.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/MatrixClass.js#L56-L68):**
     Fungsi `create_fixedp_scale(xc, yc, sx, sy)` dan `create_model(x, y, sudut, skala_x, skala_y, ox, oy)`.
  3. **[js/lib/Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L205-L241):**
     Algoritma Inverse Mapping pada fungsi `blit()`, memetakan $(x, y)$ tujuan kembali ke $(u, v)$ sumber via `mat.invert(matriks)`.

---

### 👤 ORANG 3: Library Primitif Grafika, Kurva Polar & Polygon/FloodFill

* **Deskripsi Peran:** Bertanggung jawab atas algoritma pembentukan bentuk geometris fundamental (garis, lingkaran, elips), kurva parametrik polar, poligon sembarang, dan algoritma pewarnaan area tertutup menggunakan struktur data Stack.
* **Tugas Pengerjaan Nyata:**
  1. Mengembangkan algoritma garis inkremental **DDA Line** dan algoritma presisi integer **Bresenham Line** pada [Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L46-L93).
  2. Mengembangkan algoritma **Midpoint Circle** dengan teknik refleksi simetri **8-oktan** ($45^\circ$) dan lingkaran polar trigonometri pada [Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L103-L141).
  3. Mengembangkan algoritma pewarnaan poligon **FloodFill 4-Connected berbasis Stack Array** (`floodFillStack`), secara sadar menghindari rekursi fungsi demi mencegah error fatal browser *Call Stack Overflow*.
  4. Merancang pustaka bentuk matematis pada [Bentuk.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Bentuk.js) (kurva polar Cardioid, kurva bunga Rose Curve $r = a\cos(nt)$, elips, dan fraktal bintang rekursif) serta aset dekorasi pada [Ikon.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Ikon.js) dan [Latar.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Latar.js).
* **Bagian Kodingan Spesifik yang Wajib Diperlihatkan ke Dosen:**
  1. **[js/lib/Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L46-L93):**
     Implementasi `dda_line` (floating-point) dan `bresenham_line` (variabel keputusan integer `err = dx - dy`).
  2. **[js/lib/Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L112-L141):**
     Implementasi `midpoint_circle` dengan fungsi `gambar8(cx, cy, px, py)` yang merefleksikan 1 titik perhitungan ke 8 oktan sekaligus.
  3. **[js/lib/Graflib.js](file:///d:/Semester%205/GRAFKOM/undangan/js/lib/Graflib.js#L151-L171):**
     ```javascript
     floodFillStack(x0, y0, warna_lama, warna_baru) {
         if (this.is_color_same(warna_lama, warna_baru) == 1) return;
         let tumpukan = [];
         tumpukan.push({ x: Math.round(x0), y: Math.round(y0) });
         while (tumpukan.length > 0) {
             let titik_skrg = tumpukan.pop();
             ...
         }
     }
     ```
  4. **[js/gfx/Bentuk.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Bentuk.js#L36-L58):**
     Kurva polar `bunga(xc, yc, r, n)` (Rose Curve) dan `cardioid(xc, yc, r)`.

---

### 👤 ORANG 4: State Machine Animasi, Model Lilin Shading, Partikel & Interaksi

* **Deskripsi Peran:** Bertanggung jawab atas perakitan entitas grafika, koordinator scene, siklus Finite State Machine (FSM), pemodelan lilin volumetrik dengan shading gradasi warna (DIP), nyala api dinamis, sistem partikel fisika Euler, dan interaktivitas GUI/Keyboard.
* **Tugas Pengerjaan Nyata:**
  1. Merancang logika koordinator scene [Undangan.js](file:///d:/Semester%205/GRAFKOM/undangan/js/scenes/Undangan.js) menggunakan **Finite State Machine 5 fase** (`JATUH`, `MENDARAT`, `BUKA`, `NAIK`, `PENUH`).
  2. Merakit objek komposit amplop pada [Amplop.js](file:///d:/Semester%205/GRAFKOM/undangan/js/entities/Amplop.js) dan kartu perayaan pada [Kartu.js](file:///d:/Semester%205/GRAFKOM/undangan/js/entities/Kartu.js).
  3. Memodelkan kue ulang tahun bertingkat dan lilin berpenampang silinder menggunakan garis vertikal DDA dengan **Lambertian Cylindrical Shading** (gradasi RGB per kolom), serta menganimasikan nyala api Cardioid berkedip real-time menggunakan fungsi harmonik $\sin(18t)$.
  4. Mengembangkan panel GUI toolbar [Toolbar.js](file:///d:/Semester%205/GRAFKOM/undangan/js/entities/Toolbar.js) dan sistem partikel fisika Euler [Partikel.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Partikel.js) untuk semburan balon terbang dan konfeti perayaan.
* **Bagian Kodingan Spesifik yang Wajib Diperlihatkan ke Dosen:**
  1. **[js/scenes/Undangan.js](file:///d:/Semester%205/GRAFKOM/undangan/js/scenes/Undangan.js#L40-L79 & L101-L166):**
     Transisi 5 state animasi FSM dan penanganan interaktivitas klik mouse serta keyboard (`Spasi`, `Enter`, `1`, `2`, `R`).
  2. **[js/entities/Kartu.js](file:///d:/Semester%205/GRAFKOM/undangan/js/entities/Kartu.js#L94-L103 & L133-L149):**
     ```javascript
     for (let x = cx - rx1; x <= cx + rx1; x++) {
         let faktor = (x - (cx - rx1)) / w1;
         let gelap = Math.sin(faktor * Math.PI);
         let warna_kolom = {
             r: Math.round(210 + gelap * 40),
             g: Math.round(165 + gelap * 35),
             b: Math.round(140 + gelap * 35)
         };
         layer.dda_line(x, y1, x, dasar_y, warna_kolom);
     }
     ```
  3. **[js/entities/Kartu.js](file:///d:/Semester%205/GRAFKOM/undangan/js/entities/Kartu.js#L44-L75):**
     Fungsi `gambar_api_hidup()` yang menganimasikan kurva Cardioid nyala api menggunakan fungsi harmonik waktu:
     `goyang = 1.0 * Math.sin(waktu * 18) + 0.5 * Math.cos(waktu * 27)`.
  4. **[js/gfx/Partikel.js](file:///d:/Semester%205/GRAFKOM/undangan/js/gfx/Partikel.js#L42-L64):**
     Simulasi fisika Euler 2D ($\vec{v} \leftarrow \vec{v} + \vec{g}\Delta t$ dan $\vec{r} \leftarrow \vec{r} + \vec{v}\Delta t$) pada semburan konfeti dan balon perayaan.

---

## 4. CHECKLIST PENGUASAAN TIM SAAT TANYA JAWAB DOSEN

Sesuai instruksi ujian: *"Setiap anggota tim wajib menguasai semua bagian kode"*, seluruh anggota disarankan membaca tabel berikut agar saling melengkapi jika dosen bertanya lintas modul:

| Pertanyaan Penguji | Pemegang Utama | Rekan Pendukung | Poin Kunci Jawaban |
| :--- | :---: | :---: | :--- |
| **Kenapa tidak pakai `ctx.arc()`?** | Orang 1 | Orang 3 | Karena tugas mewajibkan pure rasterizer; lingkaran dihitung manual dengan Midpoint Circle 8-oktan di CPU. |
| **Kenapa matriksnya $3 \times 3$?** | Orang 2 | Orang 1 | Menggunakan koordinat homogen agar translasi linier dapat diubah menjadi perkalian matriks komposit ($T \cdot R \cdot S$). |
| **Kenapa FloodFill pakai Array Stack?** | Orang 3 | Orang 4 | Mencegah error fatal browser `Maximum Call Stack Size Exceeded` akibat rekursi ribuan piksel di memori stack. |
| **Bagaimana lilin tampak bulat 3D?** | Orang 4 | Orang 1 | Bukan menggunakan WebGL/3D engine, melainkan modulasi kecerahan warna RGB per kolom vertikal DDA (DIP Cylindrical Shading). |
| **Bagaimana teks ditampilkan?** | Orang 1 | Orang 2 | Teks dirasterisasi secara offscreen ke buffer sementara lalu ditransfer manual ke kanvas display menggunakan algoritma `blit`. |

---
*Dokumen ini merupakan lampiran resmi pembagian tugas tim untuk UTS Grafika Komputer.*
