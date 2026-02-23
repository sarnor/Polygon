let rootElement, loader, tracksWrapper, hasTouch, radioControlPanel, track, radioLink, ch, pauseElement, pauseElementContent, stop, play, indexUrl, localStorageData, trackName;
hasTouch = window.matchMedia('(pointer: coarse)').matches;
console.log(screen);


pauseElementContent = `
<div class="pause-element">
    <span>
        <i class="fa-regular fa-pause"></i>
    </span>
</div>`;

indexUrl = localStorage.getItem('indexItem');

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
        rootElement = document.querySelector('#root');
        tracksWrapper = document.querySelector('.tracks-wrapper');
        ch = document.querySelector('.ch');
        radioControlPanel += document.querySelector('.radio-control-panel');
        loader = document.querySelector('.loader');
        if (hasTouch) {
            ch.remove()
        }
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
                localStorage.setItem('indexItem', i)
                playRadio(i)
            });
        });
    })
    .finally(() => {
        loader.remove()
    })
    .catch(error => {
        console.error(error);
    })


stop = document.querySelector('.stop');
trackName = document.querySelector('.track-name');
play = document.querySelector('.play');

const playRadio = index => {
    if (!index) {
        index = indexUrl
        audio.src = radioLink[index].url;
    } else {
        audio.src = radioLink[index].url;
    }
    audio.crossOrigin = "anonymous";
    audio.play();
    initAudio(audio);
    trackName.innerHTML = radioLink[index].name
}

play.addEventListener('click', () => {
    playRadio()
})
stop.addEventListener('click', () => {
    audio.pause()
})

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



import './showChannelList/index.js';
import './waveAnimation/index.js';

