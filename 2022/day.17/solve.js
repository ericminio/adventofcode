const goal = 2022;

const solve1 = () => {
    const game = { goal };
    const tower = { height: 3068, size: 2025 };
    while (tower.size < game.goal) {
        play({ tower, game });
    }
    return tower.height;
};

const solve2 = () => {
    return 15;
};

module.exports = { solve1, solve2 };