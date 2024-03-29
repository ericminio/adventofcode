const { input } = require('../support');
const { leftOf, rightOf, under } = require('./around.js');
const { Shapes } = require('./shapes');
const { Tower } = require('./tower.js');
const { Winds, RIGHT } = require('./winds');

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
        tower: new Tower(),
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
};

const spawn = (game) => {
    if (game.rock === undefined) {
        game.rock = game.shapes.next();
        game.rock.position = { x: 3, y: game.tower.height + 4 };
    }
};
const move = (game) => {
    const wind = game.winds.next();
    const points = wind === RIGHT ? rightOf(game.rock.points()) : leftOf(game.rock.points());
    if (game.tower.areFree(points)) {
        game.rock.position = {
            x: game.rock.position.x + wind.dx,
            y: game.rock.position.y
        };
    }
};
const fall = (game) => {
    const points = under(game.rock.points());
    if (game.tower.areFree(points)) {
        game.rock.position = {
            x: game.rock.position.x,
            y: game.rock.position.y - 1
        };
    }
    else {
        settle(game);
    }
};
const settle = (game) => {
    game.tower.settle(game.rock);
    game.rock = undefined;
};

module.exports = { solve1, tic, left, right, init, play };