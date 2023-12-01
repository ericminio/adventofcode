import { convertRUDLtoXY } from './convertRUDLtoXY.js';

export const intersections = (lines) => {
    const intersections = [];
    const paths = convertRUDLtoXY(lines);
    const keys = Object.keys(paths[0]);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (paths[1][key]) {
            intersections.push(paths[1][key]);
        }
    }
    return intersections;
};
