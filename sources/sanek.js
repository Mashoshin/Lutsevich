class Sanek {
    /**
     * @param {Player} player
     * @param {Game} game
     */
    constructor(player, game) {
        this.player = player;
        this.game = game;

        this.sanekImg = document.querySelector('.sanek');
        this.buhaetImg = document.querySelector('.buhaet');
        this.handImg = document.querySelector('.hand');
        this.fofanImg = document.querySelector('.fofan');

        this.fingerBtn = document.querySelector('.finger');
        this.gayBtn = document.querySelector('.gay');
        this.ebloBtn = document.querySelector('.eblo');
        this.buhBtn = document.querySelector('.buhat');
        this.gameBtn = document.querySelector('.game');
        this.pisunBtn = document.querySelector('.pisun');

        this.textInput = document.querySelector('.say');

        this.init();
    }

    init() {
        document.onkeydown = () => this.game.play();

        this.onClickRenderTextButtons();
        this.onClickBuhBtn();
        this.onClickEbloBtn();
        this.onClickGameBtn();
    }

    onClickRenderTextButtons() {
        this.fingerBtn.addEventListener(
            'click',
            () => this.sendAjax('finger', this.renderText, () => this.player.play('ne_navizu_raz'))
        );
        this.gayBtn.addEventListener(
            'click',
            () => this.sendAjax('gay', this.renderText, () => this.player.play('tobi_pizda'))
        );
        this.pisunBtn.addEventListener(
            'click',
            () => this.sendAjax('hui', this.renderText, () => this.player.play('but_v_otgule'))
        );
        this.sanekImg.addEventListener(
            'click',
            () => {
                this.renderText('tupa kal', this);
                this.player.play('tupa_kal');
            }
        );
    }

    onClickEbloBtn() {
        this.ebloBtn.addEventListener('click', () => {
            this.handImg.style.display = 'block';
            this.player.play('scream', false, 'mp3');
            const start = Date.now();
            const timer = setInterval(() => {
                const timePassed = Date.now() - start;
                if (timePassed >= 2000) {
                    clearInterval(timer);
                    this.handImg.style.display = 'none';
                    this.fofanImg.style.display = 'block';
                    this.player.play('udar', false, 'wav');
                    setTimeout(() => this.player.play('plach', false, 'mp3'), 1000)
                    setTimeout(() => this.fofanImg.style.display = 'none', 3000)
                    return;
                }
                this.handImg.style.right = timePassed / 3 + 'px';
            }, 20);
        });
    }

    onClickBuhBtn() {
        this.buhBtn.addEventListener('click', () => {
            this.sanekImg.hidden = true;
            this.buhaetImg.hidden = false;
            this.player.play('glotok', false, 'mp3', false, () => {
                this.buhaetImg.hidden = true;
                this.sanekImg.hidden = false;
            });
        });
    }

    onClickGameBtn() {
        this.gameBtn.addEventListener('click', () => {
            this.sanekImg.hidden = true;
            this.buhaetImg.hidden = false;
            this.buhaetImg.style.height = '80%';
            this.game.start();
        });
    }

    renderText(text, _that) {
        _that.textInput.innerHTML = text;
    }

    sendAjax(action, callback, playAudio) {
        fetch(`/api/${action}`)
            .then(r => r.json())
            .then(data => callback(data.data, this))
            .then(() => playAudio())
    }
}
