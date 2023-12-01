const convertRULDtoXY = require('./convertRUDLtoXY.js');

module.exports = (lines) => {
    const intersections = [];
    const paths = convertRULDtoXY(lines);
    const keys = Object.keys(paths[0]);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (paths[1][key]) {
            intersections.push(paths[1][key]);
        }
    }
    return intersections;
};
