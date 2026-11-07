
import { buat_layer } from "../lib/Graflib.js?v=3";
import Bentuk from "./Bentuk.js?v=3";

export default class Latar {
    constructor(lebar, tinggi, lantai) {
        let layer = buat_layer(lebar, tinggi);

        let warna_dinding = { r: 248, g: 244, b: 238 };
        let garis_wallpaper = { r: 238, g: 230, b: 220 };
        layer.fill_rect(0, 0, lebar, lantai, warna_dinding);

        for (let x = 20; x < lebar; x += 40) {
            layer.dda_line(x, 0, x, lantai, garis_wallpaper);
        }

        let warna_bendera = [
            { r: 245, g: 110, b: 135 },
            { r: 255, g: 200, b: 60 },
            { r: 90, g: 185, b: 220 },
            { r: 140, g: 215, b: 140 },
            { r: 185, g: 130, b: 225 }
        ];
        let warna_tali = { r: 180, g: 160, b: 150 };

        let titik_tali = [];
        let jumlah_segmen = 40;
        for (let i = 0; i <= jumlah_segmen; i++) {
            let x = Math.round((i / jumlah_segmen) * lebar);
            let y = Math.round(6 + 16 * Math.sin((i / jumlah_segmen) * Math.PI));
            titik_tali.push({ x: x, y: y });
        }
        for (let i = 0; i < titik_tali.length - 1; i++) {
            layer.dda_line(titik_tali[i].x, titik_tali[i].y, titik_tali[i + 1].x, titik_tali[i + 1].y, warna_tali);
        }

        let jumlah_bendera = 16;
        for (let i = 0; i < jumlah_bendera; i++) {
            let t1 = (i + 0.15) / jumlah_bendera;
            let t2 = (i + 0.85) / jumlah_bendera;
            let x1 = Math.round(t1 * lebar);
            let y1 = Math.round(6 + 16 * Math.sin(t1 * Math.PI));
            let x2 = Math.round(t2 * lebar);
            let y2 = Math.round(6 + 16 * Math.sin(t2 * Math.PI));
            let xm = Math.round((x1 + x2) / 2);
            let ym = Math.round(Math.max(y1, y2) + 14);

            let segitiga = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: xm, y: ym }];
            let warna = warna_bendera[i % warna_bendera.length];
            Bentuk.isi(layer, segitiga, warna_tali, warna, { x: xm, y: ym - 4 }, warna_dinding);
        }

        let titik_dekorasi = [
            { x: 70, y: 130, r: 4, c: { r: 255, g: 200, b: 60 } },
            { x: 130, y: 190, r: 3, c: { r: 245, g: 120, b: 150 } },
            { x: 220, y: 140, r: 4, c: { r: 100, g: 190, b: 230 } },
            { x: 600, y: 130, r: 4, c: { r: 140, g: 215, b: 140 } },
            { x: 680, y: 190, r: 3, c: { r: 255, g: 200, b: 60 } },
            { x: 730, y: 120, r: 4, c: { r: 245, g: 120, b: 150 } }
        ];
        for (let d of titik_dekorasi) {
            layer.midpoint_circle(d.x, d.y, d.r, d.c);
            layer.floodFillStack(d.x, d.y, warna_dinding, d.c);
        }

        let bintang_dinding = [
            { x: 90, y: 220, r1: 8, r2: 3, c: { r: 250, g: 210, b: 70 } },
            { x: 710, y: 230, r1: 8, r2: 3, c: { r: 250, g: 210, b: 70 } }
        ];
        for (let b of bintang_dinding) {
            Bentuk.isi(layer, Bentuk.bintang(b.x, b.y, b.r1, b.r2), b.c, b.c, { x: b.x, y: b.y }, warna_dinding);
        }

        let warna_meja = { r: 228, g: 214, b: 198 };
        let garis_meja = { r: 175, g: 155, b: 135 };
        let lis_putih = { r: 255, g: 250, b: 245 };
        let lis_emas = { r: 235, g: 185, b: 70 };

        layer.fill_rect(0, lantai, lebar, tinggi - lantai, warna_meja);
        layer.dda_line(0, lantai, lebar - 1, lantai, garis_meja);
        layer.dda_line(0, lantai + 2, lebar - 1, lantai + 2, lis_emas);
        layer.dda_line(0, lantai + 4, lebar - 1, lantai + 4, lis_putih);

        let taplak = [
            { x: 180, y: lantai + 4 }, { x: 620, y: lantai + 4 },
            { x: 650, y: tinggi - 1 }, { x: 150, y: tinggi - 1 }
        ];
        let warna_taplak = { r: 245, g: 236, b: 238 };
        Bentuk.isi(layer, taplak, lis_emas, warna_taplak, { x: 400, y: lantai + 20 }, warna_meja);

        this.data = layer.data;
    }

    gambar(lib) {
        lib.data.set(this.data);
    }
}
