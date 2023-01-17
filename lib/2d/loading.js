const { mapAsHash, id } = require('./map');

const load = (view) => {
    let lines = view.trim().split('\n');
    let size = { height: lines.length, width: lines[0].trim().length };
    let map = mapAsHash({ height: size.height, width: size.width });
    for (var row = 0; row < size.height; row++) {
        let line = lines[row].trim();
        for (var column = 0; column < size.width; column++) {
            let cell = id(row, column);
            map[cell].value = parseInt(line[column]);
        }
    }

    return map;
};

module.exports = { load };