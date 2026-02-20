
// ===== Универсальный обработчик на элемент =====
export function addPressListener(elemPress, longPressCallback, shortPressCallback, delay = 2000) {
    let timerId = null; // один таймер на элемент
    let longPressed = false; // флаг, сработал ли долгий тап

    // Когда пользователь нажал
    const start = e => {
        e.preventDefault(); // важно на тачах, чтобы не вызывалось контекстное меню
        longPressed = false;
        timerId = setTimeout(() => {
            longPressed = true;
            longPressCallback(e);
        }, delay);
    };

    // Когда пользователь отпустил
    const end = e => {
        if (timerId) {
            clearTimeout(timerId);
            timerId = null;
            if (!longPressed) {
                shortPressCallback(e);
            }
        }
    };

    // События
    elemPress.addEventListener('pointerdown', start);
    elemPress.addEventListener('pointerup', end);
    elemPress.addEventListener('pointercancel', end);
    elemPress.addEventListener('pointerleave', end); // если палец ушёл с элемента
}
