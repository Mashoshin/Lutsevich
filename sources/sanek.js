class Sanek {
    /**
     * @param {Player} player
     * @param {Game} game
     * @param {Talker} talker
     */
    constructor(player, game, talker) {
        this.player = player;
        this.game = game;
        this.talker = talker;

        this.sanekImg = document.querySelector('.sanek');
        this.buhaetImg = document.querySelector('.buhaet');
        this.handImg = document.querySelector('.hand');
        this.fofanImg = document.querySelector('.fofan');
        this.dancerImg = document.querySelector('.dancer');

        this.fingerBtn = document.querySelector('.finger');
        this.gayBtn = document.querySelector('.gay');
        this.ebloBtn = document.querySelector('.eblo');
        this.buhBtn = document.querySelector('.buhat');
        this.gameBtn = document.querySelector('.game');
        this.pisunBtn = document.querySelector('.pisun');
        this.danceBtn = document.querySelector('.dance');

        this.runningString = document.querySelector('.marquee');

        this.init();
    }

    init() {
        document.onkeydown = () => this.game.play();

        this.onClickRenderTextButtons();
        this.onClickBuhBtn();
        this.onClickEbloBtn();
        this.onClickGameBtn();
        this.onClickDanceBtn();
    }

    onClickDanceBtn() {
        this.danceBtn.addEventListener('click', () => this.btnEventHandler(() => {
            this.sanekImg.hidden = true;
            this.dancerImg.hidden = false;
            let left = -1;
            this.runningString.innerHTML = `<span>${this.song()}</span>`;
            this.runningString.querySelector('span').style.animation = 'scroll 36s infinite linear';
            const interval = setInterval(() => {
                this.dancerImg.style.transform = `scale(${left}, 1)`;
                left = left === 1 ? -1 : 1;
            }, 500);
            this.player.play(new AudioFile('gubin_noch', 'mp3'), false, () => {
                this.sanekImg.hidden = false;
                this.dancerImg.hidden = true;
                this.runningString.innerHTML = `<span>Поиграй с Саньком</span>`;
                this.runningString.querySelector('span').style.animation = 'scroll 5s infinite linear';
                clearInterval(interval);
            });
        }));
    }

    onClickEbloBtn() {
        this.ebloBtn.addEventListener('click', () => this.btnEventHandler(() => {
            this.handImg.style.display = 'block';
            this.player.play(new AudioFile('scream', 'mp3'));
            const start = Date.now();
            const timer = setInterval(() => {
                const timePassed = Date.now() - start;
                if (timePassed >= 2000) {
                    clearInterval(timer);
                    this.handImg.style.display = 'none';
                    this.fofanImg.style.display = 'block';
                    this.player.play(new AudioFile('udar', 'wav'));
                    setTimeout(() => this.player.play(new AudioFile('plach', 'mp3')), 1000)
                    setTimeout(() => this.fofanImg.style.display = 'none', 3000)
                    return;
                }
                this.handImg.style.right = timePassed / 50 + '%';
            }, 20);
        }));
    }

    onClickBuhBtn() {
        this.buhBtn.addEventListener('click', () => this.btnEventHandler(() => {
            this.sanekImg.hidden = true;
            this.buhaetImg.hidden = false;
            this.player.play(new AudioFile('glotok', 'mp3'), false, () => {
                this.buhaetImg.hidden = true;
                this.sanekImg.hidden = false;
            });
        }));
    }

    onClickGameBtn() {
        this.gameBtn.addEventListener('click', () => {
            this.sanekImg.hidden = true;
            this.buhaetImg.hidden = false;
            this.buhaetImg.style.height = '80%';
            this.disableBtns();
            this.game.start();
        });
    }

    onClickRenderTextButtons() {
        this.fingerBtn.addEventListener(
            'click',
            () => this.btnEventHandler(() => this.sendAjax(
                'finger',
                data => this.talker.talk(data, new AudioFile('ne_navizu_raz')
                )
            ))
        );
        this.gayBtn.addEventListener(
            'click',
            () => this.btnEventHandler(() => this.sendAjax(
                'gay',
                data => this.talker.talk(data, new AudioFile('tobi_pizda')
                ))
            )
        );
        this.pisunBtn.addEventListener(
            'click',
            () => this.btnEventHandler(() => this.sendAjax(
                'hui',
                data => this.talker.talk(data, new AudioFile('but_v_otgule')
                )
            ))
        );
        this.sanekImg.addEventListener(
            'click',
            () => this.btnEventHandler(() => this.talker.talk(
                'tupa kal',
                new AudioFile('tupa_kal')
            ))
        );
    }

    btnEventHandler(handler) {
        this.disableBtns();
        handler();
        setTimeout(() => this.disableBtns(false), 1000);
    }

    disableBtns(disabled = true) {
        document.querySelectorAll('button').forEach(btn => {
            btn.style.pointerEvents = disabled ? 'none' : 'auto';
        });
    }

    sendAjax(action, callback) {
        fetch(`/api/${action}`)
            .then(r => r.json())
            .then(data => callback(data.data));
    }

    song() {
        return 'Ночь, ожиданья холод, боль, словно я расколот ' +
            'Я ничего не вижу, сам себя я ненавижу ' +
            'Вновь слёзы ниоткуда, в кровь я кусаю губы ' +
            'Всё, что мне сегодня надо — просто быть с тобою рядом ' +
            'Ночь, что за странная свобода: от заката до восхода ' +
            'Ждать тебя, надеясь вновь, о-о-о ' +
            'День, я прошу тебя — не надо от восхода до заката ' +
            'Говорить мне про любовь, о-о-о';
    }
}
