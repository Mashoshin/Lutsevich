window.addEventListener('load', () => {
    const   sanekImg = document.querySelector('.sanek'),
            fingerBtn = document.querySelector('.finger'),
            gayBtn = document.querySelector('.gay'),
            ebloBtn = document.querySelector('.eblo'),
            pisunBtn = document.querySelector('.pisun');

    sanekImg.addEventListener('click', () => play('tupa_kal', true));
    fingerBtn.addEventListener('click', () => ajax('finger', renderText, () => play('ne_navizu_raz')))
    gayBtn.addEventListener('click', () => ajax('gay', renderText, () => play('tobi_pizda')))
    ebloBtn.addEventListener('click', () => uebat())
    pisunBtn.addEventListener('click', () => ajax('hui', renderText, () => play('but_v_otgule')))
});

function uebat() {
    const hand = document.querySelector('.hand');
    const fofan = document.querySelector('.fofan');
    hand.style.display = 'block';
    const start = Date.now();
    const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= 2000) {
            clearInterval(timer);
            hand.style.display = 'none';
            fofan.style.display = 'block';
            play('scream', false, 'mp3')
            setTimeout(() => fofan.style.display = 'none', 3000)
            return;
        }
        hand.style.right = timePassed / 3 + 'px';
    }, 20);
}

function renderText(text) {
    const input = document.querySelector('.say');
    input.innerHTML = text;
}

function play(file, loop = false, ext = 'ogg') {
    const rot = document.querySelector('.rot');
    const audio = new Audio(`/sources/audio/${file}.${ext}`);
    audio.loop = loop;
    audio.onended = () => rot.style.display = "none"
    audio.play();
    rot.style.display = "block"
}

/**
 * @param {string} action
 * @param {function} callback
 * @param {function} playAudio
 */
function ajax(action, callback, playAudio) {
    fetch(`/api/${action}`)
        .then(r => r.json())
        .then(data => callback(data.data))
        .then(() => playAudio())
}
