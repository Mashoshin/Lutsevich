window.addEventListener('load', () => {
    const   sanekImg = document.querySelector('.sanek'),
            fingerBtn = document.querySelector('.finger'),
            gayBtn = document.querySelector('.gay'),
            pisunBtn = document.querySelector('.pisun');

    sanekImg.addEventListener('click', () => play('tupa_kal', true));
    fingerBtn.addEventListener('click', () => ajax('finger', renderText, () => play('ne_navizu_raz')))
    gayBtn.addEventListener('click', () => ajax('gay', renderText, () => play('tobi_pizda')))
    pisunBtn.addEventListener('click', () => ajax('hui', renderText, () => play('but_v_otgule')))
});

function renderText(text) {
    const input = document.querySelector('.say');
    input.innerHTML = text;
}

function play(file, loop = false) {
    const audio = new Audio(`/sources/audio/${file}.ogg`);
    audio.loop = loop;
    audio.play();
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
