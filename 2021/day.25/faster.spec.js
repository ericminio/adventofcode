const { expect } = require('chai');
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

    describe('move downs', () => {
        it('works with one', () => {
            let map = [
                [DOWN],
                [EMPTY]
            ];
            expect(moveDowns(map)).to.equal(true);
            expect(map).to.deep.equal([
                [EMPTY],
                [DOWN]
            ])
        });
        it('respects traffic jam', () => {
            let map = [
                [DOWN],
                [DOWN],
                [EMPTY]
            ];
            expect(moveDowns(map)).to.equal(true);
            expect(map).to.deep.equal([
                [DOWN],
                [EMPTY],
                [DOWN]
            ]);
        });
        it('may not be possible', () => {
            let map = [
                [DOWN],
                [DOWN]
            ];
            expect(moveDowns(map)).to.equal(false);
        });
        it('overflows to the start', () => {
            let map = [
                [EMPTY],
                [DOWN]
            ];
            expect(moveDowns(map)).to.equal(true);
            expect(map).to.deep.equal([
                [DOWN],
                [EMPTY]
            ]);
        });    
        it('does not create anything', () => {
            let map = [
                [EMPTY]
            ];
            expect(moveDowns(map)).to.equal(false);
            expect(map).to.deep.equal([
                [EMPTY]
            ])
        });
    }); 

    describe('move rights', () => {
        it('works with one', () => {
            let map = [
                [RIGHT, EMPTY]
            ];
            expect(moveRights(map)).to.equal(true);
            expect(map).to.deep.equal([
                [EMPTY, RIGHT]
            ])
        });
        it('respect traffic jam', () => {
            let map = [
                [RIGHT, RIGHT, EMPTY]
            ];
            expect(moveRights(map)).to.equal(true);
            expect(map).to.deep.equal([
                [RIGHT, EMPTY, RIGHT]
            ]);
        });
        it('may not be possible', () => {
            let map = [
                [RIGHT, RIGHT]
            ];
            expect(moveRights(map)).to.equal(false);
        });
        it('overflows to the start', () => {
            let map = [
                [EMPTY, RIGHT]
            ];
            expect(moveRights(map)).to.equal(true);
            expect(map).to.deep.equal([
                [RIGHT, EMPTY]
            ]);
        });    
        it('does not create anything', () => {
            let map = [
                [EMPTY]
            ];
            expect(moveRights(map)).to.equal(false);
            expect(map).to.deep.equal([
                [EMPTY]
            ])
        });
            
    });

    describe('moving', () => {

        it('starts with rights which can block downs', () => {
            let map = [
                [EMPTY, DOWN],
                [RIGHT, EMPTY]
            ];
            expect(move(map)).to.equal(true);
            expect(map).to.deep.equal([
                [EMPTY, DOWN],
                [EMPTY, RIGHT]
            ]);
        });

        it('starts with rights which can unblock downs', () => {
            let map = [
                [EMPTY, DOWN],
                [EMPTY, RIGHT]
            ];
            expect(move(map)).to.equal(true);
            expect(map).to.deep.equal([
                [EMPTY, EMPTY],
                [RIGHT, DOWN]
            ]);
        });

        it('works as expected with the example', () => {
            let map = parse(fs.readFileSync(path.join(__dirname, 'example.txt')).toString());
            let moved = parse(fs.readFileSync(path.join(__dirname, 'example-1.txt')).toString());

            move(map);
            expect(map).to.deep.equal(moved);
        });

        it('works long enough with the example', () => {
            let step = 2;
            let map = parse(fs.readFileSync(path.join(__dirname, 'example.txt')).toString());
            let moved = parse(fs.readFileSync(path.join(__dirname, `example-${step}.txt`)).toString());

            for (let i = 0; i < step; i++) {
                move(map);
            }
            expect(map).to.deep.equal(moved);
        });
    });

    describe('counting', () => {

        it('includes the failed try', () => {
            let map = [
                [RIGHT, EMPTY, EMPTY, DOWN]
            ];
            let count = moveCountUntilImmobility(map);
    
            expect(count).to.equal(3);    
        });
    });
});

const moveCountUntilImmobility = (map) => {
    let count = 0;
    let hasMoved = true;
    while (hasMoved) {
        hasMoved = move(map);
        count ++;
    }
    return count;
};
const move = (map) => {
    let rightsHaveMoved = moveRights(map);
    let downsHaveMoved = moveDowns(map);
    return rightsHaveMoved || downsHaveMoved;
};
const moveRights = (map) => {
    let rowCount = map.length;
    let columnCount = map[0].length;
    let hasMoved = false;
    for (let row = 0; row < rowCount; row ++) {
        for (let column = 0 ; column < columnCount; column ++) {
            if (map[row][column] == RIGHT && map[row][(column+1)%columnCount] == EMPTY) {
                map[row][(column+1)%columnCount] = RIGHT;
                map[row][column] = EMPTY;
                column = column + 1;
                hasMoved = true;
            }
        }
    }
    return hasMoved;
};
const moveDowns = (map) => {
    let rowCount = map.length;
    let columnCount = map[0].length;
    let hasMoved = false;
    for (let column = 0 ; column < columnCount; column ++) {
        for (let row = 0; row < rowCount; row ++) {
            if (map[row][column] == DOWN && map[(row+1)%rowCount][column] == EMPTY) {
                map[(row+1)%rowCount][column] = DOWN;
                map[row][column] = EMPTY;
                row = row + 1;
                hasMoved = true;
            }
        }
    }
    return hasMoved;
};

const parse = (input) => {    
    return input.trim().split('\n')
        .map(line => line.trim().split('').map(char => {
            if (char == '.') return EMPTY;
            if (char == '>') return RIGHT;
            if (char == 'v') return DOWN;
        }));
};
