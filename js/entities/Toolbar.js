import { buat_layer } from "../lib/Graflib.js";
import MatrixClass from "../lib/MatrixClass.js";
import Bentuk from "../gfx/Bentuk.js";
import Ikon from "../gfx/Ikon.js";

let mat = new MatrixClass();
let LEBAR = 160;
let TINGGI = 64;

export default class Toolbar {
    constructor() {
        this.nama_ikon = ["balon", "popper"];
        this.ikon = [];
        for (let i = 0; i < this.nama_ikon.length; i++) {
            this.ikon.push(Ikon.buat(this.nama_ikon[i]));
        }

        let layer = buat_layer(LEBAR, TINGGI);
        let garis_panel = { r: 195, g: 175, b: 150 };
        let emas_panel = { r: 218, g: 178, b: 88 };
        let bg_panel = { r: 252, g: 250, b: 246 };
        let bg_tombol = { r: 244, g: 238, b: 230 };

        Bentuk.isi(layer, Bentuk.kotak(0, 0, LEBAR - 1, TINGGI - 1), garis_panel, bg_panel, { x: 10, y: 10 });
        layer.polygon(Bentuk.kotak(2, 2, LEBAR - 5, TINGGI - 5), emas_panel);

        let posisi_x = [42, 118];
        for (let i = 0; i < posisi_x.length; i++) {
            let cx = posisi_x[i];
            let cy = Math.round(TINGGI / 2);
            layer.midpoint_circle(cx, cy, 23, garis_panel);
            layer.floodFillStack(cx, cy, bg_panel, bg_tombol);
        }
        this.panel = layer.image_data;

        this.muncul = 0;
        this.hover = -1;
    }

    x_panel() {
        return 400 - LEBAR / 2;
    }

    y_panel() {
        return 484 + (1 - this.muncul) * 110;
    }

    pusat(i) {
        let posisi_x = [42, 118];
        return { x: this.x_panel() + posisi_x[i], y: this.y_panel() + TINGGI / 2 };
    }

    kena(px, py) {
        if (this.muncul < 0.9) return -1;
        for (let i = 0; i < this.ikon.length; i++) {
            let c = this.pusat(i);
            if (Math.abs(px - c.x) < 28 && Math.abs(py - c.y) < 28) return i;
        }
        return -1;
    }

    perbarui(dt, hover, aktif) {
        if (aktif) this.muncul = Math.min(1, this.muncul + dt * 2.2);
        this.hover = hover;
    }

    gambar(lib) {
        if (this.muncul <= 0) return;
        lib.blit(this.panel, mat.create_translation(this.x_panel(), this.y_panel()));
        for (let i = 0; i < this.ikon.length; i++) {
            let c = this.pusat(i);
            let skala = 0.72;
            if (this.hover == i) skala = 0.88;
            lib.blit(this.ikon[i], mat.create_model(c.x, c.y, 0, skala, skala, 32, 32));
        }
    }
}
