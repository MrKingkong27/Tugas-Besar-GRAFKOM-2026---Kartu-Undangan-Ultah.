import { buat_layer } from "../lib/Graflib.js";
import MatrixClass from "../lib/MatrixClass.js";
import Easing from "../gfx/Easing.js";
import Teks from "../gfx/Teks.js";
import Bentuk from "../gfx/Bentuk.js";
import { SistemPartikel } from "../gfx/Partikel.js";
import Amplop from "../entities/Amplop.js";
import Kartu from "../entities/Kartu.js";
import Toolbar from "../entities/Toolbar.js";

let mat = new MatrixClass();

let x_tengah = 400;
let y_mendarat = 370;
let y_kartu = 245;
let y_lantai = 450;

export default class Undangan {
    constructor(lib, info) {
        this.lib = lib;
        this.amplop = new Amplop();
        this.toolbar = new Toolbar();
        this.partikel = new SistemPartikel();
        this.petunjuk = Teks.buat("Klik surat untuk membuka", 16, "#6b5443", "bold", "'Segoe UI', sans-serif");

        let layer = buat_layer(260, 40);
        let gelap = { r: 50, g: 45, b: 40 };
        Bentuk.isi(layer, Bentuk.elips(130, 20, 120, 16, 28), gelap, gelap, { x: 130, y: 20 });
        this.bayangan = layer.image_data;

        this.ganti_info(info);
        this.reset();
    }

    ganti_info(info) {
        this.kartu = new Kartu(info);
    }

    reset() {
        this.state = "JATUH";
        this.waktu = 0;
        this.sudah_percik = false;
        this.partikel.hapus();
        this.toolbar.muncul = 0;

        this.amplop.x = x_tengah;
        this.amplop.y = -140;
        this.amplop.sudut = 0;
        this.amplop.skala = 0.55;
        this.amplop.tutup = 1;

        this.kartu.tampil = false;
        this.kartu.depan = false;
        this.kartu.x = x_tengah;
        this.kartu.y = 350;
        this.kartu.skala = 0.62;
    }

    ganti_state(nama) {
        this.state = nama;
        this.waktu = 0;
    }

    buka() {
        if (this.state == "MENDARAT") {
            this.kartu.tampil = true;
            this.kartu.depan = false;
            this.kartu.x = x_tengah;
            this.kartu.y = 350;
            this.kartu.skala = 0.62;
            this.ganti_state("BUKA");
        }
    }

    klik(x, y) {
        if (this.state == "MENDARAT" && this.amplop.kena(x, y)) {
            this.buka();
        } else if (this.state == "PENUH") {
            let i = this.toolbar.kena(x, y);
            if (i >= 0) this.reaksi(i);
        }
    }

    tombol(key) {
        if (key == " " || key == "Enter") this.buka();
        else if (key == "r" || key == "R") this.reset();
        else if (key == "1" && this.state == "PENUH") this.reaksi(0);
        else if (key == "2" && this.state == "PENUH") this.reaksi(1);
    }

    bisa_diklik(x, y) {
        if (this.state == "MENDARAT") return this.amplop.kena(x, y);
        if (this.state == "PENUH") return this.toolbar.kena(x, y) >= 0;
        return false;
    }

    reaksi(i) {
        let c = this.toolbar.pusat(i);
        let ikon = this.toolbar.ikon[i];
        if (i == 0) {
            this.partikel.naik(c.x, c.y - 20, ikon, 4, -120, 3.5, 30, 60);
        } else if (i == 1) {
            this.partikel.konfeti(60, 540, 24, 1);
            this.partikel.konfeti(740, 540, 24, -1);
            this.partikel.percikan(c.x, c.y - 40, 24);
        }
    }

    perbarui(dt, mouse_x, mouse_y) {
        this.waktu += dt;
        if (this.state == "JATUH") this.perbarui_jatuh();
        else if (this.state == "MENDARAT") this.amplop.skala = 1 + 0.02 * Math.sin(this.waktu * 3);
        else if (this.state == "BUKA") this.perbarui_buka();
        else if (this.state == "NAIK") this.perbarui_naik();
        else this.perbarui_penuh();

        let hover = -1;
        if (this.state == "PENUH") hover = this.toolbar.kena(mouse_x, mouse_y);
        this.toolbar.perbarui(dt, hover, this.state == "PENUH");
        this.partikel.perbarui(dt);
    }

    perbarui_jatuh() {
        let n = Easing.clamp(this.waktu / 1.4);
        this.amplop.y = Easing.lerp(-140, y_mendarat, Easing.outBounce(n));
        this.amplop.skala = Easing.lerp(0.55, 1, Easing.outQuad(n));
        this.amplop.sudut = 0.25 * (1 - n) * Math.sin(n * 10);
        if (n >= 1) this.ganti_state("MENDARAT");
    }

    perbarui_buka() {
        let n = Easing.clamp(this.waktu / 0.85);
        this.amplop.tutup = Math.cos(Easing.inOutQuad(n) * Math.PI);
        if (n >= 1) {
            this.kartu.tampil = true;
            this.kartu.x = x_tengah;
            this.kartu.y = 350;
            this.kartu.skala = 0.62;
            this.kartu.sudut = 0;
            this.kartu.depan = false;
            this.ganti_state("NAIK");
        }
    }

    perbarui_naik() {
        let p = Easing.clamp(this.waktu / 2.0);

        if (p <= 0.45) {
            let t = p / 0.45;
            let eased = Easing.outQuad(t);
            this.kartu.y = Easing.lerp(350, 130, eased);
            this.kartu.skala = Easing.lerp(0.62, 0.72, eased);
            this.kartu.sudut = 0;
            this.kartu.depan = false;
            this.amplop.y = y_mendarat;
            this.amplop.skala = 1;
            this.amplop.sudut = 0;
        } else {
            let t2 = (p - 0.45) / 0.55;
            let cardEased = Easing.outQuad(t2);
            let envEased = Easing.inQuad(t2);

            this.amplop.y = Easing.lerp(y_mendarat, 680, envEased);
            this.amplop.skala = Easing.lerp(1, 0.88, t2);
            this.amplop.sudut = 0;

            this.kartu.y = Easing.lerp(130, y_kartu, cardEased);
            this.kartu.skala = Easing.lerp(0.72, 1, cardEased);
            this.kartu.sudut = 0;
            this.kartu.depan = true;
        }

        if (p >= 1) {
            this.ganti_state("PENUH");
            this.kartu.y = y_kartu;
            this.kartu.sudut = 0;
            this.kartu.skala = 1;
            this.partikel.konfeti(80, 520, 16, 1);
            this.partikel.konfeti(720, 520, 16, -1);
        }
    }

    perbarui_penuh() {
        this.kartu.y = Math.round(y_kartu + 2 * Math.sin(this.waktu * 1.5));
        this.kartu.sudut = 0;
        this.kartu.skala = 1;
    }

    gambar() {
        if (this.state != "PENUH") this.gambar_amplop();
        if (this.kartu.tampil && (this.kartu.depan || this.state == "PENUH")) {
            this.kartu.gambar(this.lib, this.waktu);
        }
        if (this.state == "MENDARAT") this.gambar_petunjuk();
        this.toolbar.gambar(this.lib);
        this.partikel.gambar(this.lib);
    }

    gambar_amplop() {
        if (this.amplop.y > 660) return;
        let tinggi = Math.max(0, y_mendarat - this.amplop.y);
        let skala = this.amplop.skala / (1 + tinggi / 400);
        let alpha = 0.25 * Easing.clamp(1 - (this.amplop.y - y_mendarat) / 180);
        if (alpha > 0) {
            this.lib.blit(this.bayangan, mat.create_model(x_tengah, y_lantai + 2, 0, skala, skala, 130, 20), alpha);
        }

        let kartu = this.kartu;
        let lib = this.lib;
        let waktu = this.waktu;
        let isi = null;
        if (kartu.tampil && kartu.depan == false) {
            isi = function () { kartu.gambar(lib, waktu); };
        }
        this.amplop.gambar(this.lib, isi);
    }

    gambar_petunjuk() {
        let y = 478 + 3 * Math.sin(this.waktu * 3);
        let alpha = 0.65 + 0.35 * Math.sin(this.waktu * 3);
        this.lib.blit(this.petunjuk, mat.create_model(x_tengah, y, 0, 1, 1, this.petunjuk.width / 2, 0), alpha);
    }
}
