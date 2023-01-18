const { expect } = require('chai');
const { spaceAsHash } = require('./space.js');

describe.only('map', () => {

    let map;
    beforeEach(() => {
        map = spaceAsHash({ minimum: { x: 0, y: 0, z: 0 }, maximum: { x: 3, y: 3, z: 3 }});
    });

    it('computes two neighbours as expected', () => {
        expect(map['0x0x0']).to.deep.equal({
            id: '0x0x0',
            position: { x: 0, y: 0, z: 0 },
            neighbours: [ '1x0x0', '0x1x0', '0x0x1' ]
        });
    });

    it('computes six neighbours as expected', () => {
        expect(map['1x1x1']).to.deep.equal({
            id: '1x1x1',
            position: { x: 1, y: 1, z: 1 },
            neighbours: [ '2x1x1', '0x1x1', '1x2x1', '1x0x1', '1x1x2', '1x1x0' ]
        });
    });
});
