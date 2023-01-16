const { around } = require('./cube');

const pattern = /(.*),(.*),(.*)/;

const parse = (line) => {
    let [ x, y, z ] = pattern.exec(line).splice(1);
    return { neighbours: around({ x: parseInt(x), y: parseInt(y), z: parseInt(z) }) };
};

module.exports = { parse };