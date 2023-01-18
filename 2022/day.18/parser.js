const { around, id } = require('./cube');

const pattern = /(.*),(.*),(.*)/;

const parse = (line) => {
    let [ x, y, z ] = pattern.exec(line).splice(1).map(entry => parseInt(entry));
    let position = { x, y, z };
    return {
        id: id(position),
        position,
        neighbours: around(position)
    };
};

module.exports = { parse };