
import { buat_layer } from "../lib/Graflib.js?v=3";
import Bentuk from "./Bentuk.js?v=3";

export default class Latar {
    constructor(lebar, tinggi, lantai) {
        let layer = buat_layer(lebar, tinggi);

        let warna_dinding = { r: 248, g: 245, b: 240 };
        let garis_wallpaper = { r: 240, g: 236, b: 230 };
        layer.fill_rect(0, 0, lebar, lantai, warna_dinding);

        for (let x = 20; x < lebar; x += 40) {
            layer.dda_line(x, 0, x, lantai, garis_wallpaper);
        }

        let warna_bendera = [
            { r: 205, g: 130, b: 145 },
            { r: 220, g: 185, b: 120 }
        ];
        let warna_tali = { r: 185, g: 175, b: 165 };

        let titik_tali = [];
        let jumlah_segmen = 40;
        for (let i = 0; i <= jumlah_segmen; i++) {
            let x = Math.round((i / jumlah_segmen) * lebar);
            let y = Math.round(8 + 14 * Math.sin((i / jumlah_segmen) * Math.PI));
            titik_tali.push({ x: x, y: y });
        }
        for (let i = 0; i < titik_tali.length - 1; i++) {
            layer.dda_line(titik_tali[i].x, titik_tali[i].y, titik_tali[i + 1].x, titik_tali[i + 1].y, warna_tali);
        }

        let jumlah_bendera = 12;
        for (let i = 0; i < jumlah_bendera; i++) {
            let t1 = (i + 0.15) / jumlah_bendera;
            let t2 = (i + 0.85) / jumlah_bendera;
            let x1 = Math.round(t1 * lebar);
            let y1 = Math.round(8 + 14 * Math.sin(t1 * Math.PI));
            let x2 = Math.round(t2 * lebar);
            let y2 = Math.round(8 + 14 * Math.sin(t2 * Math.PI));
            let xm = Math.round((x1 + x2) / 2);
            let ym = Math.round(Math.max(y1, y2) + 16);

            let segitiga = [{ x: x1, y: y1 }, { x: x2, y: y2 }, { x: xm, y: ym }];
            let warna = warna_bendera[i % warna_bendera.length];
            Bentuk.isi(layer, segitiga, warna_tali, warna, { x: xm, y: ym - 4 }, warna_dinding);
        }

        let warna_meja = { r: 220, g: 205, b: 190 };
        let garis_meja = { r: 175, g: 155, b: 135 };
        let lis_putih = { r: 255, g: 250, b: 245 };
        let lis_emas = { r: 230, g: 185, b: 85 };

        layer.fill_rect(0, lantai, lebar, tinggi - lantai, warna_meja);
        layer.dda_line(0, lantai, lebar - 1, lantai, garis_meja);
        layer.dda_line(0, lantai + 2, lebar - 1, lantai + 2, lis_emas);
        layer.dda_line(0, lantai + 4, lebar - 1, lantai + 4, lis_putih);

        let taplak = [
            { x: 180, y: lantai + 4 }, { x: 620, y: lantai + 4 },
            { x: 650, y: tinggi - 1 }, { x: 150, y: tinggi - 1 }
        ];
        let warna_taplak = { r: 248, g: 242, b: 244 };
        Bentuk.isi(layer, taplak, lis_emas, warna_taplak, { x: 400, y: lantai + 20 }, warna_meja);

        this.data = layer.data;
    }

    gambar(lib) {
        lib.data.set(this.data);
    }
}
