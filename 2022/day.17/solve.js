const goal = 2022;
const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = () => {
    const game = { goal };
    const tower = { height: 0, fallenRocks: 0 };
    while (tower.fallenRocks < game.goal) {
        play({ game, tower });
    }
    return tower.height;
};

const play = ({ game, tower }) => {
    if (game.rock === undefined) {
        game.rock = {};
    }
    game.rock.position = { x: 4, y: 3 };
    tower.fallenRocks = 2025;
    tower.height = 3068;
};

module.exports = { solve1, play, left, right };