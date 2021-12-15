const { expect } = require('chai')
const { lines } = require('../puzzle.input')

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
        describe('exists', () => {
            it('is true inside the map', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.exists(new Position(0, 0))).to.equal(true);
            })
            it('is false inside the map', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.exists(new Position(-1, 0))).to.equal(false);
                expect(map.exists(new Position(0, -1))).to.equal(false);
                expect(map.exists(new Position(0, 2))).to.equal(false);
                expect(map.exists(new Position(3, 0))).to.equal(false);
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
        exists(position) {
            if (this.matrix[position.row] === undefined ||
                this.matrix[position.row][position.column] === undefined) {
                    return false
                }
            return true
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
        it('equals same position', () => {
            expect(new Position(15, 42).equals(new Position(0, 0))).to.equal(false)
            expect(new Position(15, 42).equals(new Position(15, 42))).to.equal(true)
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
        equals(other) {
            return other.row == this.row && other.column == this.column
        }
    }


    describe('possible paths', () => {
        
        it('finds only two for the smallest square', () => {
            let map = new Map([[1, 2], [3, 4]])
            let result = go(map);

            expect(result.paths).to.deep.equal([
                [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }],
                [ { row:0, column:0 }, { row:0, column:1 }, { row:1, column:1 }],
            ])
            expect(result.min).to.equal(6)
        })
        it('finds expected paths for the smallest rectangle', () => {
            let map = new Map([[1, 2, 3], [4, 5, 6]])
            let result = go(map);

            expect(result.paths).to.deep.equal([
                [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }, { row:1, column:2 }],
                [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }, { row:0, column:1 }, { row:0, column:2 }, { row:1, column:2 }],
                [ { row:0, column:0 }, { row:0, column:1 }, { row:1, column:1 }, { row:1, column:2 }],
                [ { row:0, column:0 }, { row:0, column:1 }, { row:0, column:2 }, { row:1, column:2 }],
            ])
        })
        it('stops going down a path already too risky', () => {
            let map = new Map([[1, 2], [1, 1]])
            let result = go(map);

            expect(result.paths).to.deep.equal([
                [ { row:0, column:0 }, { row:1, column:0 }, { row:1, column:1 }],
            ])
            expect(result.min).to.equal(2)
        })
    })
    const go = (map) => {
        let result = { 
            min: 9*(map.rowCount()+map.columnCount()),
            paths: []
        }
        travel(map, new Position(0, 0), { path:[new Position(0, 0)], sum:0 }, result)
        return result;
    }
    const travel = (map, position, current, result) => {
        if (position.equals(target(map))) { 
            result.paths.push(current.path)
            if (current.sum < result.min) { result.min = current.sum }
            return;
        }
        if (current.sum >= result.min) { return; }
        
        let around = neighbours(position, map);
        around = around.filter(neighbour => notVisited(neighbour, current.path))
        for (var i = 0; i < around.length; i++) {
            let neighbour = around[i];
            let value = map.valueAt(neighbour)
            travel(map, neighbour, { path:current.path.concat(neighbour), sum:current.sum+value }, result)
        }
    }
    const notVisited = (position, path) => {
        return path.find(p => p.row == position.row && p.column == position.column) === undefined;
    }
    const target = (map) => {
        return new Position(map.rowCount() - 1, map.columnCount() -1);
    }
    const neighbours = (position, map) => {
        let around = []
        if (map.exists(position.down())) { around.push(position.down()); }
        if (map.exists(position.right())) { around.push(position.right()); }
        if (map.exists(position.left())) { around.push(position.left()); }
        if (map.exists(position.up())) { around.push(position.up()); }

        return around
    }
    const example = lines('day.15', 'example.txt');
    const parse = (lines) => {
        return lines.map(line => line.split('').map(c => parseInt(c)));
    }
    it('offers an example', () => {
        let map = new Map(parse(example))
        let result = go(map)

        expect(result.min).to.equal(40)
    })
})
