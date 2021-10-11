class Game {
    /**
     * @param {Player} player
     */
    constructor(player) {
        this.player = player;

        this.lock = false;
        this.started = false;
        this.score = 0;

        this.huiImg = document.querySelector('.hui');
        this.spermaImg = document.querySelector('.sperma');

        this.textInput = document.querySelector('.say');
    }

    start() {
        this.textInput.innerHTML = '0 score';
        this.player.play('mario', true, 'mp3', false)
        setTimeout(() => {
            this.started = true;
            this.huiImg.hidden = false;

            let start = Date.now();
            let index = 1;

            const interval = setInterval(() => {
                const timePassed = Date.now() - start;

                let move = (timePassed / 20) * index;
                this.huiImg.style.right = move  + '%';

                index += 0.001;
                if (move >= 90) {
                    start = Date.now();
                }

                if (this.isGameOver(move)) {
                    this.spermaImg.hidden = false;
                    clearInterval(interval);
                    setTimeout(() => {
                        alert('game over');
                        window.location.reload();
                    }, 100);
                }
            }, 20);
        }, 1000);
    }

    play() {
        if (!this.started || this.lock) {
            return;
        }
        this.lock = true;
        this.huiImg.style.bottom = '85%';
        setTimeout(() => {
            this.huiImg.style.bottom = '0';
            this.score++;
            this.textInput.innerHTML = this.score + ' score';
            this.lock = false;
        }, 500);
    }

    isGameOver(px) {
        const styles = getComputedStyle(this.huiImg);
        return px > 49 && px < 51 && styles.bottom === '0px'
    }
}
