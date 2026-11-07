
export default class MatrixClass {
    multiply(matA, matB) {
        const hasil = [];
        for (let i = 0; i < matA.length; i++) {
            hasil[i] = [];
            for (let j = 0; j < matB[0].length; j++) {
                let jumlah = 0;
                for (let k = 0; k < matB.length; k++) {
                    jumlah += matA[i][k] * matB[k][j];
                }
                hasil[i][j] = jumlah;
            }
        }
        return hasil;
    }

    transform_point(point, matT) {
        let x1 = matT[0][0] * point.x + matT[0][1] * point.y + matT[0][2];
        let y1 = matT[1][0] * point.x + matT[1][1] * point.y + matT[1][2];
        return { x: x1, y: y1 };
    }

    transform_points(points, matT) {
        let hasil = [];
        for (let i = 0; i < points.length; i++) {
            hasil.push(this.transform_point(points[i], matT));
        }
        return hasil;
    }

    create_translation(tx, ty) {
        return [
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]
        ];
    }

    create_scale(sx, sy) {
        return [
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ];
    }

    create_rotation(sudut) {
        return [
            [Math.cos(sudut), -Math.sin(sudut), 0],
            [Math.sin(sudut), Math.cos(sudut), 0],
            [0, 0, 1]
        ];
    }

    create_fixedp_scale(xc, yc, sx, sy) {
        let m1 = this.create_translation(-xc, -yc);
        let m2 = this.create_scale(sx, sy);
        let m3 = this.create_translation(xc, yc);
        let hasil = this.multiply(m3, m2);
        return this.multiply(hasil, m1);
    }

    create_model(x, y, sudut, skala_x, skala_y, ox, oy) {
        let hasil = this.multiply(this.create_translation(x, y), this.create_rotation(sudut));
        hasil = this.multiply(hasil, this.create_scale(skala_x, skala_y));
        return this.multiply(hasil, this.create_translation(-ox, -oy));
    }

    invert(m) {
        let det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
        if (Math.abs(det) < 0.000001) return null;
        return [
            [m[1][1] / det, -m[0][1] / det, (m[0][1] * m[1][2] - m[0][2] * m[1][1]) / det],
            [-m[1][0] / det, m[0][0] / det, (m[0][2] * m[1][0] - m[0][0] * m[1][2]) / det],
            [0, 0, 1]
        ];
    }
}
