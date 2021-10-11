class Player {
    constructor() {
        this.rot = document.querySelector('.rot');
        //todo блокировку
        this.lock = false;
    }

    play(file, loop = false, ext = 'ogg', showRot = true, callback = () => {}) {
        const audio = new Audio(`/sources/audio/${file}.${ext}`);
        audio.loop = loop;
        audio.onended = () => {
            this.showRot(false);
            callback();
        }
        audio.play();

        this.showRot(showRot);
    }

    showRot(show = true) {
        show ? this.rot.style.display = "block" : this.rot.style.display = "none";
    }
}
