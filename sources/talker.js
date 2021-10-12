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
     */
    talk(text, audio) {
        this.input.innerHTML = text;
        this.showRot(true);
        this.player.play(audio, false, () => this.showRot(false));
    }

    showRot(show = true) {
        show ? this.rot.style.display = "block" : this.rot.style.display = "none";
    }
}
