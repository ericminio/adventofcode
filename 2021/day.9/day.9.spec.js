const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe('day 9 challenge', ()=> {

    describe('low points', () => {

        it('is available for study', () => {
            expect(lowPointsValues([[1]])).to.deep.equal([1]);
        })
        it('can digest 2 digits', () => {
            expect(lowPointsValues([[4, 3]])).to.deep.equal([3]);
        })
        it('can digest 2 rows', () => {
            expect(lowPointsValues([[1, 3], [3, 2]])).to.deep.equal([1, 2]);
        })
        it('needs 4 higher neighbours', () => {
            expect(lowPointsValues([[1, 2], [1, 0]])).to.deep.equal([0]);
        })
    })

    const lowPoints = (matrix) => {
        let points = [];
        let map = new Map(matrix);
        
        for (var row=0; row<map.rowCount(); row++) {
            for (var column=0; column<map.columnCount(); column++) {
                let position = new Position(row, column);
                if (isLow(position, map)){
                    points.push({
                        value:map.valueAt(position), 
                        position:new Position(row, column)
                    });
                }
            }
        }

        return points;
    }
    const isLow = (position, map) => {
        let value = map.valueAt(position);
        return neighbours(position, map)
                .reduce((acc, neighbour) => acc += map.valueAt(neighbour) > value, 0) 
                == 4;
    }
    const neighbours = (position, map) => {
        return [
            position.right(),
            position.left(),
            position.up(),
            position.down()
        ]
    }
    const lowPointsValues = (matrix) => {
        let points = lowPoints(matrix);
        return points.map(p => p.value);
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
                expect(map.valueAt(new Position(-1, 0))).to.equal(outside);
            })
            it('resists position before first column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, -1))).to.equal(outside);
            })
            it('resists position after last row', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(3, 0))).to.equal(outside);
            })
            it('resists position after last column', () => {
                let map = new Map([ [1, 2], [3, 4], [5, 6] ]);
                expect(map.valueAt(new Position(0, 2))).to.equal(outside);
            })
        })
        
    })
    
    const outside = 9;

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
            return outside;
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

    describe('part 1', () => {

        describe('example', () => {

            it('can be parsed', () => {
                let matrix = parse(example);
                let map = new Map(matrix);

                expect(map.valueAt(new Position(0, 0))).to.equal(2);
                expect(map.valueAt(new Position(map.rowCount() - 1, map.columnCount() - 1))).to.equal(8);
            })
            it('has known low points', () => {
                let matrix = parse(example);
                let points = lowPointsValues(matrix);

                expect(points).to.deep.equal([1, 0, 5, 5]);
            });
            it('gives expected total risk level', () => {
                expect(riskLevel(example)).to.equal(15);
            })
        })
        const riskLevel = (lines) => {
            let matrix = parse(lines);
            let points = lowPointsValues(matrix);

            return points.map(p => p+1).reduce((acc, curr) => acc += curr, 0)
        }

        describe('solution', () => {
            it('is now available', () => {                
                expect(riskLevel(input)).to.equal(491);
            })
        })
    })

    const example = lines('day.9', 'example.txt');

    const parse = (lines) => {
        return lines.map(line => line.split('').map(c => parseInt(c)));
    }

    const input = lines('day.9', 'input.txt');

    describe('bassin size', () => {

        it('is available for study', () => {
            let map = new Map([[3]]);
            let position = new Position(0, 0);

            expect(bassinSize(map, position)).to.equal(1);
        })
        it('can grow to the right', () => {
            let map = new Map([[3, 4]]);
            let position = new Position(0, 0);

            expect(bassinSize(map, position)).to.equal(2);
        })
        it('can grow twice to the right', () => {
            let map = new Map([[3, 4, 5]]);
            let position = new Position(0, 0);

            expect(bassinSize(map, position)).to.equal(3);
        })
        it('stops growing on 9', () => {
            let map = new Map([[3, 4, 5, 9]]);
            let position = new Position(0, 0);

            expect(bassinSize(map, position)).to.equal(3);
        })
        it('can grow to the left', () => {
            let map = new Map([[4, 3]]);
            let position = new Position(0, 1);

            expect(bassinSize(map, position)).to.equal(2);
        })
        it('does not count a position twice', () => {
            let map = new Map([[1, 0], [2, 1]]);
            let position = new Position(0, 1);

            expect(bassinSize(map, position)).to.equal(4);
        })
    })

    const bassin = (map, position) => {
        if (map.valueAt(position) == outside) { return []; }

        let area = [position];
        let value = map.valueAt(position);
        neighbours(position, map).forEach((neighbour) => {
            if (value < map.valueAt(neighbour)) {
                area = area.concat(bassin(map, neighbour));    
            }
        })

        return area;
    }
    const bassinSize = (map, position) => {
        let area = bassin(map, position);
        let ids = Array.from(new Set(area.map(p => p.id)))
        let uniques = ids.map(id => area.find(p => p.id == id))
        return uniques.length;
    }

    describe('part 2', () => {

        it('needs more info on low points', () => {
            expect(lowPoints([[1]])).to.deep.equal([ { position:new Position(0, 0), value:1 }]);
        })

        it('can be studied with first low point', () => {
            let matrix = parse(example);
            let points = lowPoints(matrix);
            expect(points[0]).to.deep.equal({ value:1, position:new Position(0, 1) })

            let map = new Map(matrix);
            expect(bassinSize(map, points[0].position)).to.equal(3);
        })

        it('can be studied with second low point', () => {
            let matrix = parse(example);
            let points = lowPoints(matrix);
            expect(points[1]).to.deep.equal({ value:0, position:new Position(0, 9) })

            let map = new Map(matrix);
            expect(bassinSize(map, points[1].position)).to.equal(9);
        })

        it('is about the sizes of all bassins', () => {
            let matrix = parse(example);
            let points = lowPoints(matrix);
            let map = new Map(matrix);
            let sizes = points.map(p => bassinSize(map, p.position))

            expect(sizes).to.deep.equal([3, 9, 14, 9])

            sizes.sort((a,b) => b-a);
            expect(sizes).to.deep.equal([14, 9, 9, 3])

            expect(sizes[0] * sizes[1] * sizes[2]).to.equal(1134);
        })

        it('can now be solved', () => {
            let matrix = parse(input);
            let points = lowPoints(matrix);
            let map = new Map(matrix);
            let sizes = points.map(p => bassinSize(map, p.position))
            sizes.sort((a,b) => b-a);
            
            expect(sizes[0] * sizes[1] * sizes[2]).to.equal(1075536);
        })
    })
})
