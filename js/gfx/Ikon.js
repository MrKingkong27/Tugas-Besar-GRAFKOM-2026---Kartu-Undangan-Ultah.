import { buat_layer } from "../lib/Graflib.js";
import Bentuk from "./Bentuk.js";

export default class Ikon {
    static buat(nama) {
        let layer = buat_layer(64, 64);
        Ikon[nama](layer);
        return layer.image_data;
    }

    static hati(layer) {
        Bentuk.isi(layer, Bentuk.hati(32, 28, 1.7), { r: 120, g: 30, b: 45 }, { r: 180, g: 50, b: 70 }, { x: 32, y: 28 });
        layer.midpoint_circle(26, 20, 2, { r: 240, g: 180, b: 195 });
        layer.draw_dot(26, 20, { r: 255, g: 240, b: 245 });
    }

    static bintang(layer) {
        let emas_tua = { r: 160, g: 110, b: 35 };
        let emas_terang = { r: 225, g: 180, b: 65 };
        Bentuk.isi(layer, Bentuk.bintang(32, 34, 28, 12), emas_tua, emas_terang, { x: 32, y: 34 });

        let emas_inti = { r: 250, g: 230, b: 155 };
        Bentuk.isi(layer, Bentuk.bintang(32, 34, 12, 5), emas_terang, emas_inti, { x: 32, y: 34 }, emas_terang);
    }

    static api(layer) {
        let oranye = { r: 235, g: 120, b: 35 };
        let titik_luar = [
            { x: 32, y: 4 }, { x: 46, y: 24 }, { x: 54, y: 40 }, { x: 48, y: 56 }, { x: 32, y: 61 },
            { x: 16, y: 56 }, { x: 10, y: 40 }, { x: 18, y: 26 }, { x: 22, y: 34 }, { x: 26, y: 18 }
        ];
        let titik_dalam = [
            { x: 32, y: 34 }, { x: 40, y: 46 }, { x: 38, y: 56 }, { x: 32, y: 58 }, { x: 26, y: 56 }, { x: 24, y: 46 }
        ];
        Bentuk.isi(layer, titik_luar, { r: 150, g: 50, b: 20 }, oranye, { x: 32, y: 46 });
        Bentuk.isi(layer, titik_dalam, oranye, { r: 250, g: 200, b: 70 }, { x: 32, y: 48 }, oranye);
        layer.midpoint_circle(32, 50, 3, { r: 255, g: 245, b: 200 });
    }

    static balon(layer) {
        let garis = { r: 135, g: 95, b: 55 };
        let warna = { r: 210, g: 172, b: 120 };
        Bentuk.isi(layer, Bentuk.elips(32, 26, 17, 21, 30), garis, warna, { x: 32, y: 26 });
        Bentuk.isi(layer, [{ x: 32, y: 47 }, { x: 27, y: 54 }, { x: 37, y: 54 }], garis, warna);
        layer.dda_line(32, 54, 28, 60, garis);
        layer.dda_line(28, 60, 34, 63, garis);

        let kilau = Bentuk.elips(25, 20, 4, 7, 16);
        layer.polygon(kilau, { r: 245, g: 228, b: 200 });
    }

    static popper(layer) {
        let kerucut = [{ x: 8, y: 58 }, { x: 20, y: 22 }, { x: 42, y: 44 }];
        Bentuk.isi(layer, kerucut, { r: 135, g: 95, b: 55 }, { r: 195, g: 155, b: 90 }, { x: 22, y: 42 });

        layer.dda_line(14, 40, 31, 51, { r: 240, g: 205, b: 120 });

        layer.fill_rect(38, 12, 4, 4, { r: 225, g: 185, b: 90 });
        layer.fill_rect(50, 24, 4, 4, { r: 180, g: 60, b: 75 });
        layer.fill_rect(28, 6, 4, 4, { r: 240, g: 215, b: 135 });
        layer.fill_rect(52, 40, 4, 4, { r: 195, g: 150, b: 85 });
        layer.fill_rect(44, 2, 4, 4, { r: 250, g: 235, b: 200 });
    }
}
