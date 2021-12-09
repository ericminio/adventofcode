const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe('day 9 challenge', ()=> {

    describe('low points', () => {

        it('is available for study', () => {
            expect(lowPoints([[1]])).to.deep.equal([1]);
        })
        it('can digest 2 digits', () => {
            expect(lowPoints([[4, 3]])).to.deep.equal([3]);
        })
        it('can digest 2 rows', () => {
            expect(lowPoints([[1, 3], [3, 2]])).to.deep.equal([1, 2]);
        })
        it('needs 4 higher neighbours', () => {
            expect(lowPoints([[1, 2], [1, 0]])).to.deep.equal([0]);
        })
    })

    const lowPoints = (matrix) => {
        let points = [];
        let map = new Map(matrix);
        
        for (var row=0; row<map.rowCount(); row++) {
            for (var column=0; column<map.columnCount(); column++) {
                let position = new Position(row, column);
                let value = map.valueAt(position);
                let right = map.valueAt(position.right());
                let left = map.valueAt(position.left());
                let up = map.valueAt(position.up());
                let down = map.valueAt(position.down());
                if (value < right && 
                    value < left &&
                    value < up &&
                    value < down
                    ) {
                    points.push(value);
                }
            }
        }

        return points;
    }

    describe('Map', () => {
        it('provides rowCount', () => {
            let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
            expect(map.rowCount()).to.equal(3);
        })
        it('provides columnCount', () => {
            let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
            expect(map.columnCount()).to.equal(2);
        })
        it('provides valueAt', () => {
            let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
            expect(map.valueAt(new Position(0, 0))).to.equal(1);
        })
        describe('valueAt', () => {
            it('provides acces to internal value', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, 0))).to.equal(1);
            })
            it('resists position before first row', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(-1, 0))).to.equal(10);
            })
            it('resists position before first column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, -1))).to.equal(10);
            })
            it('resists position after last row', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(3, 0))).to.equal(10);
            })
            it('resists position after last column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, 2))).to.equal(10);
            })
        })
        
    })
    class Map {
        constructor(matrix){
            this.matrix = matrix;
        }
        rowCount() {
            return this.matrix.length;
        }
        columnCount() {
            return this.matrix[0].length;
        }
        valueAt(position) {
            if (position.row < 0) { return 10; }
            if (position.column < 0) { return 10; }
            if (position.row >= this.rowCount()) { return 10; }
            if (position.column >= this.columnCount()) { return 10; }
            return this.matrix[position.row][position.column];
        }
    }
    describe('Position', () => {
        it('keeps given position', () => {
            expect(new Position(3, 4).row).to.equal(3);
            expect(new Position(3, 4).column).to.equal(4);
        })
        it('provides right position', () => {
            expect(new Position(3, 4).right().row).to.equal(3);
            expect(new Position(3, 4).right().column).to.equal(5);
        })
        it('provides left position', () => {
            expect(new Position(3, 4).left().row).to.equal(3);
            expect(new Position(3, 4).left().column).to.equal(3);
        })
        it('provides up position', () => {
            expect(new Position(3, 4).up().row).to.equal(2);
            expect(new Position(3, 4).up().column).to.equal(4);
        })
        it('provides down position', () => {
            expect(new Position(3, 4).down().row).to.equal(4);
            expect(new Position(3, 4).down().column).to.equal(4);
        })
    })
    class Position {
        constructor(row, column) {
            this.row = row;
            this.column = column;
        }
        right() {
            return new Position(this.row, this.column + 1);
        }
        left() {
            return new Position(this.row, this.column - 1);
        }
        up() {
            return new Position(this.row - 1, this.column);
        }
        down() {
            return new Position(this.row + 1, this.column);
        }
    }

    describe('part 1', () => {

        describe('example', () => {

            const example = lines('day.9', 'example.txt');

            it('can be parsed', () => {
                let matrix = parse(example);
                let map = new Map(matrix);

                expect(map.valueAt(new Position(0, 0))).to.equal(2);
                expect(map.valueAt(new Position(map.rowCount() - 1, map.columnCount() - 1))).to.equal(8);
            })
            it('has known low points', () => {
                let matrix = parse(example);
                let points = lowPoints(matrix);

                expect(points).to.deep.equal([1, 0, 5, 5]);
            });
            it('gives expected total risk level', () => {
                expect(riskLevel(example)).to.equal(15);
            })
        })
        const parse = (lines) => {
            return lines.map(line => line.split('').map(c => parseInt(c)));
        }
        const riskLevel = (lines) => {
            let matrix = parse(lines);
            let points = lowPoints(matrix);

            return points.map(p => p+1).reduce((acc, curr) => acc += curr, 0)
        }

        describe('solution', () => {
            it('is now available', () => {
                const input = lines('day.9', 'input.txt');
                
                expect(riskLevel(input)).to.equal(491);
            })
        })
    })
})
