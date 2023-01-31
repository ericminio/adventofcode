const { expect } = require('chai');
const example = `${__dirname}/data/example.txt`;
const { groups } = require('../support/index.js');

const id = (row, column) => `${row}x${column}`;

describe.only('parsing the example', () => {

    it('can be explored', () => {
        const map = parse(example);

        expect(map.corridors['1x9']).to.deep.equal({
            location: { row: 1, column: 9 },
            neighbours: [ '1x10', '2x9' ]
        });
    });
});

const parse = (file) => {
    const around = [
        { row: 0, column: 1 },
        { row: 1, column: 0 },
        { row: 0, column: -1 },
        { row: -1, column: 0 },
    ];
    const map = { corridors: {}, walls: {}};
    const incoming = groups(file)[0];
    for (let i = 0; i < incoming.length; i++) {
        let row = i + 1;
        for (let j = 0; j < incoming[i].length; j++) {
            let column = j + 1;
            if (incoming[i][j] === '.') {
                map.corridors[id(row, column)] = {
                    location: { row, column },
                    neighbours: []
                };
            }
            if (incoming[i][j] === '#') {
                map.walls[id(row, column)] = { location: { row, column }};
            }
        }
    }
    Object.values(map.corridors).forEach(cell => {
        around.forEach(delta => {
            const neighbour = id(cell.location.row + delta.row, cell.location.column + delta.column);
            if (map.corridors[neighbour]) {
                cell.neighbours.push(neighbour);
            }
            else {
                const inverted = { row: -1 * delta.row, column: -1 * delta.column };
                console.log(delta, inverted);
                let step = 1;
                let candidate = id(cell.location.row + inverted.row * step, cell.location.column + inverted.column * step);
                console.log(cell, candidate);
                if (map.corridors[candidate] !== undefined || map.walls[candidate] !== undefined) {
                    step ++;
                }
            }
        });
    });
    return map;
};