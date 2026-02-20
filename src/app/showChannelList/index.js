const tracksWrapper = document.querySelector('.tracks-wrapper');
const radioControlPanel = document.querySelector('.radio-control-panel');
const ch = document.querySelector('.ch');

let startX = 0;
let startY = 0;
const threshold = 80; // минимальная длина свайпа


document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Горизонтальный свайп
        if (deltaX > threshold) {
            console.log('Свайп вправо');
            closeMenu(tracksWrapper);
        } else if (deltaX < -threshold) {
            console.log('Свайп влево');
            openMenu(tracksWrapper);
            closePanel(radioControlPanel);
        }
    } else {
        // Вертикальный свайп
        if (deltaY > threshold) {
            console.log('Свайп вниз');
            closePanel(radioControlPanel);
        } else if (deltaY < -threshold) {
            console.log('Свайп вверх');
            closeMenu(tracksWrapper);
            openPanel(radioControlPanel);
        }
    }
});
tracksWrapper.addEventListener('touchend', e => e.stopPropagation());
tracksWrapper.addEventListener('pointerup', e => closeMenu(tracksWrapper));
ch.addEventListener('pointerdown', e => e.stopPropagation());

ch.addEventListener('pointerup', e => {
    openMenu(tracksWrapper);
    closePanel(radioControlPanel);
    e.stopPropagation()
});
const openMenu = elem => elem.classList.add('show');
const openPanel = elem => elem.classList.add('show');
const closeMenu = elem => elem.classList.remove('show');
const closePanel = elem => elem.classList.remove('show');