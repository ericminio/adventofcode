const { expect } = require('chai');
const { mapAsHash } = require('./map');

describe('map as hash', () => {

    it('computes two neighbours as expected', () => {
        let map = mapAsHash({ row:2, column:2 });
        expect(map['0x0']).to.deep.equal({
            neighbours: [ '0x1', '1x0' ]
        });
    });

    it('computes three neighbours as expected', () => {
        let map = mapAsHash({ row:2, column:3 });
        expect(map['0x1']).to.deep.equal({
            neighbours: [ '0x2', '1x1', '0x0' ]
        });
    });

    it('computes four neighbours as expected', () => {
        let map = mapAsHash({ row:3, column:3 });
        expect(map['1x1']).to.deep.equal({
            neighbours: [ '1x2', '2x1', '1x0', '0x1' ]
        });
    });
});