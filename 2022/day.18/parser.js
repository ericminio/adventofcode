const { around } = require('./cube');

const pattern = /(.*),(.*),(.*)/;

const parse = (line) => {
    let [ x, y, z ] = pattern.exec(line).splice(1).map(entry => parseInt(entry));
    return { neighbours: around({ x, y, z }) };
};

module.exports = { parse };