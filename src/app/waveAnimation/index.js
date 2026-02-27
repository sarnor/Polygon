// src/app/waveAnimation/index.js

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let w, h;
let points = [];
let time = 0;

const cols = 40;
const rows = 30;

let audioCtx, analyser, dataArray, source;
let audioPlaying = false;

// ===== Resize canvas =====
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createGrid();
}
window.addEventListener('resize', resize);
resize();

// ===== Create point grid =====
function createGrid() {
    points = [];

    const sideMargin = w * 0.08;
    const bottomMargin = h * 0.08;

    const horizon = h * 0.55;
    const bottom = h - bottomMargin;

    for (let y = 0; y < rows; y++) {

        const depth = y / (rows - 1);
        const perspective = 1 - depth * 0.85;

        // ширина ряда зависит от depth и экрана
        const usableWidth = Math.max(w * 0.7, w - sideMargin * 2);
        const rowWidth = usableWidth * perspective;

        const offsetX = sideMargin + (usableWidth - rowWidth) / 2;
        const rowY = bottom - (bottom - horizon) * depth;

        const spacingX = rowWidth / (cols - 1);
        const triangleOffset = (y % 2) * (spacingX / 2);

        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push({
                baseX: offsetX + x * spacingX + triangleOffset,
                baseY: rowY,
                depth: depth
            });
        }

        points.push(row);
    }
}

// ===== Audio setup =====
export default function initAudio(audio) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioPlaying = true;
    }
}

// ===== Animate =====
function animate() {
    ctx.clearRect(0, 0, w, h);
    time += 0.015;

    if (audioPlaying) {
        analyser.getByteFrequencyData(dataArray);
    }

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const p = points[y][x];

            // волна движения полотна
            const swell =
                Math.sin(p.baseY * 0.02 - time * 2 + p.baseX * 0.005) *
                25 *
                (1 - p.depth);

            // мелкая рябь
            const ripple =
                Math.sin(p.baseX * 0.04 + time * 2) *
                6 *
                (1 - p.depth);

            // ===== Audio influence =====
            let audioBoost = 0;
            if (audioPlaying) {
                const idx = Math.floor(x / cols * dataArray.length);
                audioBoost = (dataArray[idx] / 255) * 50;
            }

            const py = p.baseY + swell + ripple + audioBoost;
            const px = p.baseX;
            const size = 2.2 * (1 - p.depth);

            // ===== Gradient color =====
            const gradient = ctx.createRadialGradient(px, py, 0, px, py, size);
            const hue = (p.depth * 200 + time * 20) % 360;
            gradient.addColorStop(0, `hsl(${hue}, 80%, 60%)`);
            gradient.addColorStop(1, `hsl(${hue}, 60%, 20%)`);
            ctx.fillStyle = gradient;

            ctx.globalAlpha = 0.9 - p.depth * 0.5;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
}

animate();


/*
main js file
import initAudio from './waveAnimation/index.js';
initAudio(audio);
import './waveAnimation/index.js';

*/