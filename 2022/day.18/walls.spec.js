const { expect } = require('chai');
const { spaceAsHash } = require('../../lib/3d/space.js');
const { setWall } = require('./walls.js');

describe.only('wall', () => {

    let map;
    beforeEach(() => {
        map = spaceAsHash({ minimum: { x: 0, y: 0, z: 0 }, maximum: { x: 3, y: 3, z: 3 }});
    });

    it('is removed from neighbours', () => {
        setWall('1x0x0', map);
        expect(map['0x0x0']).to.deep.equal({
            id: '0x0x0',
            position: { x: 0, y: 0, z: 0 },
            neighbours: [ '0x1x0', '0x0x1' ]
        });
    });

    it('is removed from space', () => {
        setWall('1x0x0', map);
        expect(map['1x0x0']).to.equal(undefined);
    });
});
