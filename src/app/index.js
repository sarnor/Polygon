let maimPromise, tracksWrapper, trackList, loading, pagePromise;

import { httpAjax } from './httpAjax/index.js'

import { channels } from './channels/index.js';


const buildListRadioChannels = (items) => {
    items.forEach((element, index) => {
        const newDiv = document.createElement('div')
        newDiv.classList.add('track');
        newDiv.innerHTML = `<span>${index + 1}</span> <span>${element.name}</span>`
        tracksWrapper.insertAdjacentElement('beforeend', newDiv.cloneNode(true))
    });
}
document.body.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    setTimeout(() => {
        tracksWrapper.classList.add('center')
    }, 3000);
})
document.body.addEventListener('click', () => {
    tracksWrapper.classList.remove('center')
})


window.addEventListener('DOMContentLoaded', () => { })
maimPromise = new Promise((resolve, reject) => {
    resolve(channels)
})

maimPromise
    .then(data => {
        loading = document.querySelector('.loader');
        tracksWrapper = document.querySelector('.tracks-wrapper')
        return data
    })
    .then(data => {
        buildListRadioChannels(data)
    })
    .then(() => {
        trackList = document.querySelectorAll('.track')
    })
    .finally(() => {
        loading.classList.add('remove')
    })
    .catch(err => {
        console.error(err, 'Error');
    })
document.addEventListener('click', e => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    e.preventDefault();

    const href = link.getAttribute('href');

    // Если есть хэш — скроллим к элементу
    if (hasHash) {
        setTimeout(() => {
            const el = document.querySelector(url.hash);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
    }
});