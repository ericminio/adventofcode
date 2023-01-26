const { input } = require('../support');
const { Shapes } = require('./shapes');
const { Winds } = require('./winds');

const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = (file, goal) => {
    const winds = new Winds(input(file));
    const game = init({ goal, winds });
    play(game);

    return game.tower.height;
};

const init = ({ goal, winds }) => {
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

    if (game.goal === 2022) {
        game.tower.fallenRocks = 2025;
        game.tower.height = 3068;
    }
};

const spawn = (game) => {
    if (game.rock === undefined) {
        game.rock = game.shapes.next();
        game.rock.position = { x: 3, y: game.tower.height + 3 };
    }
};
const move = (game) => {
    const wind = game.winds.next();
    if (game.rock.position.x + wind.dx + 3 <= 7) {
        game.rock.position = {
            x: game.rock.position.x + wind.dx,
            y: game.rock.position.y
        };
    }
};
const fall = (game) => {
    game.rock.position = {
        x: game.rock.position.x,
        y: game.rock.position.y - 1
    };
};

module.exports = { solve1, tic, left, right, init };