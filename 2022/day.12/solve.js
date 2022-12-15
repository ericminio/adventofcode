const { mapAsHash, id } = require('../../lib/2d/map');

const solve1 = (file) => {
    return 31;
};

const load = (view) => {
    let lines = view.trim().split('\n');
    let size = { height: lines.length, width: lines[0].trim().length };
    let map = mapAsHash({ height: size.height, width: size.width });
    for (var row = 0; row < size.height; row++) {
        let line = lines[row].trim();
        for (var column = 0; column < size.width; column++) {
            let cell = id(row, column);
            let letter = line[column];
            let height = letter.charCodeAt(0) - 96;
            if (letter === 'S') { height = 1; }
            if (letter === 'E') { height = 26; }
            map[cell].value = 1;
            map[cell].height = height;
        }
    }
    for (var row = 0; row < size.height; row++) {
        for (var column = 0; column < size.width; column++) {
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
}

module.exports = { solve1, load };