const { groups } = require('../support/index.js');
const { turnLeft, turnRight } = require('./rotation.js');

const parsePath = (file) => {
    const spec = groups(file)[1][0];
    const path = [];
    let move = '';
    for (let i = 0; i < spec.length; i++) {
        let char = spec[i];
        if (char === 'R') {
            if (move.length > 0) {
                path.push({ move: parseInt(move, 10) });
                move = '';
            }
            path.push({ rotate: turnRight });
        }
        else if (char === 'L') {
            if (move.length > 0) {
                path.push({ move: parseInt(move, 10) });
                move = '';
            }
            path.push({ rotate: turnLeft });
        }
        else {
            move += char;
        }
    }
    if (move.length > 0) {
        path.push({ move: parseInt(move, 10) });
        move = '';
    }

    return path;
};

module.exports = { parsePath };