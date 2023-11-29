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
        if (move === '>') {
            position.x += 1;
        }
        if (move === '<') {
            position.x -= 1;
        }
        if (move === '^') {
            position.y += 1;
        }
        if (move === 'v') {
            position.y -= 1;
        }
        track(position, houses);
    });
    return houses;
};

module.exports = { visiting };
