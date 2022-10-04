const { expect } = require('chai')
const { line } = require('../puzzle.input')
const { load } = require('../../lib/2d/loading');
const { gps } = require('../../lib/2d/gps');

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
})
