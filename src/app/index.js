let maimPromise, tracksWrapper, trackList, loading, pagePromise;
import '../styles/css/index.css';
import '../styles/less/index.less';
import '../styles/scss/index.scss';
import '../styles/sass/index.sass';
import '../resource/fontawesome-pro-6.2.1-web/js/all.js';

import { httpAjax } from './httpAjax/index.js'




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
        .then(() => {
            httpAjax('GET', '/views/gallery/index.html', 'text')
                .then(html => {
                    console.log('HTML length:', html.length);
                    console.log('HTML', html);
                    // Можно вставить в DOM
                    document.querySelector('main').insertAdjacentHTML('beforeend', html)
                })
                .catch(err => console.error('AJAX error:', err));

        })
        .finally(() => {
            loading.classList.add('remove')
        })
        .catch(err => {
            console.log(err, 'Errddddddddddddddddddddddddddddddddddddor');
        })
})
