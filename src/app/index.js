let rootElement, loader, audio, tracksWrapper, hasTouch, radioControlPanel, track, radioLink, ch, pauseElement, pauseElementContent, stopBtn, playBtn, indexUrl, trackName;
hasTouch = window.matchMedia('(pointer: coarse)').matches;
console.log("🚀 ~ hasTouch:", hasTouch)



pauseElementContent = `
<div class="pause-element">
    <span>
        <i class="fa-regular fa-pause"></i>
    </span>
</div>`;

indexUrl = localStorage.getItem('indexItem');


audio = new Audio();


const mainPromise = new Promise((resolve, reject) => {
    import('./channels/index.js')
        .then(data => {
            radioLink = data.channels
            resolve(data.channels)
        })
})
mainPromise
    .then(data => {
        // window.addEventListener('DOMContentLoader', () => {})

        rootElement = document.querySelector('#root');
        tracksWrapper = document.querySelector('.tracks-wrapper');
        ch = document.querySelector('.ch');
        radioControlPanel = document.querySelector('.radio-control-panel');
        loader = document.querySelector('.loader');
        trackName = document.querySelector('.track-name');
        trackName.innerHTML = radioLink[indexUrl].name
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


const playRadio = index => {
    if (!index) {
        index = indexUrl
        audio.src = radioLink[index].url;
    } else {
        audio.src = radioLink[index].url;
    }
    audio.crossOrigin = "anonymous";
    audio.play();

    trackName.innerHTML = radioLink[index].name
}

const stopRadio = () => {
    audio.pause()
    audio.src = ''
    audio.load()
}
stopBtn = document.querySelector('.btn-stop');
playBtn = document.querySelector('.btn-play');

playBtn.addEventListener('click', () => {
    playRadio()
})
stopBtn.addEventListener('click', () => {
    stopRadio()
})