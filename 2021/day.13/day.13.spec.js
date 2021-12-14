const { expect } = require('chai')
const { lines, integers } = require('../puzzle.input')

describe.only('day 13 challenge', ()=> {

    it('is about folding vertically', () => {
        expect(foldVertically({ x:0, y:0 }, 2)).to.deep.equal({ x:0, y:0 });
    })
    describe('folding vertically', () => {

        it('keeps point untouched when above the line', () => {
            expect(foldVertically({ x:42, y:6 }, 7)).to.deep.equal({ x:42, y:6 });
        })
        it('moves points vertically when below the line', () => {
            expect(foldVertically({ x:42, y:8 }, 7)).to.deep.equal({ x:42, y:6 });
        })
    })

    const foldVertically = (point, line) => {
        return {
            x: point.x,
            y: point.y < line ? point.y : line - (point.y - line)
        };
    }   
    
    it('is about folding horizontally', () => {
        expect(foldHorizontally({ x:0, y:0 }, 2)).to.deep.equal({ x:0, y:0 });
    })
    describe('folding horizontally', () => {

        it('keeps point untouched when before the line', () => {
            expect(foldHorizontally({ x:2, y:42 }, 7)).to.deep.equal({ x:2, y:42 });
        })
        it('moves points vertically when below the line', () => {
            expect(foldHorizontally({ x:8, y:42 }, 7)).to.deep.equal({ x:6, y:42 });
        })
    })

    const foldHorizontally = (point, line) => {
        return {
            x: point.x < line ? point.x : line - (point.x - line),
            y: point.y
        };
    } 

    const example = lines('day.13', 'example.txt');
    const input = lines('day.13', 'input.txt');

    describe('parsing', () => {

        it('can extract points', () => {
            let points = parsePoints(example);
            expect(points[points.length-1]).to.deep.equal({ x:9, y:0 })        
        })
        it('can extract folding instructions', () => {
            let foldings = parseFoldings(example);
            expect(foldings).to.deep.equal([
                { direction:foldVertically, line:7 },
                { direction:foldHorizontally, line:5 }
            ])
        })
    })

    const parsePoints = (input) => {
        return input.filter(line => line.indexOf(',') != -1).map(line => {
            let parts = line.split(',');
            return { x:parseInt(parts[0]), y:parseInt(parts[1])}
        })
    }
    const parseFoldings = (input) => {
        return input.filter(line => line.indexOf('fold') != -1).map(line => {
            let parts = line.split('=');
            return (parts[0].indexOf('y') != -1)
                ? { direction:foldVertically, line:parseInt(parts[1]) }
                : { direction:foldHorizontally, line:parseInt(parts[1]) }
        })
    }

    describe('part 1', () => {

        it('needs to remove duplicates', () => {
            expect(removeDuplicates([
                { x:0, y:0 }, { x:0, y:1 }, { x:1, y:0 }, { x:0, y:0 }
            ])).to.deep.equal([
                { x:0, y:0 }, { x:0, y:1 }, { x:1, y:0 }
            ])
        })

        it('has an example', () => {
            let points = parsePoints(example);
            let folding = parseFoldings(example)[0];

            let next = removeDuplicates(points.map(p => folding.direction(p, folding.line)));
            expect(next.length).to.equal(17)
        })

        it('can be solved', () => {
            let points = parsePoints(input);
            let folding = parseFoldings(input)[0];

            let next = removeDuplicates(points.map(p => folding.direction(p, folding.line)));
            expect(next.length).to.equal(837)
        })
    })

    const removeDuplicates = (values) => {
        let withIds = values.map(p => { return { x:p.x, y:p.y, id:`x${p.x}y${p.y}` } })
        let ids = Array.from(new Set(withIds.map(p => p.id)))
        return ids.map(id => withIds.find(p => p.id == id)).map(p => { return { x:p.x, y:p.y }})
    }

    describe('part 2', () => {

        it('can leverage the example', () => {
            let points = parsePoints(example);
            let foldings = parseFoldings(example);

            foldings.forEach(folding => {
                points = removeDuplicates(points.map(p => folding.direction(p, folding.line)));
            });
            
            expect(drawing(points)).to.deep.equal([
                '#####',
                '#...#',
                '#...#',
                '#...#',
                '#####'
            ])
        })
        const drawing = (points) => {
            let max = { x:0, y: 0}
            points.forEach(p => {
                if (p.x > max.x) { max.x = p.x }
                if (p.y > max.y) { max.y = p.y }
            })
            let drawing = []
            for (y = 0; y < max.y+1; y++) {
                let line = [];
                for (var x = 0; x < max.x+1; x++) {
                    line.push('.')
                }
                drawing.push(line)
            }
            points.forEach(p => {
                drawing[p.y][p.x] = '#'
            })
            return drawing.map(line => line.reduce((acc, curr) => acc += curr, ''))
        }
        it('can be solved', () => {
            let points = parsePoints(input);
            let foldings = parseFoldings(input);

            foldings.forEach(folding => {
                points = removeDuplicates(points.map(p => folding.direction(p, folding.line)));
            });
            expect(drawing(points)).to.deep.equal([
                '####.###..####..##..#..#..##..#..#.#..#',  
                '#....#..#....#.#..#.#.#..#..#.#..#.#..#',  
                '###..#..#...#..#....##...#....####.#..#',  
                '#....###...#...#.##.#.#..#....#..#.#..#',  
                '#....#....#....#..#.#.#..#..#.#..#.#..#',  
                '####.#....####..###.#..#..##..#..#..##.',  
            ]);
        })
    })
    
})
