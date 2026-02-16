

let loader;
setTimeout(() => {
    loader = document.querySelector('.loader');
    console.log("🚀 ~ loader:", loader)
    loader.classList.add('remove')
}, 5000)
// document.addEventListener('click', e => {
//     const link = e.target.closest('a[href]');
//     if (!link) return;
//     e.preventDefault();

//     const href = link.getAttribute('href');

//     // Если есть хэш — скроллим к элементу
//     if (hasHash) {
//         setTimeout(() => {
//             const el = document.querySelector(url.hash);
//             if (el) el.scrollIntoView({ behavior: 'smooth' });
//         }, 5000);
//     }
// });