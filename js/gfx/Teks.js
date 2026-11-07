
export default class Teks {
    static buat(teks, ukuran, warna, gaya = "normal", keluarga = "'Georgia', 'Times New Roman', serif") {
        let kanvas = document.createElement("canvas");
        let ctx = kanvas.getContext("2d");
        let font = `${gaya} ${ukuran}px ${keluarga}`;

        ctx.font = font;
        let lebar = Math.ceil(ctx.measureText(teks).width) + 8;
        let tinggi = Math.ceil(ukuran * 1.6) + 4;

        kanvas.width = Math.max(1, lebar);
        kanvas.height = Math.max(1, tinggi);
        ctx.font = font;
        ctx.fillStyle = warna;
        ctx.textBaseline = "middle";
        ctx.fillText(teks, 4, tinggi / 2);
        return ctx.getImageData(0, 0, kanvas.width, kanvas.height);
    }
}
