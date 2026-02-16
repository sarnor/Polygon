

let loader, tracksWrapper, hasTouch, footer;

hasTouch = window.matchMedia('(pointer: coarse)').matches;



const mainPromise = new Promise((resolve, reject) => {
    import('./channels/index.js').then(data => {
        resolve(data.channels)
    })
})


mainPromise
    .then(data => {
        tracksWrapper = document.querySelector('.tracks-wrapper');
        loader = document.querySelector('.loader');
        footer = document.querySelector('footer');
        return data
    })
    .then(data => {
        console.log("🚀 ~ data:", data[0].name)

        data.forEach(element => {
            tracksWrapper.insertAdjacentHTML(
                'beforeend',
                `<div class="track" >
                        <span>${element.name}</span>
                    </div>`
            );
        });
    })
    .finally(() => {
        loader.classList.add('remove')
    })
    .catch(error => {
        console.error(error);
    }
    )


// ===== Универсальный обработчик на элемент =====
function addPressListener(longPressCallback, shortPressCallback, delay = 2000) {
    let timerId = null; // один таймер на элемент
    let longPressed = false; // флаг, сработал ли долгий тап

    // Когда пользователь нажал
    const start = (e) => {
        e.preventDefault(); // важно на тачах, чтобы не вызывалось контекстное меню
        longPressed = false;

        timerId = setTimeout(() => {
            longPressed = true;
            longPressCallback(e);
        }, delay);
    };

    // Когда пользователь отпустил
    const end = (e) => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;

            if (!longPressed) {
                shortPressCallback(e);
            }
        }
    };

    // События
    document.body.addEventListener('pointerdown', start);
    document.body.addEventListener('pointerup', end);
    document.body.addEventListener('pointercancel', end);
    document.body.addEventListener('pointerleave', end); // если палец ушёл с элемента
}

// ===== Пример использования =====


addPressListener(
    (e) => { changeColor(tracksWrapper, 'show'); },
    (e) => { changeColor(tracksWrapper, 'hide'); },
    1000 // 2 секунды
);
function changeColor(elem, position) {
    if (position === 'show') {
        elem.classList.add('center')
        console.log('Show');

    } else if (position === 'hide') {
        console.log('Hide');
        elem.classList.remove('center')
    }
}

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// let width, height;
// function resize() {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// const particles = [];
// const COUNT = 4000;

// // параметры бублика
// const R = 180;   // радиус основного кольца
// const r = 70;    // радиус трубки

// for (let i = 0; i < COUNT; i++) {
//     const u = Math.random() * Math.PI * 2;
//     const v = Math.random() * Math.PI * 2;

//     const x = (R + r * Math.cos(v)) * Math.cos(u);
//     const y = (R + r * Math.cos(v)) * Math.sin(u);
//     const z = r * Math.sin(v);

//     particles.push({ x, y, z });
// }

// let angleX = 0;
// let angleY = 0;

// function rotate(point, ax, ay) {
//     let { x, y, z } = point;

//     // вращение по X
//     let cosX = Math.cos(ax);
//     let sinX = Math.sin(ax);
//     let y1 = y * cosX - z * sinX;
//     let z1 = y * sinX + z * cosX;

//     // вращение по Y
//     let cosY = Math.cos(ay);
//     let sinY = Math.sin(ay);
//     let x2 = x * cosY - z1 * sinY;
//     let z2 = x * sinY + z1 * cosY;

//     return { x: x2, y: y1, z: z2 };
// }

// function animate() {
//     ctx.fillStyle = "#2b2b2b";
//     ctx.fillRect(0, 0, width, height);

//     angleX += 0.005;
//     angleY += 0.007;

//     for (let p of particles) {
//         const rotated = rotate(p, angleX, angleY);

//         const perspective = 600 / (600 - rotated.z);
//         const x = rotated.x * perspective + width / 2;
//         const y = rotated.y * perspective + height / 2;

//         const size = 1.2 * perspective;

//         ctx.beginPath();
//         ctx.arc(x, y, size, 0, Math.PI * 2);
//         ctx.fillStyle = "white";
//         ctx.fill();
//     }

//     requestAnimationFrame(animate);
// }

// animate();

// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// let w, h;
// function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// const COUNT = 5000;
// const particles = [];

// const R = 200;  // радиус большого кольца
// const r = 50;   // толщина бублика

// for (let i = 0; i < COUNT; i++) {
//     particles.push({
//         u: Math.random() * Math.PI * 2,
//         v: Math.random() * Math.PI * 2,
//         speed: 0.002 + Math.random() * 0.002
//     });
// }

// function animate() {
//     ctx.fillStyle = "#2f2f2f";
//     ctx.fillRect(0, 0, w, h);

//     for (let p of particles) {
//         p.u += p.speed; // движение вокруг центра бублика

//         // вертикальный тор (вращён на 90°)
//         const x = (R + r * Math.cos(p.v)) * Math.cos(p.u);
//         const z = (R + r * Math.cos(p.v)) * Math.sin(p.u);
//         const y = r * Math.sin(p.v);

//         const perspective = 800 / (800 - z);
//         const screenX = x * perspective + w / 2;
//         const screenY = y * perspective + h / 2;

//         ctx.fillStyle = "white";
//         ctx.fillRect(screenX, screenY, 0.8 * perspective, 0.8 * perspective);
//     }

//     requestAnimationFrame(animate);
// }

// animate();


// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// let w, h;
// function resize() {
//     w = canvas.width = window.innerWidth;
//     h = canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resize);
// resize();

// const COUNT = 9000;   // больше точек
// const particles = [];

// const R = 200; // радиус большого кольца
// const r = 45;  // толщина

// for (let i = 0; i < COUNT; i++) {
//     particles.push({
//         u: Math.random() * Math.PI * 2,
//         v: Math.random() * Math.PI * 2,
//         speed: 0.0015 + Math.random() * 0.0015
//     });
// }

// function animate() {
//     ctx.fillStyle = "#2c2c2c";
//     ctx.fillRect(0, 0, w, h);

//     for (let p of particles) {
//         p.u += p.speed;

//         // ВЕРТИКАЛЬНЫЙ тор
//         const y = (R + r * Math.cos(p.v)) * Math.cos(p.u);
//         const z = (R + r * Math.cos(p.v)) * Math.sin(p.u);
//         const x = r * Math.sin(p.v);

//         const perspective = 900 / (900 - z);
//         const screenX = x * perspective + w / 2;
//         const screenY = y * perspective + h / 2;

//         ctx.fillStyle = "white";
//         ctx.fillRect(screenX, screenY, 0.6 * perspective, 0.6 * perspective);
//     }

//     requestAnimationFrame(animate);
// }

// animate();


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const COUNT = 10000;
const particles = [];

const R = 200; // радиус кольца
const r = 30;  // толщина

for (let i = 0; i < COUNT; i++) {
    particles.push({
        u: Math.random() * Math.PI * 8,
        v: Math.random() * Math.PI * 5,
        speed: 0.001 + Math.random() * 0.0015
    });
}

function animate() {
    ctx.fillStyle = "#2a2a2a";
    ctx.fillRect(0, 0, w, h);

    for (let p of particles) {
        p.u += p.speed;

        // ТОР СМОТРИТ В ЛОБ (дырка видна)
        const x = (R + r * Math.cos(p.v)) * Math.cos(p.u);
        const y = (R + r * Math.cos(p.v)) * Math.sin(p.u);
        const z = r * Math.sin(p.v);

        const perspective = 900 / (900 - z);
        const screenX = x * perspective + w / 2;
        const screenY = y * perspective + h / 2;

        ctx.fillStyle = "white";
        ctx.fillRect(screenX, screenY, 0.8 * perspective, 0.5 * perspective);
    }

    requestAnimationFrame(animate);
}

animate();