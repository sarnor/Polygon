import '../styles/css/index.css';
import '../styles/less/index.less';
import '../styles/scss/index.scss';
import '../styles/sass/index.sass';
import '../resource/fontawesome-pro-6.2.1-web/js/all.js';


let maimPromise, tracksWrapper, trackList, loading;


maimPromise = new Promise((resolve, reject) => {
    import('./channels/index.js')
        .then(e => resolve(e.channels))
})

const buildListRadioChannels = (items) => {
    items.forEach((element, index) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('track');
        newDiv.innerHTML = `<span>${index + 1}</span> <span>${element.name}</span>`
        tracksWrapper.insertAdjacentElement('beforeend', newDiv.cloneNode(true))
    });
}
// window.addEventListener('wheel', e => console.log(e))



window.addEventListener('DOMContentLoaded', () => {
    maimPromise
        .then(data => {
            loading = document.querySelector('.loader');
            return data
        })
        .then(data => {
            tracksWrapper = document.querySelector('.tracks-wrapper')
            return data
        })
        .then(data => {
            buildListRadioChannels(data)
            console.log("🚀 ~ data:", data)
        })
        .then(() => {
            trackList = document.querySelectorAll('.track')

        })
        .then(() => {
            document.body.addEventListener('click', () => {
                console.log('click body');
                tracksWrapper.classList.toggle('center')

            })
        })
        .finally(() => {
            loading.classList.add('remove')
        })
        .catch(err => {
            console.log(err, 'Errddddddddddddddddddddddddddddddddddddor');
        })
})
