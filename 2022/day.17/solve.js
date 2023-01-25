const { input } = require('../support');
const { Winds } = require('./winds');

const goal = 2022;
const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = (file) => {
    const winds = new Winds(input(file));
    const game = init(winds, goal);
    while (game.tower.fallenRocks < game.goal) {
        play(game);
    }
    return game.tower.height;
};

const init = (winds, goal) => {
    return {
        goal,
        winds,
        tower: { height: 0, fallenRocks: 0 }
    };
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

module.exports = { solve1, play, left, right, init };