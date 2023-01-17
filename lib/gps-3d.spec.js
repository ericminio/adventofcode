const { expect } = require('chai');
const { gps } = require('./gps');

describe('gps - 3d', () => {

    it('can find the location next door', () => {
        let map = {
            '0x0x0': { id: '0x0x0', value: 1, neighbours: [ '0x1x0' ] },
            '0x1x0': { id: '0x1x0', value: 1, neighbours: [ '0x0x0', '0x1x1' ] },
            '0x1x1': { id: '0x1x1', value: 1, neighbours: [ '0x1x0' ] },
        };
        let request = {
            origin: { id: '0x0x0' },
            target: { id: '0x1x1' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x0x0', value: 1, total: 1 },
                { id: '0x1x0', value: 1, total: 2 },
                { id: '0x1x1', value: 1, total: 3 },
            ]
        });
    });


});
