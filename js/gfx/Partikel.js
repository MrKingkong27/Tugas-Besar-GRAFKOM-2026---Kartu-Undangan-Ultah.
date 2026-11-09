
import MatrixClass from "../lib/MatrixClass.js";
import Bentuk from "./Bentuk.js";

let mat = new MatrixClass();

let warna_warni = [
    { r: 218, g: 175, b: 85 },
    { r: 240, g: 210, b: 135 },
    { r: 195, g: 155, b: 90 },
    { r: 175, g: 55, b: 75 },
    { r: 250, g: 242, b: 230 },
    { r: 228, g: 185, b: 120 }
];

function acak(min, maks) {
    return min + Math.random() * (maks - min);
}

function warna_acak() {
    return warna_warni[Math.floor(Math.random() * warna_warni.length)];
}

export class Partikel {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.vx = data.vx || 0;
        this.vy = data.vy || 0;
        this.gravitasi = data.gravitasi || 0;
        this.goyang = data.goyang || 0;
        this.umur = data.umur;
        this.umur_awal = data.umur;
        this.ukuran = data.ukuran || 4;
        this.warna = data.warna;
        this.sprite = data.sprite;
        this.skala = data.skala || 1;
        this.bentuk = data.bentuk || "kotak";
        this.fase = acak(0, 6.28);
    }

    perbarui(dt) {
        let goyangan = Math.sin(this.fase + (this.umur_awal - this.umur) * 4) * this.goyang;
        this.vy += this.gravitasi * dt;
        this.x += (this.vx + goyangan) * dt;
        this.y += this.vy * dt;
        this.umur -= dt;
    }

    gambar(lib) {
        let sisa = this.umur / this.umur_awal;
        if (this.sprite) {
            let m = mat.create_model(this.x, this.y, 0, this.skala, this.skala, this.sprite.width / 2, this.sprite.height / 2);
            lib.blit(this.sprite, m, Math.min(1, sisa * 1.5));
        } else if (this.bentuk == "bintang") {

            let r = Math.max(2, Math.round(this.ukuran * Math.min(1, sisa * 2)));
            let pts = Bentuk.bintang(Math.round(this.x), Math.round(this.y), r, Math.round(r * 0.4));
            lib.polygon(pts, this.warna);
        } else {
            let ukuran = Math.max(1, Math.round(this.ukuran * Math.min(1, sisa * 2)));
            lib.fill_rect(Math.round(this.x - ukuran / 2), Math.round(this.y - ukuran / 2), ukuran, ukuran, this.warna);
        }
    }
}

export class SistemPartikel {
    constructor() {
        this.daftar = [];
    }

    hapus() {
        this.daftar = [];
    }

    percikan(x, y, jumlah) {
        for (let i = 0; i < jumlah; i++) {
            let sudut = acak(0, Math.PI * 2);
            let laju = acak(60, 240);
            this.daftar.push(new Partikel({
                x: x, y: y, vx: Math.cos(sudut) * laju, vy: Math.sin(sudut) * laju,
                gravitasi: 120, umur: acak(0.6, 1.4), ukuran: acak(3, 6),
                warna: warna_acak(), bentuk: (i % 3 == 0) ? "bintang" : "kotak"
            }));
        }
    }

    konfeti(x, y, jumlah, arah) {
        for (let i = 0; i < jumlah; i++) {
            this.daftar.push(new Partikel({
                x: x, y: y, vx: arah * acak(120, 420), vy: -acak(320, 650),
                gravitasi: 420, goyang: acak(30, 80), umur: acak(2.2, 3.5),
                ukuran: acak(4, 8), warna: warna_acak(),
                bentuk: (i % 2 == 0) ? "kotak" : "bintang"
            }));
        }
    }

    naik(x, y, sprite, jumlah, kecepatan, umur, goyang, sebar) {
        for (let i = 0; i < jumlah; i++) {
            this.daftar.push(new Partikel({
                x: x + acak(-sebar, sebar), y: y - acak(0, 20), vy: kecepatan * acak(0.7, 1.3),
                goyang: goyang, umur: umur * acak(0.7, 1.2), sprite: sprite, skala: acak(0.4, 0.9)
            }));
        }
    }

    perbarui(dt) {
        let hidup = [];
        for (let i = 0; i < this.daftar.length; i++) {
            this.daftar[i].perbarui(dt);
            if (this.daftar[i].umur > 0) hidup.push(this.daftar[i]);
        }
        this.daftar = hidup;
    }

    gambar(lib) {
        for (let i = 0; i < this.daftar.length; i++) {
            this.daftar[i].gambar(lib);
        }
    }
}
