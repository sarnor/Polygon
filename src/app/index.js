let chRoot, rootElement, loader, pauseElement;

let audio, hasTouch, radioStations;

hasTouch = window.matchMedia('(pointer: coarse)').matches;



pauseElement = `
<div class="pause-element">
<span>
<i class="fa-regular fa-pause"></i>
</span>
</div>`;

chRoot = `<div class="ch">
<div class="show menu-icon">
<i class="fa-solid fa-bars"></i>
</div>
<div class="hide menu-icon">
<i class="fa-solid fa-xmark"></i>
</div>
</div>`


audio = new Audio();


