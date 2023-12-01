const convertRULDtoXY = require('./convertRULDtoXY.js');

module.exports = (lines) => {
    const intersections = [];
    const paths = convertRULDtoXY(lines);
    for (let i = 0; i < paths[0].length; i++) {
        const one = paths[0][i];
        for (let j = 0; j < paths[1].length; j++) {
            const two = paths[1][j];
            if (one.x === two.x && one.y === two.y) {
                intersections.push({ x: one.x, y: one.y });
            }
        }
    }
    return intersections;
};
