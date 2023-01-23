const goal = 2022;
const right = { dx: 1 };
const left = { dx: -1 };

const solve1 = () => {
    const game = { goal };
    const tower = { height: 3068, size: 2025 };
    while (tower.size < game.goal) {
        play({ game, tower });
    }
    return tower.height;
};

const play = ({ game, tower }) => {

};

module.exports = { solve1, play, left, right };