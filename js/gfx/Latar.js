import { buat_layer } from "../lib/Graflib.js";
import Bentuk from "./Bentuk.js";

export default class Latar {
    constructor(lebar, tinggi, lantai) {
        let layer = buat_layer(lebar, tinggi);

        let warna_dinding = { r: 246, g: 243, b: 238 };
        let garis_panel = { r: 235, g: 230, b: 224 };
        let garis_aksen = { r: 225, g: 218, b: 210 };
        layer.fill_rect(0, 0, lebar, lantai, warna_dinding);

        for (let x = 40; x < lebar; x += 80) {
            layer.dda_line(x, 0, x, lantai, garis_panel);
        }
        layer.dda_line(0, 32, lebar - 1, 32, garis_aksen);
        layer.dda_line(0, 36, lebar - 1, 36, garis_panel);

        let warna_meja = { r: 195, g: 170, b: 145 };
        let garis_meja = { r: 145, g: 120, b: 95 };
        let lis_emas = { r: 218, g: 175, b: 88 };
        let lis_muda = { r: 240, g: 225, b: 205 };

        layer.fill_rect(0, lantai, lebar, tinggi - lantai, warna_meja);
        layer.dda_line(0, lantai, lebar - 1, lantai, garis_meja);
        layer.dda_line(0, lantai + 2, lebar - 1, lantai + 2, lis_emas);
        layer.dda_line(0, lantai + 4, lebar - 1, lantai + 4, lis_muda);

        let taplak = [
            { x: 190, y: lantai + 4 }, { x: 610, y: lantai + 4 },
            { x: 635, y: tinggi - 1 }, { x: 165, y: tinggi - 1 }
        ];
        let warna_taplak = { r: 252, g: 249, b: 244 };
        Bentuk.isi(layer, taplak, lis_emas, warna_taplak, { x: 400, y: lantai + 20 }, warna_meja);

        this.data = layer.data;
    }

    gambar(lib) {
        lib.data.set(this.data);
    }
}
