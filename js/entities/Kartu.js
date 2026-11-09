
import { buat_layer } from "../lib/Graflib.js?v=3";
import MatrixClass from "../lib/MatrixClass.js?v=3";
import Bentuk from "../gfx/Bentuk.js?v=3";
import Teks from "../gfx/Teks.js?v=3";

let mat = new MatrixClass();

let krem = { r: 255, g: 253, b: 249 };
let tinta_utama = { r: 85, g: 30, b: 60 };
let emas = { r: 215, g: 165, b: 65 };
let emas_muda = { r: 238, g: 198, b: 110 };
let pink_pita = { r: 165, g: 45, b: 78 };
let putih = { r: 255, g: 255, b: 255 };

let kue_krim = { r: 255, g: 245, b: 248 };
let kue_bolu = { r: 245, g: 195, b: 170 };
let kue_garis = { r: 155, g: 75, b: 85 };
let lilin_batang = { r: 90, g: 180, b: 235 };
let api_luar = { r: 255, g: 195, b: 30 };
let api_dalam = { r: 255, g: 90, b: 30 };

export default class Kartu {
    constructor(info) {
        this.x = 400;
        this.y = 250;
        this.sudut = 0;
        this.skala = 0.42;
        this.tampil = false;
        this.depan = false;
        this.sprite = this.buat_sprite(info);
    }

    gambar(lib, waktu = 0) {
        if (this.tampil == false) return;
        let m = mat.create_model(this.x, this.y, this.sudut, this.skala, this.skala, 150, 200);
        lib.blit(this.sprite, m);

        if (this.depan && this.skala >= 0.95) {
            this.gambar_api_hidup(lib, m, waktu);
        }
    }

    gambar_api_hidup(lib, matriks_kartu, waktu) {

        let pos_sumbu = mat.transform_point({ x: 150, y: 153 }, matriks_kartu);
        let sx = pos_sumbu.x;
        let sy = pos_sumbu.y;

        let goyang = 1.0 * Math.sin(waktu * 18) + 0.5 * Math.cos(waktu * 27);
        let r_nafas = 3.5 + 0.4 * Math.sin(waktu * 14);
        let cx = sx + goyang;
        let cy = sy - 6;

        let r_halo = 8 + Math.round(1.5 * Math.sin(waktu * 10));
        let warna_halo = { r: 255, g: 235, b: 150 };
        lib.lingkaran_polar(Math.round(cx), Math.round(cy), r_halo, warna_halo);

        let api_luar_pts = Bentuk.cardioid(cx, cy, r_nafas, 24);
        Bentuk.isi(lib, api_luar_pts, api_luar, api_luar, { x: cx, y: cy });

        let api_tengah_pts = Bentuk.cardioid(cx, cy, r_nafas * 0.65, 18);
        Bentuk.isi(lib, api_tengah_pts, api_dalam, api_dalam, { x: cx, y: cy }, api_luar);

        let api_inti_pts = Bentuk.cardioid(cx, cy + 1, r_nafas * 0.35, 14);
        Bentuk.isi(lib, api_inti_pts, { r: 255, g: 255, b: 220 }, { r: 255, g: 255, b: 220 }, { x: cx, y: cy + 1 }, api_dalam);

        lib.draw_dot(Math.round(cx), Math.round(sy - 1), { r: 70, g: 150, b: 255 });
        lib.draw_dot(Math.round(cx - 1), Math.round(sy), { r: 50, g: 120, b: 240 });
        lib.draw_dot(Math.round(cx + 1), Math.round(sy), { r: 50, g: 120, b: 240 });

        let ember_y = sy - 15 - Math.round((waktu * 40) % 14);
        let ember_x = cx + Math.sin(waktu * 22) * 2;
        lib.draw_dot(Math.round(ember_x), ember_y, { r: 255, g: 215, b: 60 });
    }

    tulis(layer, teks, x, y, ukuran, warna, gaya = "normal", keluarga = "'Georgia', serif", maks_w = 260) {
        let sprite = Teks.buat(teks, ukuran, warna, gaya, keluarga);
        let skala = Math.min(1, maks_w / sprite.width);
        layer.blit(sprite, mat.create_model(x, y, 0, skala, skala, sprite.width / 2, sprite.height / 2));
    }

    gambar_kue(layer, cx, dasar_y) {

        let elips_piring = Bentuk.elips(cx, dasar_y + 1, 46, 7, 36);
        layer.polygon(elips_piring, emas);
        layer.polygon(Bentuk.elips(cx, dasar_y + 2, 40, 6, 32), emas_muda);

        let w1 = 76, h1 = 20;
        let y1 = dasar_y - h1;
        let rx1 = w1 / 2;
        let ry1 = 6;

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

        layer.polygon(Bentuk.elips(cx, dasar_y, rx1, ry1, 32), kue_garis);
        let elips_atas1 = Bentuk.elips(cx, y1, rx1, ry1, 32);
        Bentuk.isi(layer, elips_atas1, kue_garis, kue_krim, { x: cx, y: y1 });

        let w2 = 50, h2 = 18;
        let y2 = y1 - h2;
        let rx2 = w2 / 2;
        let ry2 = 5;

        for (let x = cx - rx2; x <= cx + rx2; x++) {
            let faktor = (x - (cx - rx2)) / w2;
            let gelap = Math.sin(faktor * Math.PI);
            let warna_kolom = {
                r: Math.round(210 + gelap * 40),
                g: Math.round(165 + gelap * 35),
                b: Math.round(140 + gelap * 35)
            };
            layer.dda_line(x, y2, x, y1, warna_kolom);
        }
        layer.polygon(Bentuk.elips(cx, y1, rx2, ry2, 28), kue_garis);
        let elips_atas2 = Bentuk.elips(cx, y2, rx2, ry2, 28);
        Bentuk.isi(layer, elips_atas2, kue_garis, kue_krim, { x: cx, y: y2 });

        let r_lilin = 4;
        let ry_lilin = 2;
        let h_lilin = 18;
        let top_lilin = y2 - h_lilin;

        let shading_lilin = [
            { r: 65, g: 130, b: 195 },
            { r: 85, g: 155, b: 220 },
            { r: 120, g: 195, b: 245 },
            { r: 235, g: 250, b: 255 },
            { r: 145, g: 210, b: 255 },
            { r: 110, g: 185, b: 235 },
            { r: 85, g: 155, b: 220 },
            { r: 60, g: 120, b: 185 }
        ];

        for (let i = 0; i < shading_lilin.length; i++) {
            let x = (cx - r_lilin) + i;
            let c = shading_lilin[i];
            layer.dda_line(x, top_lilin, x, y2, c);
        }

        let warna_emas_lilin = { r: 255, g: 220, b: 120 };
        layer.dda_line(cx - 3, top_lilin + 4, cx + 3, top_lilin + 7, warna_emas_lilin);
        layer.dda_line(cx - 3, top_lilin + 10, cx + 3, top_lilin + 13, warna_emas_lilin);

        let garis_lilin = { r: 45, g: 95, b: 155 };
        layer.dda_line(cx - r_lilin, top_lilin, cx - r_lilin, y2, garis_lilin);
        layer.dda_line(cx + r_lilin - 1, top_lilin, cx + r_lilin - 1, y2, garis_lilin);

        let elips_atas_lilin = Bentuk.elips(cx, top_lilin, r_lilin, ry_lilin, 20);
        Bentuk.isi(layer, elips_atas_lilin, garis_lilin, { r: 210, g: 240, b: 255 }, { x: cx, y: top_lilin });
        layer.draw_dot(cx, top_lilin, { r: 70, g: 130, b: 190 });

        let top_sumbu = top_lilin - 5;
        layer.dda_line(cx, top_lilin, cx, top_sumbu, { r: 35, g: 25, b: 30 });

        layer.draw_dot(cx, top_sumbu, { r: 255, g: 80, b: 40 });

        let nyala_luar = Bentuk.cardioid(cx, top_sumbu - 7, 3.5, 24);
        Bentuk.isi(layer, nyala_luar, api_luar, api_luar, { x: cx, y: top_sumbu - 7 }, krem);
        let nyala_dalam = Bentuk.cardioid(cx, top_sumbu - 6, 1.8, 18);
        Bentuk.isi(layer, nyala_dalam, api_dalam, api_dalam, { x: cx, y: top_sumbu - 6 }, api_luar);
    }

    buat_sprite(info) {
        let layer = buat_layer(300, 400);

        Bentuk.isi(layer, Bentuk.kotak(0, 0, 299, 399), tinta_utama, krem, { x: 150, y: 200 });

        layer.polygon(Bentuk.kotak(10, 10, 279, 379), emas);
        layer.polygon(Bentuk.kotak(13, 13, 273, 373), emas_muda);

        layer.dda_line(32, 26, 75, 26, emas_muda);
        layer.dda_line(225, 26, 268, 26, emas_muda);
        this.tulis(layer, "Y O U ' R E   I N V I T E D", 150, 26, 11, "#9e2a52", "bold", "'Georgia', serif", 160);

        let pita = [
            { x: 26, y: 44 }, { x: 274, y: 44 }, { x: 262, y: 57 },
            { x: 274, y: 70 }, { x: 26, y: 70 }, { x: 38, y: 57 }
        ];
        Bentuk.isi(layer, pita, tinta_utama, pink_pita, { x: 150, y: 57 }, krem);
        layer.dda_line(38, 46, 262, 46, emas_muda);
        layer.dda_line(38, 68, 262, 68, emas_muda);
        this.tulis(layer, "HAPPY BIRTHDAY", 150, 57, 18, "#ffffff", "bold", "'Georgia', serif", 210);

        this.tulis(layer, info.nama, 150, 98, 28, "#a61e4d", "bold", "'Georgia', serif", 230);
        this.tulis(layer, "Merayakan Ulang Tahun ke-" + info.umur, 150, 126, 13, "#554450", "bold", "'Segoe UI', sans-serif", 240);

        this.gambar_kue(layer, 150, 212);

        layer.dda_line(35, 230, 265, 230, emas_muda);

        let kotak_info = Bentuk.kotak(24, 244, 252, 70);
        let bg_info = { r: 253, g: 248, b: 250 };
        Bentuk.isi(layer, kotak_info, emas, bg_info, { x: 150, y: 275 }, krem);
        layer.polygon(Bentuk.kotak(26, 246, 248, 66), emas_muda);

        this.tulis(layer, "Waktu   :  " + info.tanggal, 150, 264, 13, "#2d2228", "bold", "'Segoe UI', sans-serif", 235);
        this.tulis(layer, "Tempat  :  " + info.tempat, 150, 294, 13, "#2d2228", "bold", "'Segoe UI', sans-serif", 235);

        this.tulis(layer, "Ditunggu kehadiran dan doa restunya", 150, 338, 12, "#9e2a52", "italic", "'Georgia', serif", 250);
        this.tulis(layer, "•  R S V P   T E R B U K A  •", 150, 362, 10, "#907d88", "bold", "'Segoe UI', sans-serif", 200);

        return layer.image_data;
    }
}
