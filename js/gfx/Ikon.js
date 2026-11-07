
import { buat_layer } from "../lib/Graflib.js";
import Bentuk from "./Bentuk.js";

export default class Ikon {
    static buat(nama) {
        let layer = buat_layer(64, 64);
        Ikon[nama](layer);
        return layer.image_data;
    }

    static hati(layer) {
        Bentuk.isi(layer, Bentuk.hati(32, 28, 1.7), { r: 150, g: 20, b: 60 }, { r: 240, g: 60, b: 100 }, { x: 32, y: 28 });

        layer.midpoint_circle(26, 20, 2, { r: 255, g: 200, b: 220 });
        layer.draw_dot(26, 20, { r: 255, g: 255, b: 255 });
    }

    static bintang(layer) {
        let emas_tua = { r: 180, g: 120, b: 10 };
        let emas_terang = { r: 255, g: 215, b: 50 };
        Bentuk.isi(layer, Bentuk.bintang(32, 34, 28, 12), emas_tua, emas_terang, { x: 32, y: 34 });

        let emas_inti = { r: 255, g: 245, b: 180 };
        Bentuk.isi(layer, Bentuk.bintang(32, 34, 12, 5), emas_terang, emas_inti, { x: 32, y: 34 }, emas_terang);
    }

    static api(layer) {
        let oranye = { r: 250, g: 110, b: 20 };
        let titik_luar = [
            { x: 32, y: 4 }, { x: 46, y: 24 }, { x: 54, y: 40 }, { x: 48, y: 56 }, { x: 32, y: 61 },
            { x: 16, y: 56 }, { x: 10, y: 40 }, { x: 18, y: 26 }, { x: 22, y: 34 }, { x: 26, y: 18 }
        ];
        let titik_dalam = [
            { x: 32, y: 34 }, { x: 40, y: 46 }, { x: 38, y: 56 }, { x: 32, y: 58 }, { x: 26, y: 56 }, { x: 24, y: 46 }
        ];
        Bentuk.isi(layer, titik_luar, { r: 160, g: 40, b: 10 }, oranye, { x: 32, y: 46 });
        Bentuk.isi(layer, titik_dalam, oranye, { r: 255, g: 210, b: 50 }, { x: 32, y: 48 }, oranye);
        layer.midpoint_circle(32, 50, 3, { r: 255, g: 250, b: 200 });
    }

    static balon(layer) {
        let garis = { r: 20, g: 70, b: 140 };
        let biru = { r: 70, g: 150, b: 240 };
        Bentuk.isi(layer, Bentuk.elips(32, 26, 17, 21, 30), garis, biru, { x: 32, y: 26 });
        Bentuk.isi(layer, [{ x: 32, y: 47 }, { x: 27, y: 54 }, { x: 37, y: 54 }], garis, biru);
        layer.dda_line(32, 54, 28, 60, garis);
        layer.dda_line(28, 60, 34, 63, garis);

        let kilau = Bentuk.elips(25, 20, 4, 7, 16);
        layer.polygon(kilau, { r: 200, g: 230, b: 255 });
    }

    static popper(layer) {
        let kerucut = [{ x: 8, y: 58 }, { x: 20, y: 22 }, { x: 42, y: 44 }];
        Bentuk.isi(layer, kerucut, { r: 90, g: 30, b: 140 }, { r: 170, g: 90, b: 240 }, { x: 22, y: 42 });

        layer.dda_line(14, 40, 31, 51, { r: 255, g: 210, b: 40 });

        layer.fill_rect(38, 12, 5, 5, { r: 240, g: 70, b: 90 });
        layer.fill_rect(50, 24, 5, 5, { r: 80, g: 170, b: 255 });
        layer.fill_rect(28, 6, 5, 5, { r: 255, g: 200, b: 40 });
        layer.fill_rect(52, 40, 5, 5, { r: 110, g: 210, b: 110 });
        layer.fill_rect(44, 2, 4, 4, { r: 255, g: 140, b: 200 });
    }
}
