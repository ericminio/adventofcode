const { expect } = require('chai');
const deepEqual = require('deep-equal');
const fs = require('fs');
const path = require('path');

const EMPTY = 0;
const RIGHT = 1;
const DOWN = 2;

describe.only('day 25 challenge', () => {

    it('has an example', () => {
        let start = parse(fs.readFileSync(path.join(__dirname, 'example.txt')).toString());
        let count = moveCountUntilImmobility(start);

        expect(count).to.equal(58);
    });

    describe('parsing', () => {
        let pretend = {
            input: `
                >.v
                .v>
            `,
            model: [
                [RIGHT, EMPTY, DOWN],
                [EMPTY, DOWN, RIGHT]
            ]
        };

        it('parses as expected', () => {
            expect(parse(pretend.input)).to.deep.equal(pretend.model);
        });
    });
});

const moveCountUntilImmobility = (map, listener) => {
    let rowCount = map.length;
    let columnCount = map[0].length;
    let count = 0;
    let hasMoved = true;
    while (hasMoved && count < 66) {
        hasMoved = false;
        
        for (let row = 0; row < rowCount; row ++) {
            for (let column = 0 ; column < columnCount; column ++) {
                if (map[row][(column+1)%columnCount] == EMPTY) {
                    map[row][column] = EMPTY;
                    map[row][(column+1)%columnCount] = RIGHT;
                    column = column + 1;
                    hasMoved = true;
                }
            }
        }
        for (let column = 0 ; column < columnCount; column ++) {
            for (let row = 0; row < rowCount; row ++) {
                if (map[(row+1)%rowCount][column] == EMPTY) {
                    map[row][column] = EMPTY;
                    map[(row+1)%rowCount][column] = DOWN;
                    row = row + 1;
                    hasMoved = true;
                }
            }
        }
        
        count ++;
    }
    return count;
};

const parse = (input) => {    
    return input.trim().split('\n')
        .map(line => line.trim().split('').map(char => {
            if (char == '.') return EMPTY;
            if (char == '>') return RIGHT;
            if (char == 'v') return DOWN;
        }));
};
