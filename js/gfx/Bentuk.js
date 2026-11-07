
export let kosong = { r: 0, g: 0, b: 0 };

export default class Bentuk {
    static elips(xc, yc, rx, ry, jumlah) {
        let titik = [];
        for (let i = 0; i < jumlah; i++) {
            let sudut = i / jumlah * Math.PI * 2;
            titik.push({ x: Math.round(xc + rx * Math.cos(sudut)), y: Math.round(yc + ry * Math.sin(sudut)) });
        }
        return titik;
    }

    static bintang(xc, yc, r_luar, r_dalam) {
        let titik = [];
        for (let i = 0; i < 10; i++) {
            let sudut = -Math.PI / 2 + i * Math.PI / 5;
            let r = r_luar;
            if (i % 2 == 1) r = r_dalam;
            titik.push({ x: Math.round(xc + r * Math.cos(sudut)), y: Math.round(yc + r * Math.sin(sudut)) });
        }
        return titik;
    }

    static hati(xc, yc, skala) {
        let titik = [];
        for (let i = 0; i < 40; i++) {
            let t = i / 40 * Math.PI * 2;
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            titik.push({ x: Math.round(xc + x * skala), y: Math.round(yc - y * skala) });
        }
        return titik;
    }

    static bunga(xc, yc, r, n, jumlah = 60) {
        let titik = [];
        for (let i = 0; i < jumlah; i++) {
            let t = (i / jumlah) * Math.PI * 2;
            let radius = r * Math.cos(n * t);
            let x = xc + radius * Math.cos(t);
            let y = yc + radius * Math.sin(t);
            titik.push({ x: Math.round(x), y: Math.round(y) });
        }
        return titik;
    }

    static cardioid(xc, yc, r, jumlah = 50) {
        let titik = [];
        for (let i = 0; i < jumlah; i++) {
            let t = (i / jumlah) * Math.PI * 2;
            let radius = r + r * Math.sin(t);
            let x = xc + radius * Math.cos(t);
            let y = yc - radius * Math.sin(t);
            titik.push({ x: Math.round(x), y: Math.round(y) });
        }
        return titik;
    }

    static gelombang(xc, yc, r, amp, freq, jumlah = 64) {
        let titik = [];
        for (let i = 0; i < jumlah; i++) {
            let t = (i / jumlah) * Math.PI * 2;
            let radius = r + amp * Math.sin(freq * t);
            let x = xc + radius * Math.cos(t);
            let y = yc + radius * Math.sin(t);
            titik.push({ x: Math.round(x), y: Math.round(y) });
        }
        return titik;
    }

    static fraktal_bintang(lib, xc, yc, r, kedalaman, warna) {
        if (kedalaman <= 0 || r < 3) return;
        let pts = Bentuk.bintang(xc, yc, r, r * 0.45);
        lib.polygon(pts, warna);
        for (let i = 0; i < 5; i++) {
            let s = -Math.PI / 2 + i * (Math.PI * 2 / 5);
            let nx = xc + r * Math.cos(s);
            let ny = yc + r * Math.sin(s);
            Bentuk.fraktal_bintang(lib, nx, ny, r * 0.38, kedalaman - 1, warna);
        }
    }

    static kotak(x, y, lebar, tinggi) {
        return [{ x: x, y: y }, { x: x + lebar, y: y }, { x: x + lebar, y: y + tinggi }, { x: x, y: y + tinggi }];
    }

    static titik_tengah(titik) {
        let jumlah_x = 0;
        let jumlah_y = 0;
        for (let i = 0; i < titik.length; i++) {
            jumlah_x = jumlah_x + titik[i].x;
            jumlah_y = jumlah_y + titik[i].y;
        }
        return { x: Math.round(jumlah_x / titik.length), y: Math.round(jumlah_y / titik.length) };
    }

    static isi(lib, titik, warna_garis, warna_isi, titik_isi, warna_lama) {
        if (titik_isi == undefined) titik_isi = Bentuk.titik_tengah(titik);
        if (warna_lama == undefined) warna_lama = kosong;
        lib.polygon(titik, warna_garis);
        lib.floodFillStack(titik_isi.x, titik_isi.y, warna_lama, warna_isi);
    }
}
