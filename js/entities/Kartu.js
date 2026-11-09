import { buat_layer } from "../lib/Graflib.js";
import MatrixClass from "../lib/MatrixClass.js";
import Bentuk from "../gfx/Bentuk.js";
import Teks from "../gfx/Teks.js";

let mat = new MatrixClass();

let krem = { r: 254, g: 251, b: 246 };
let tinta_utama = { r: 60, g: 45, b: 52 };
let emas = { r: 205, g: 160, b: 65 };
let emas_muda = { r: 232, g: 195, b: 105 };
let merah_marun = { r: 138, g: 32, b: 50 };

let kue_krim = { r: 255, g: 252, b: 248 };
let kue_bolu = { r: 236, g: 205, b: 172 };
let kue_garis = { r: 145, g: 115, b: 88 };
let api_luar = { r: 255, g: 185, b: 35 };
let api_dalam = { r: 255, g: 95, b: 25 };

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
        let warna_halo = { r: 255, g: 238, b: 165 };
        lib.lingkaran_polar(Math.round(cx), Math.round(cy), r_halo, warna_halo);

        let api_luar_pts = Bentuk.cardioid(cx, cy, r_nafas, 24);
        Bentuk.isi(lib, api_luar_pts, api_luar, api_luar, { x: cx, y: cy });

        let api_tengah_pts = Bentuk.cardioid(cx, cy, r_nafas * 0.65, 18);
        Bentuk.isi(lib, api_tengah_pts, api_dalam, api_dalam, { x: cx, y: cy }, api_luar);

        let api_inti_pts = Bentuk.cardioid(cx, cy + 1, r_nafas * 0.35, 14);
        Bentuk.isi(lib, api_inti_pts, { r: 255, g: 255, b: 230 }, { r: 255, g: 255, b: 230 }, { x: cx, y: cy + 1 }, api_dalam);

        lib.draw_dot(Math.round(cx), Math.round(sy - 1), { r: 45, g: 35, b: 30 });
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
                r: Math.round(205 + gelap * 40),
                g: Math.round(175 + gelap * 35),
                b: Math.round(145 + gelap * 32)
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
                r: Math.round(205 + gelap * 40),
                g: Math.round(175 + gelap * 35),
                b: Math.round(145 + gelap * 32)
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
            { r: 210, g: 190, b: 160 },
            { r: 228, g: 210, b: 182 },
            { r: 242, g: 228, b: 205 },
            { r: 255, g: 250, b: 238 },
            { r: 242, g: 228, b: 205 },
            { r: 224, g: 205, b: 175 },
            { r: 210, g: 190, b: 160 },
            { r: 195, g: 175, b: 145 }
        ];

        for (let i = 0; i < shading_lilin.length; i++) {
            let x = (cx - r_lilin) + i;
            let c = shading_lilin[i];
            layer.dda_line(x, top_lilin, x, y2, c);
        }

        let warna_emas_lilin = { r: 225, g: 185, b: 90 };
        layer.dda_line(cx - 3, top_lilin + 5, cx + 3, top_lilin + 8, warna_emas_lilin);
        layer.dda_line(cx - 3, top_lilin + 11, cx + 3, top_lilin + 14, warna_emas_lilin);

        let garis_lilin = { r: 165, g: 140, b: 110 };
        layer.dda_line(cx - r_lilin, top_lilin, cx - r_lilin, y2, garis_lilin);
        layer.dda_line(cx + r_lilin - 1, top_lilin, cx + r_lilin - 1, y2, garis_lilin);

        let elips_atas_lilin = Bentuk.elips(cx, top_lilin, r_lilin, ry_lilin, 20);
        Bentuk.isi(layer, elips_atas_lilin, garis_lilin, { r: 248, g: 240, b: 225 }, { x: cx, y: top_lilin });
        layer.draw_dot(cx, top_lilin, { r: 155, g: 130, b: 100 });

        let top_sumbu = top_lilin - 5;
        layer.dda_line(cx, top_lilin, cx, top_sumbu, { r: 45, g: 35, b: 30 });
        layer.draw_dot(cx, top_sumbu, { r: 255, g: 120, b: 40 });

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

        layer.dda_line(30, 26, 75, 26, emas_muda);
        layer.dda_line(225, 26, 270, 26, emas_muda);
        this.tulis(layer, "Y O U ' R E   I N V I T E D", 150, 26, 11, "#8a6525", "bold", "'Georgia', serif", 160);

        let pita = [
            { x: 30, y: 46 }, { x: 270, y: 46 }, { x: 260, y: 58 },
            { x: 270, y: 70 }, { x: 30, y: 70 }, { x: 40, y: 58 }
        ];
        Bentuk.isi(layer, pita, tinta_utama, merah_marun, { x: 150, y: 58 }, krem);
        layer.dda_line(40, 48, 260, 48, emas_muda);
        layer.dda_line(40, 68, 260, 68, emas_muda);
        this.tulis(layer, "HAPPY BIRTHDAY", 150, 58, 16, "#ffffff", "bold", "'Georgia', serif", 210);

        this.tulis(layer, info.nama, 150, 98, 26, "#7a1a2e", "bold", "'Georgia', serif", 230);
        this.tulis(layer, "Merayakan Ulang Tahun ke-" + info.umur, 150, 126, 13, "#5a4850", "bold", "'Segoe UI', sans-serif", 240);

        this.gambar_kue(layer, 150, 212);

        layer.dda_line(35, 230, 265, 230, emas_muda);

        let kotak_info = Bentuk.kotak(24, 244, 252, 70);
        let bg_info = { r: 252, g: 248, b: 244 };
        Bentuk.isi(layer, kotak_info, emas, bg_info, { x: 150, y: 275 }, krem);
        layer.polygon(Bentuk.kotak(26, 246, 248, 66), emas_muda);

        this.tulis(layer, "Waktu   :  " + info.tanggal, 150, 264, 13, "#2d2426", "bold", "'Segoe UI', sans-serif", 235);
        this.tulis(layer, "Tempat  :  " + info.tempat, 150, 294, 13, "#2d2426", "bold", "'Segoe UI', sans-serif", 235);

        this.tulis(layer, "Ditunggu kehadiran dan doa restunya", 150, 338, 12, "#7a1a2e", "italic", "'Georgia', serif", 250);
        this.tulis(layer, "•  R S V P   T E R B U K A  •", 150, 362, 10, "#8a7570", "bold", "'Segoe UI', sans-serif", 200);

        return layer.image_data;
    }
}
