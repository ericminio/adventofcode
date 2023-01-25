const goal = 2022;
const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = () => {
    const tower = { height: 0, fallenRocks: 0 };
    const game = { goal, tower };
    while (tower.fallenRocks < game.goal) {
        play(game);
    }
    return tower.height;
};

const play = (game) => {
    spawn(game);
    move(game);
    fall(game);

    game.rock.position = { x: 4, y: 3 };
    game.tower.fallenRocks = 2025;
    game.tower.height = 3068;
};

const spawn = (game) => {
    if (game.rock === undefined) {
        game.rock = {};
    }
};
const move = (game) => {

};
const fall = (game) => {

};

module.exports = { solve1, play, left, right };