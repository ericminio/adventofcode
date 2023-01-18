const { expect } = require('chai');
const { spaceAsHash } = require('./space.js');

const setWall = (id, map) => {
    Object.keys(map).forEach(key => {
        let neighbours = map[key].neighbours;
        let index = neighbours.indexOf(id);
        if (index !== -1) {
            neighbours.splice(index, 1);
        }
    });
};
describe.only('walls', () => {

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
});
