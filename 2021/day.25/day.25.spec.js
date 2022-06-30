const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe.only('day 25 challenge', () => {

    it('is about one moving right', () => {
        let start = new Map([
            '>.'
        ]);
        let end = start.move();
        let rendered = render(end);
        expect(rendered).to.deep.equal([
            '.>'
        ]);
    });
});

class Map {
    constructor(lines) {
        this.lines = lines;
        this.values = [];
        for (let i = 0; i < lines.length; i++) {
            let line = [];
            for (let j = 0; j < lines[i].length; j++) {
                let char = lines[i][j];
                line.push(parseChar(char));
            }
            this.values.push(line);
        }
    }
    rowCount() {
        return 1;
    }
    columnCount() {
        return 2;
    }
    getValueAt(row, column) {
        return this.values[row][column];
    }
    setValueAt(row, column, value) {
        this.values[row][column] = value;
    }
    move() {
        let moved = new Map(this.lines);
        moved.setValueAt(0, 0, EMPTY);
        moved.setValueAt(0, 1, RIGHT);
        return moved;
    }
}

const EMPTY = { right: 0, down: 0 };
const RIGHT = { right: 1, down: 0 };
const DOWN = { right: 0, down: 1 };

const parseChar = (char) => {
    if (char == '.') { return EMPTY; }
    if (char == '>') { return RIGHT; }
    if (char == 'V') { return DOWN; }
}
const renderValue = (value) => {
    if (value == EMPTY) { return '.'; }
    if (value == RIGHT) { return '>'; }
    if (value == DOWN) { return 'V'; }
}

const render = (map) => {
    let rows = [];
    for (let i = 0; i < map.rowCount(); i++) {
        let row = '';
        for (let j = 0; j < map.columnCount(); j++) {
            let value = map.getValueAt(i, j);
            row += renderValue(value);
        }
        rows.push(row);
    }
    return rows;
};
