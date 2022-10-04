const { expect } = require('chai')
const { line } = require('../puzzle.input')
const { load } = require('../../lib/2d/loading');
const { gps } = require('../../lib/2d/gps');
const { mapAsHash, id } = require('../../lib/2d/map');

describe('day 15 challenge', () => {

    it('can explore example', () => {
        let map = load(`
            1163751742
            1381373672
            2136511328
            3694931569
            7463417111
            1319128137
            1359912421
            3125421639
            1293138521
            2311944581
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'9x9' }
        };
        let path = gps(request, map);
        
        expect(path.nodes[path.nodes.length - 1].total).to.equal(41);
    });

    it('can clear part 1', () => {
        let map = load(line('day.15'));        
        expect(map['0x0'].value).to.equal(9);        
        expect(map.size).to.deep.equal({ width:100, height:100 });

        let request = {
            origin: { id:'0x0' },
            target: { id:'99x99' }
        };
        let path = gps(request, map);        
        expect(path.nodes[path.nodes.length - 1].total).to.equal(723);
    });

    describe('map extension', () => {

        it('works with a 1x1 map', () => {
            let map = load(`
                8
            `);
            let extended = extendMap(map);

            expect(extended.size).to.deep.equal({ width:5, height:5 });
            expect(extended['0x0'].value).to.equal(8);
            expect(extended['0x1'].value).to.equal(9);
            expect(extended['0x2'].value).to.equal(1);
            expect(extended['0x3'].value).to.equal(2);
            expect(extended['1x0'].value).to.equal(9);
            expect(extended['2x0'].value).to.equal(1);

            expect(extended['1x1'].value).to.equal(1);
        });
    });

    it('can explore example of part 2', () => {
        let map = load(`
            1163751742
            1381373672
            2136511328
            3694931569
            7463417111
            1319128137
            1359912421
            3125421639
            1293138521
            2311944581
        `);
        let extended = extendMap(map);
        let request = {
            origin: { id:'0x0' },
            target: { id:'49x49' }
        };
        let path = gps(request, extended);
        
        expect(path.nodes[path.nodes.length - 1].total).to.equal(316);
    });

    it('can clear part 2', () => {
        let map = load(line('day.15'));  
        let extended = extendMap(map);      
        expect(extended.size).to.deep.equal({ width:500, height:500 });
        expect(map['0x0'].value).to.equal(9);  

        let request = {
            origin: { id:'0x0' },
            target: { id:'499x499' }
        };
        let path = gps(request, extended);        
        expect(path.nodes[path.nodes.length - 1].total).to.equal(2957);
    });
    
    const extendMap = (map) => {
        let extended = mapAsHash({ height:map.size.height*5, width:map.size.width*5 });
        for (var row = 0; row < 5; row ++) {
            for (var column = 0; column < 5; column ++) {                
                for (var i = 0; i < map.size.height; i ++) {
                    for (var j = 0 ; j < map.size.width; j++) {
                        let cellId = id(i + row * map.size.height, j + column * map.size.width);
                        if (row == 0 && column == 0) {
                            extended[cellId].value = map[id(i, j)].value;
                        }
                        else if (column > 0) {
                            extended[cellId].value = extended[id(i + row * map.size.height, j + (column-1) * map.size.width)].value % 9 + 1;
                        }
                        else {
                            extended[cellId].value = extended[id(i + (row-1) * map.size.height, j + column * map.size.width)].value % 9 + 1;
                        }
                    }
                }                    
            }
        }

        return extended;
    };
})
