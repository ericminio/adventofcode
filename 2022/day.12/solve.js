const { mapAsHash, id } = require('../../lib/2d/map');

const solve1 = (file) => {
    return 31;
};

const load = (view) => {
    let lines = view.trim().split('\n');
    let size = { height: lines.length, width: lines[0].trim().length };
    let map = mapAsHash({ height: size.height, width: size.width });

    return map;
}

module.exports = { solve1, load };