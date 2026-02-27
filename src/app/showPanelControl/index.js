
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


/*
app/index.js main js 
import { addPressListener } from './showPanelControl/index.js'

// ===== Пример использования =====

addPressListener(document.body,
    e => { stopFlow(radioControlPanel, 'show'); },
    e => { stopFlow(radioControlPanel, 'hide'); },
    5000 // 2 секунды
);

function stopFlow(elem, position) {
    if (position === 'show') {
        if (!audio.paused) {
            audio.pause();
            rootElement.insertAdjacentHTML('beforeend', pauseElementContent);
            pauseElement = document.querySelector('.pause-element')
        }
    } else if (position === 'hide') {
        if (pauseElement) {
            audio.play()
            pauseElement.remove()
        }
    }
}
*/