window.addEventListener('load', () => {
    const player = new Player();
    const game = new Game(player);

    new Sanek(player, game);
});

