import '../styles/css/index.css';
import '../styles/less/index.less';
import '../styles/scss/index.scss';
import '../styles/sass/index.sass';
import '../resource/fontawesome-pro-6.2.1-web/js/all.js';


let maimPromise, tracksWrapper, trackList;


const buildListRadioChannels = (items) => {
    items.forEach((element, index) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('track');
        newDiv.innerHTML = `<span>${index + 1}</span> <span>${element.name}</span>`
        tracksWrapper.insertAdjacentElement('beforeend', newDiv.cloneNode(true))
    });
}



window.addEventListener('DOMContentLoaded', () => {

    import('./channels/index.js')
        .then(data => {
            tracksWrapper = document.querySelector('.tracks-wrapper')
            return data
        })
        .then(data => {
            buildListRadioChannels(data.channels)
        })
        .then(() => {
            trackList = document.querySelectorAll('.track')
            console.log(trackList);
        })
        .then(() => {
            document.body.addEventListener('click', () => {
                console.log('click body');
                tracksWrapper.classList.toggle('center')

            })
        })
        .catch(err => {
            console.log(err, 'Error');
        })
})
