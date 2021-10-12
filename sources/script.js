window.addEventListener('load', () => {
    const player = new Player();
    const game = new Game(player);
    const talker = new Talker(player);
    new Sanek(player, game, talker);
});

