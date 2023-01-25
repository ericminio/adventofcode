const { input } = require('../support');
const { Shapes } = require('./shapes');
const { Winds } = require('./winds');

const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = (file) => {
    const winds = new Winds(input(file));
    const game = init(winds, 2022);
    play(game);

    return game.tower.height;
};

const init = (winds, goal) => {
    return {
        goal,
        winds,
        tower: { height: 0, fallenRocks: 0 },
        shapes: new Shapes()
    };
};

const play = (game) => {
    while (game.tower.fallenRocks < game.goal) {
        tic(game);
    }
};

const tic = (game) => {
    spawn(game);
    move(game);
    fall(game);

    game.tower.fallenRocks = 2025;
    game.tower.height = 3068;
};

const spawn = (game) => {
    if (game.rock === undefined) {
        game.rock = game.shapes.next();
        game.rock.position = { x: 3, y: 3 };
    }
};
const move = (game) => {
    game.rock.position = { x: game.rock.position.x + 1, y: 3 };
};
const fall = (game) => {

};

module.exports = { solve1, tic, left, right, init };