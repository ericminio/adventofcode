const { expect } = require('chai');
const { mapAsHash } = require('./map');

describe('map as hash', () => {

    it('computes two neighbours as expected', () => {
        let map = mapAsHash({ height: 2, width: 2 });
        expect(map['0x0']).to.deep.equal({ neighbours: [ '0x1', '1x0' ] });
    });

    it('computes three neighbours as expected', () => {
        let map = mapAsHash({ height: 2, width: 3 });
        expect(map['0x1']).to.deep.equal({ neighbours: [ '0x2', '1x1', '0x0' ] });
    });

    it('computes four neighbours as expected', () => {
        let map = mapAsHash({ height: 3, width: 3 });
        expect(map['1x1']).to.deep.equal({ neighbours: [ '1x2', '2x1', '1x0', '0x1' ] });
    });

    it('exposes size of map', () => {
        let map = mapAsHash({ height: 2, width: 3 });

        expect(map.size).to.deep.equal({ height: 2, width: 3 });
    });
});
