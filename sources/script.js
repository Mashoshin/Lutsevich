window.addEventListener('load', () => {
    document.onkeydown = moveSanek;

    const sanekImg = document.querySelector('.sanek'),
        fingerBtn = document.querySelector('.finger'),
        gayBtn = document.querySelector('.gay'),
        ebloBtn = document.querySelector('.eblo'),
        buhBtn = document.querySelector('.buhat'),
        gameBtn = document.querySelector('.game'),
        pisunBtn = document.querySelector('.pisun');

    sanekImg.addEventListener('click', () => play('tupa_kal', true));
    fingerBtn.addEventListener('click', () => ajax('finger', renderText, () => play('ne_navizu_raz')))
    gayBtn.addEventListener('click', () => ajax('gay', renderText, () => play('tobi_pizda')))
    ebloBtn.addEventListener('click', () => uebat())
    buhBtn.addEventListener('click', () => nabuhat())
    gameBtn.addEventListener('click', () => game())
    pisunBtn.addEventListener('click', () => ajax('hui', renderText, () => play('but_v_otgule')))
});

function moveSanek() {
    const hui = document.querySelector('.hui');
    if (hui.dataset.game !== 'yee') {
        return;
    }
    hui.style.bottom = '85%';
    setTimeout(() => hui.style.bottom = '0', 500);
}

function game() {
    const sanek = document.querySelector('.sanek'),
        buhaet = document.querySelector('.buhaet'),
        say = document.querySelector('.say'),
        talk = document.querySelector('.talk');

    sanek.hidden = true;
    talk.hidden = true;
    say.hidden = true;
    buhaet.hidden = false;
    buhaet.style.height = '80%';
    setTimeout(() => moveHui(), 1000);
    play('mario', true, 'mp3', false)
}

function moveHui() {
    const hui = document.querySelector('.hui');
    const sperma = document.querySelector('.sperma');
    hui.dataset.game = 'yee';
    hui.hidden = false;
    let start = Date.now();
    const interval = setInterval(() => {
        const timePassed = Date.now() - start;
        let move = timePassed / 20;
        if (move >= 90) {
            start = Date.now();
        }
        hui.style.right = move  + '%';
        const styles = getComputedStyle(hui);
        if (move === 50 && styles.bottom === '0px') {
            sperma.hidden = false;
            clearInterval(interval);
            setTimeout(() => {
                alert('game over');
                window.location.reload();
            }, 100);
        }
    }, 20);
}

function nabuhat() {
    const sanek = document.querySelector('.sanek');
    const buhaet = document.querySelector('.buhaet');
    sanek.hidden = true;
    buhaet.hidden = false;
    play('glotok', false, 'mp3', false, () => {
        buhaet.hidden = true;
        sanek.hidden = false;
    });
}

function uebat() {
    const hand = document.querySelector('.hand');
    const fofan = document.querySelector('.fofan');
    hand.style.display = 'block';
    const start = Date.now();
    play('scream', false, 'mp3');
    const timer = setInterval(() => {
        const timePassed = Date.now() - start;
        if (timePassed >= 2000) {
            clearInterval(timer);
            hand.style.display = 'none';
            fofan.style.display = 'block';
            play('udar', false, 'wav');
            setTimeout(() => play('plach', false, 'mp3'), 1000)
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

function play(file, loop = false, ext = 'ogg', showRot = true, callback = () => {
}) {
    const rot = document.querySelector('.rot');
    const audio = new Audio(`/sources/audio/${file}.${ext}`);
    audio.loop = loop;
    audio.onended = () => {
        rot.style.display = "none"
        callback();
    }
    audio.play();
    showRot ? rot.style.display = "block" : true;
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
