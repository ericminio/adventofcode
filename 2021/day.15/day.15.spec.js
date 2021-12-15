const { expect } = require('chai')
const { integers } = require('../puzzle.input')

describe.only('day 15 challenge', ()=> {    


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
                expect(map.valueAt(new Position(-1, 0))).to.equal(summit);
            })
            it('resists position before first column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, -1))).to.equal(summit);
            })
            it('resists position after last row', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(3, 0))).to.equal(summit);
            })
            it('resists position after last column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, 2))).to.equal(summit);
            })
        })
        
    })

    const summit = 9;

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
            if (this.matrix[position.row] !== undefined &&
                this.matrix[position.row][position.column] !== undefined) {
                    return this.matrix[position.row][position.column];
                }
            return summit;
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
        it('provides an id', () => {
            expect(new Position(3, 4).id).to.equal('r3c4');
        })
    })
    class Position {
        constructor(row, column) {
            this.row = row;
            this.column = column;
            this.id = `r${this.row}c${this.column}`;
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


    describe('possible paths', () => {
        
        it('finds only two for the smallest square', () => {
            let map = new Map([[1, 2], [3, 4]])
            let candidates = paths(map);

            expect(candidates).to.deep.equal([
                [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }],
                [ { row:0, column:0 }, { row:0, column:1 }, { row:1, column:1 }],
            ])
            expect(riskLevel(map)).to.equal(7)
        })
    })
    const riskLevel = (map) => {
        let candidates = paths(map);
        let riskLevels = candidates.map(candidate =>
            candidate.reduce((risk, position) => risk += map.valueAt(position) , 0)
        )
        riskLevels.sort((a, b) => a-b)
        return riskLevels[0]
    }
    const paths = (map) => {
        let start = new Position(0, 0)
        let target = new Position(map.rowCount() - 1, map.columnCount() -1)
        return [
            [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }],
            [ { row:0, column:0 }, { row:0, column:1 }, { row:1, column:1 }],
        ]
    }
})
