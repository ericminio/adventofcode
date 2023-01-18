const { expect } = require('chai');

const spaceAsHash = (boundaries) => {
    let map = {};

    map['0x0x0'] = { neighbours: [ '1x0x0', '0x1x0', '0x0x1' ] };

    return map;
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        map = spaceAsHash();
    });

    it('computes two neighbours as expected', () => {
        expect(map['0x0x0']).to.deep.equal({ neighbours: [ '1x0x0', '0x1x0', '0x0x1' ] });
    });
});
