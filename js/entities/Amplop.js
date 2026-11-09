import { buat_layer } from "../lib/Graflib.js";
import MatrixClass from "../lib/MatrixClass.js";
import Bentuk from "../gfx/Bentuk.js";

let mat = new MatrixClass();

export let LEBAR = 240;
export let TINGGI = 160;
let y_lipat = 99;

let garis = { r: 145, g: 125, b: 105 };
let warna_belakang = { r: 228, g: 218, b: 206 };
let warna_depan = { r: 242, g: 235, b: 225 };
let warna_tutup = { r: 236, g: 228, b: 218 };
let warna_dalam_tutup = { r: 62, g: 38, b: 48 };
let warna_segel = { r: 148, g: 32, b: 46 };
let warna_segel_motif = { r: 225, g: 185, b: 95 };
let emas_aksen = { r: 212, g: 172, b: 82 };

export default class Amplop {
    constructor() {
        this.x = 400;
        this.y = 370;
        this.sudut = 0;
        this.skala = 1;
        this.tutup = 1;

        let titik_tutup = [{ x: 0, y: 0 }, { x: LEBAR - 1, y: 0 }, { x: LEBAR / 2, y: y_lipat }];
        let titik_depan = [
            { x: 0, y: 0 }, { x: LEBAR / 2, y: y_lipat }, { x: LEBAR - 1, y: 0 },
            { x: LEBAR - 1, y: TINGGI - 1 }, { x: 0, y: TINGGI - 1 }
        ];

        let layer = buat_layer(LEBAR, TINGGI);
        Bentuk.isi(layer, Bentuk.kotak(0, 0, LEBAR - 1, TINGGI - 1), garis, warna_belakang, { x: 120, y: 8 });
        layer.polygon(Bentuk.kotak(2, 2, LEBAR - 5, TINGGI - 5), emas_aksen);
        this.belakang = layer.image_data;

        layer = buat_layer(LEBAR, TINGGI);
        Bentuk.isi(layer, titik_depan, garis, warna_depan, { x: 120, y: 140 });
        layer.dda_line(0, TINGGI - 1, LEBAR / 2 - 6, y_lipat + 6, garis);
        layer.dda_line(LEBAR - 1, TINGGI - 1, LEBAR / 2 + 6, y_lipat + 6, garis);
        layer.dda_line(2, TINGGI - 2, LEBAR / 2 - 6, y_lipat + 8, emas_aksen);
        layer.dda_line(LEBAR - 3, TINGGI - 2, LEBAR / 2 + 6, y_lipat + 8, emas_aksen);
        this.depan = layer.image_data;

        layer = buat_layer(LEBAR, TINGGI);
        Bentuk.isi(layer, titik_tutup, garis, warna_tutup, { x: 120, y: 12 });
        layer.dda_line(1, 1, LEBAR / 2, y_lipat - 1, emas_aksen);
        layer.dda_line(LEBAR - 2, 1, LEBAR / 2, y_lipat - 1, emas_aksen);

        let cx_segel = LEBAR / 2;
        let cy_segel = y_lipat - 16;
        layer.midpoint_circle(cx_segel, cy_segel, 14, garis);
        layer.floodFillStack(cx_segel, cy_segel, warna_tutup, warna_segel);
        layer.midpoint_circle(cx_segel, cy_segel, 12, emas_aksen);

        let motif_segel = Bentuk.bintang(cx_segel, cy_segel, 7, 3.5);
        Bentuk.isi(layer, motif_segel, warna_segel_motif, warna_segel_motif, { x: cx_segel, y: cy_segel }, warna_segel);
        this.tutup_tertutup = layer.image_data;

        layer = buat_layer(LEBAR, TINGGI);
        Bentuk.isi(layer, titik_tutup, garis, warna_dalam_tutup, { x: 120, y: 12 });
        layer.dda_line(3, 2, LEBAR / 2, y_lipat - 3, emas_aksen);
        layer.dda_line(LEBAR - 4, 2, LEBAR / 2, y_lipat - 3, emas_aksen);
        this.tutup_terbuka = layer.image_data;
    }

    matriks() {
        return mat.create_model(this.x, this.y, this.sudut, this.skala, this.skala, LEBAR / 2, TINGGI / 2);
    }

    kena(px, py) {
        let balik = mat.invert(this.matriks());
        let titik = mat.transform_point({ x: px, y: py }, balik);
        return titik.x >= 0 && titik.x <= LEBAR && titik.y >= 0 && titik.y <= TINGGI;
    }

    gambar(lib, isi) {
        let m = this.matriks();
        lib.blit(this.belakang, m);
        if (this.tutup < 0) this.gambar_tutup(lib, m);
        if (isi != null) {
            let y_bawah = Math.round(this.y + (TINGGI / 2) * this.skala - 2);
            let x_kiri = Math.round(this.x - (LEBAR / 2) * this.skala + 4);
            let x_kanan = Math.round(this.x + (LEBAR / 2) * this.skala - 4);
            lib.set_clip(x_kiri, 0, x_kanan, y_bawah);
            isi();
            lib.reset_clip();
        }
        lib.blit(this.depan, m);
        if (this.tutup >= 0) this.gambar_tutup(lib, m);
    }

    gambar_tutup(lib, m) {
        if (Math.abs(this.tutup) < 0.03) return;
        let m_tutup = mat.multiply(m, mat.create_fixedp_scale(LEBAR / 2, 0, 1, this.tutup));
        if (this.tutup > 0) lib.blit(this.tutup_tertutup, m_tutup);
        else lib.blit(this.tutup_terbuka, m_tutup);
    }
}
