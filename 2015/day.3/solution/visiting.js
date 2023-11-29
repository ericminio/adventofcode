const { id } = require('../../../support');

const track = (position, houses) => {
    const positionId = id(position);
    if (!houses[positionId]) {
        houses[positionId] = 0;
    }
    houses[positionId] += 1;
};

const visiting = (input) => {
    const position = { x: 0, y: 0 };
    const houses = [];
    track(position, houses);

    const moves = input.split('');
    moves.forEach((move) => {
        position.x += move === '>' ? 1 : move === '<' ? -1 : 0;
        position.y += move === '^' ? 1 : move === 'v' ? -1 : 0;
        track(position, houses);
    });
    return houses;
};

module.exports = { visiting };
