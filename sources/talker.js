class Talker {
    /**
     * @param {Player} player
     */
    constructor(player) {
        this.player = player;
        this.rot = document.querySelector('.rot');
        this.input = document.querySelector('.say');
    }

    /**
     * @param {string} text
     * @param {AudioFile} audio
     * @param {boolean} showRot
     */
    talk(text, audio, showRot = true) {
        this.input.innerHTML = text;
        this.showRot(showRot);
        if (audio) {
            this.player.play(audio, false, () => this.showRot(false));
        }
    }

    showRot(show = true) {
        show ? this.rot.style.display = "block" : this.rot.style.display = "none";
    }
}
