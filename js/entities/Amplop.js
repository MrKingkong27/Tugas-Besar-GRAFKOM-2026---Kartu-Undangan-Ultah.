
import { buat_layer } from "../lib/Graflib.js?v=3";
import MatrixClass from "../lib/MatrixClass.js?v=3";
import Bentuk from "../gfx/Bentuk.js?v=3";

let mat = new MatrixClass();

export let LEBAR = 240;
export let TINGGI = 160;
let y_lipat = 99;

let garis = { r: 110, g: 42, b: 72 };
let warna_belakang = { r: 228, g: 135, b: 162 };
let warna_depan = { r: 255, g: 182, b: 202 };
let warna_tutup = { r: 246, g: 152, b: 178 };
let warna_dalam_tutup = { r: 255, g: 242, b: 232 };
let warna_segel = { r: 235, g: 180, b: 50 };
let warna_segel_motif = { r: 175, g: 40, b: 65 };
let emas_aksen = { r: 255, g: 215, b: 90 };

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

        let hati_segel = Bentuk.hati(cx_segel, cy_segel - 1, 0.45);
        Bentuk.isi(layer, hati_segel, warna_segel_motif, warna_segel_motif, { x: cx_segel, y: cy_segel - 1 }, warna_segel);
        this.tutup_tertutup = layer.image_data;

        layer = buat_layer(LEBAR, TINGGI);
        Bentuk.isi(layer, titik_tutup, garis, warna_dalam_tutup, { x: 120, y: 12 });

        let warna_dot = { r: 245, g: 175, b: 195 };
        for (let py = 15; py < y_lipat - 15; py += 16) {
            let lebar_baris = ((y_lipat - py) / y_lipat) * (LEBAR - 40);
            let start_x = LEBAR / 2 - lebar_baris / 2;
            for (let px = start_x; px <= start_x + lebar_baris; px += 20) {
                layer.midpoint_circle(Math.round(px), py, 2, warna_dot);
            }
        }
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
        if (isi != null) isi();
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
