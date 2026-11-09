
import MatrixClass from "./MatrixClass.js";
let mat = new MatrixClass();

export function buat_layer(lebar, tinggi) {
    let kanvas = document.createElement("canvas");
    kanvas.width = lebar;
    kanvas.height = tinggi;
    let image_data = kanvas.getContext("2d").getImageData(0, 0, lebar, tinggi);
    return new Graflib(lebar, tinggi, image_data);
}

export class Graflib {
    constructor(c_width, c_height, image_data) {
        this.canvas_width = c_width;
        this.canvas_height = c_height;
        this.image_data = image_data;
        this.data = image_data.data;
        this.clip = null;
    }

    set_clip(x1, y1, x2, y2) {
        this.clip = { x1: x1, y1: y1, x2: x2, y2: y2 };
    }

    reset_clip() {
        this.clip = null;
    }

    draw_dot(x, y, color) {
        if (x < 0 || x >= this.canvas_width || y < 0 || y >= this.canvas_height) return;
        if (this.clip != null) {
            if (x < this.clip.x1 || x >= this.clip.x2 || y < this.clip.y1 || y >= this.clip.y2) return;
        }
        let index = 4 * (x + (y * this.canvas_width));
        this.data[index] = color.r;
        this.data[index + 1] = color.g;
        this.data[index + 2] = color.b;
        this.data[index + 3] = 255;
    }

    get_dot(x, y) {
        let index = 4 * (x + y * this.canvas_width);
        return {
            r: this.data[index],
            g: this.data[index + 1],
            b: this.data[index + 2]
        };
    }

    is_color_same(color1, color2) {
        if (color1.r == color2.r && color1.g == color2.g && color1.b == color2.b) {
            return 1;
        }
        return 0;
    }

    dda_line(x1, y1, x2, y2, color) {
        let awal_x = Math.round(x1);
        let awal_y = Math.round(y1);
        let akhir_x = Math.round(x2);
        let akhir_y = Math.round(y2);

        let dx = akhir_x - awal_x;
        let dy = akhir_y - awal_y;
        let langkah = Math.max(Math.abs(dx), Math.abs(dy));
        if (langkah == 0) {
            this.draw_dot(awal_x, awal_y, color);
            return;
        }
        let x = awal_x;
        let y = awal_y;
        for (let i = 0; i <= langkah; i++) {
            this.draw_dot(Math.round(x), Math.round(y), color);
            x += dx / langkah;
            y += dy / langkah;
        }
    }

    bresenham_line(x1, y1, x2, y2, color) {
        x1 = Math.round(x1);
        y1 = Math.round(y1);
        x2 = Math.round(x2);
        y2 = Math.round(y2);

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.draw_dot(x1, y1, color);
            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    polygon(kump_titik, color) {
        for (let i = 0; i < kump_titik.length; i++) {
            let titik_awal = kump_titik[i];
            let titik_akhir = kump_titik[(i + 1) % kump_titik.length];
            this.dda_line(titik_awal.x, titik_awal.y, titik_akhir.x, titik_akhir.y, color);
        }
    }

    lingkaran_polar(xc, yc, radius, color) {
        if (radius <= 0) return;
        for (let sudut = 0; sudut <= Math.PI * 2; sudut += 1 / radius) {
            let x = Math.round(xc + radius * Math.cos(sudut));
            let y = Math.round(yc + radius * Math.sin(sudut));
            this.draw_dot(x, y, color);
        }
    }

    midpoint_circle(xc, yc, radius, color) {
        let r = Math.round(radius);
        if (r <= 0) return;
        let x = 0;
        let y = r;
        let p = 1 - r;

        let gambar8 = (cx, cy, px, py) => {
            this.draw_dot(cx + px, cy + py, color);
            this.draw_dot(cx - px, cy + py, color);
            this.draw_dot(cx + px, cy - py, color);
            this.draw_dot(cx - px, cy - py, color);
            this.draw_dot(cx + py, cy + px, color);
            this.draw_dot(cx - py, cy + px, color);
            this.draw_dot(cx + py, cy - px, color);
            this.draw_dot(cx - py, cy - px, color);
        };

        gambar8(Math.round(xc), Math.round(yc), x, y);
        while (x < y) {
            x++;
            if (p < 0) {
                p += 2 * x + 1;
            } else {
                y--;
                p += 2 * (x - y) + 1;
            }
            gambar8(Math.round(xc), Math.round(yc), x, y);
        }
    }

    fill_rect(x, y, lebar, tinggi, color) {
        for (let j = 0; j < tinggi; j++) {
            for (let i = 0; i < lebar; i++) {
                this.draw_dot(x + i, y + j, color);
            }
        }
    }

    floodFillStack(x0, y0, warna_lama, warna_baru) {
        if (this.is_color_same(warna_lama, warna_baru) == 1) return;

        let tumpukan = [];
        tumpukan.push({ x: Math.round(x0), y: Math.round(y0) });

        while (tumpukan.length > 0) {
            let titik_skrg = tumpukan.pop();
            let x = titik_skrg.x;
            let y = titik_skrg.y;

            if (x < 0 || x >= this.canvas_width || y < 0 || y >= this.canvas_height) continue;
            if (this.is_color_same(this.get_dot(x, y), warna_lama) == 0) continue;

            this.draw_dot(x, y, warna_baru);
            tumpukan.push({ x: x + 1, y: y });
            tumpukan.push({ x: x - 1, y: y });
            tumpukan.push({ x: x, y: y + 1 });
            tumpukan.push({ x: x, y: y - 1 });
        }
    }

    blit(sprite, matriks, alpha) {
        if (alpha == undefined) alpha = 1;

        let is_lurus = Math.abs(matriks[0][1]) < 0.0001 && Math.abs(matriks[1][0]) < 0.0001
            && Math.abs(matriks[0][0] - 1) < 0.0001 && Math.abs(matriks[1][1] - 1) < 0.0001;

        if (is_lurus) {
            let ox = Math.round(matriks[0][2]);
            let oy = Math.round(matriks[1][2]);
            let sx_min = Math.max(0, -ox);
            let sy_min = Math.max(0, -oy);
            let sx_maks = Math.min(sprite.width, this.canvas_width - ox);
            let sy_maks = Math.min(sprite.height, this.canvas_height - oy);
            if (this.clip != null) {
                sx_min = Math.max(sx_min, this.clip.x1 - ox);
                sy_min = Math.max(sy_min, this.clip.y1 - oy);
                sx_maks = Math.min(sx_maks, this.clip.x2 - ox);
                sy_maks = Math.min(sy_maks, this.clip.y2 - oy);
            }
            if (sx_min >= sx_maks || sy_min >= sy_maks) return;

            for (let sy = sy_min; sy < sy_maks; sy++) {
                let y = oy + sy;
                let row_s = sy * sprite.width;
                let row_d = y * this.canvas_width;
                for (let sx = sx_min; sx < sx_maks; sx++) {
                    let i = 4 * (sx + row_s);
                    let a = (sprite.data[i + 3] / 255) * alpha;
                    if (a <= 0) continue;
                    let j = 4 * (ox + sx + row_d);
                    for (let k = 0; k < 3; k++) {
                        this.data[j + k] = this.data[j + k] + (sprite.data[i + k] - this.data[j + k]) * a;
                    }
                    this.data[j + 3] = 255;
                }
            }
            return;
        }

        let balik = mat.invert(matriks);
        if (balik == null) return;

        let sudut = mat.transform_points([
            { x: 0, y: 0 }, { x: sprite.width, y: 0 },
            { x: sprite.width, y: sprite.height }, { x: 0, y: sprite.height }
        ], matriks);
        let x_min = this.canvas_width, y_min = this.canvas_height, x_maks = 0, y_maks = 0;
        for (let i = 0; i < 4; i++) {
            x_min = Math.min(x_min, sudut[i].x);
            x_maks = Math.max(x_maks, sudut[i].x);
            y_min = Math.min(y_min, sudut[i].y);
            y_maks = Math.max(y_maks, sudut[i].y);
        }
        x_min = Math.max(0, Math.floor(x_min));
        y_min = Math.max(0, Math.floor(y_min));
        x_maks = Math.min(this.canvas_width - 1, Math.ceil(x_maks));
        y_maks = Math.min(this.canvas_height - 1, Math.ceil(y_maks));
        if (this.clip != null) {
            x_min = Math.max(x_min, this.clip.x1);
            y_min = Math.max(y_min, this.clip.y1);
            x_maks = Math.min(x_maks, this.clip.x2 - 1);
            y_maks = Math.min(y_maks, this.clip.y2 - 1);
        }
        if (x_min > x_maks || y_min > y_maks) return;

        for (let y = y_min; y <= y_maks; y++) {
            for (let x = x_min; x <= x_maks; x++) {
                let u = Math.floor(balik[0][0] * (x + 0.5) + balik[0][1] * (y + 0.5) + balik[0][2]);
                let v = Math.floor(balik[1][0] * (x + 0.5) + balik[1][1] * (y + 0.5) + balik[1][2]);
                if (u < 0 || v < 0 || u >= sprite.width || v >= sprite.height) continue;

                let i = 4 * (u + v * sprite.width);
                let a = sprite.data[i + 3] / 255 * alpha;
                if (a <= 0) continue;

                let j = 4 * (x + y * this.canvas_width);
                for (let k = 0; k < 3; k++) {
                    this.data[j + k] = this.data[j + k] + (sprite.data[i + k] - this.data[j + k]) * a;
                }
                this.data[j + 3] = 255;
            }
        }
    }
}
