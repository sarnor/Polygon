let loader, tracksWrapper, hasTouch, radioControlPanel, track, radioLink, ch, pauseElement;

hasTouch = window.matchMedia('(pointer: coarse)').matches;
export const audio = new Audio();

import initAudio from './waveAnimation/index.js'

const mainPromise = new Promise((resolve, reject) => {
    import('./channels/index.js')
        .then(data => {
            radioLink = data.channels
            resolve(data.channels)
        })
})
mainPromise
    .then(data => {
        pauseElement = document.querySelector('.pause-element')
        tracksWrapper = document.querySelector('.tracks-wrapper');
        ch = document.querySelector('.ch');
        radioControlPanel += document.querySelector('.radio-control-panel');
        loader = document.querySelector('.loader');
        return data
    })
    .then(data => {
        data.forEach((element, index) => {
            tracksWrapper.insertAdjacentHTML(
                'beforeend',
                `<div class="track" >
            <span>${index + 1}</span>
            <span>${element.name}</span>
            </div>`
            );
        });
    })
    .then(() => {
        track = document.querySelectorAll('.track')
    })
    .then(() => {
        track.forEach((e, i) => {
            e.addEventListener('pointerup', event => {
                audio.src = radioLink[i].url;
                audio.crossOrigin = "anonymous";
                audio.play();
                initAudio(audio);
            });
        });
    })
    .finally(() => {
        loader.remove()
    })
    .catch(error => {
        console.error(error);
    })
import { addPressListener } from './showPanelControl/index.js'

// ===== Пример использования =====

addPressListener(document.body,
    e => { changeColor(radioControlPanel, 'show'); },
    e => { changeColor(radioControlPanel, 'hide'); },
    1000 // 2 секунды
);

function changeColor(elem, position) {
    if (position === 'show') {
        if (!audio.paused) {
            pauseElement.classList.add('show')
            audio.pause();

        }
    } else if (position === 'hide') {
        if (pauseElement) {
            audio.play()
            pauseElement.classList.remove('show')
        }
    }
}



import './showChannelList/index.js';
import './waveAnimation/index.js';