class Player {
    /**
     * @param {AudioFile} file
     * @param loop
     * @param callback
     */
    play(file, loop = false, callback = () => {}) {
        const audio = new Audio(`/sources/audio/${file.name}.${file.ext}`);
        audio.loop = loop;
        audio.onended = () => callback();
        audio.play();
    }
}

class AudioFile {
    constructor(name, ext = 'ogg') {
        this.name = name;
        this.ext = ext;
    }
}
