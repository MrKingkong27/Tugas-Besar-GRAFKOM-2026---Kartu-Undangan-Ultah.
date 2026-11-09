
import { Graflib } from "./lib/Graflib.js?v=6";
import Latar from "./gfx/Latar.js?v=6";
import Undangan from "./scenes/Undangan.js?v=6";

let canvas_handler = document.querySelector("#mycanvas");
let context = canvas_handler.getContext("2d");

const image_data = context.getImageData(0, 0,
    canvas_handler.width,
    canvas_handler.height);

let lib = new Graflib(canvas_handler.width, canvas_handler.height, image_data);
let latar = new Latar(canvas_handler.width, canvas_handler.height, 450);

function ambil_info() {
    return {
        nama: document.querySelector("#nama").value || "Budi",
        umur: document.querySelector("#umur").value || "17",
        tanggal: document.querySelector("#tanggal").value,
        tempat: document.querySelector("#tempat").value
    };
}

let undangan = new Undangan(lib, ambil_info());
let mouse_x = -1;
let mouse_y = -1;

function posisi_mouse(event) {
    let kotak = canvas_handler.getBoundingClientRect();
    mouse_x = (event.clientX - kotak.left) * canvas_handler.width / kotak.width;
    mouse_y = (event.clientY - kotak.top) * canvas_handler.height / kotak.height;
}

canvas_handler.addEventListener("mousemove", posisi_mouse);
canvas_handler.addEventListener("click", function (event) {
    posisi_mouse(event);
    undangan.klik(mouse_x, mouse_y);
});
window.addEventListener("keydown", function (event) {
    if (event.target.tagName == "INPUT") return;
    if (event.key == " ") event.preventDefault();
    undangan.tombol(event.key);
});
document.querySelector("#terapkan").onclick = function () { undangan.ganti_info(ambil_info()); };
document.querySelector("#ulang").onclick = function () { undangan.reset(); };

function gambar() {
    latar.gambar(lib);
    undangan.gambar();
    context.putImageData(image_data, 0, 0);
}

let waktu_lalu = performance.now();

function animasi(waktu_sekarang) {
    let dt = (waktu_sekarang - waktu_lalu) / 1000;
    if (dt > 0.05) dt = 0.05;
    waktu_lalu = waktu_sekarang;

    undangan.perbarui(dt, mouse_x, mouse_y);
    canvas_handler.style.cursor = undangan.bisa_diklik(mouse_x, mouse_y) ? "pointer" : "default";
    gambar();
    requestAnimationFrame(animasi);
}

requestAnimationFrame(animasi);
