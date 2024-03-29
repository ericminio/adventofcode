const { gps } = require('../../lib/gps.js');
const { mapAsHash, id } = require('../../lib/2d/map');
const { input, ascending } = require('../support');

const solve1 = (file) => {
    let view = input(file);
    let map = load(view);
    let path = gps(map.request, map);

    return path.nodes.length - 1;
};

const solve2 = (file) => {
    let view = input(file);
    let map = load(view);
    const sizes = Object.keys(map)
        .map(key => map[key])
        .filter(point => point.height == 1)
        .map(low => {
            let request = { ...map.request, origin: { id: low.id }};
            try {
                let path = gps(request, map);
                return path.nodes.length - 1;
            }
            catch (error) {
                return 517;
            }
        })
        .sort(ascending);

    return sizes[0];
};

const load = (view) => {
    let lines = view.trim().split('\n');
    let size = { height: lines.length, width: lines[0].trim().length };
    let map = mapAsHash({ height: size.height, width: size.width });
    map.request = {};
    for (let row = 0; row < size.height; row++) {
        let line = lines[row].trim();
        for (let column = 0; column < size.width; column++) {
            let cell = id(row, column);
            let letter = line[column];
            let height = letter.charCodeAt(0) - 96;
            if (letter === 'S') {
                height = 1; map.request.origin = { id: cell };
            }
            if (letter === 'E') {
                height = 26; map.request.target = { id: cell };
            }
            map[cell].value = 1;
            map[cell].height = height;
        }
    }
    for (let row = 0; row < size.height; row++) {
        for (let column = 0; column < size.width; column++) {
            let cell = id(row, column);
            let candidates = map[cell].neighbours;
            let neighbours = [];
            candidates.forEach(candidate => {
                if (map[candidate].height <= map[cell].height + 1) {
                    neighbours.push(candidate);
                }
            });
            map[cell].neighbours = neighbours;
        }
    }
    return map;
};

module.exports = { load, solve1, solve2 };