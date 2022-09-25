const { expect } = require('chai');
const { load } = require('./loading');

describe.only('loading map', () => {

    it('sets expected size', () => {
        let map = load(`
            123
            456
        `);

        expect(map.size).to.deep.equal({ height:2, width:3 });
    });

    it('sets expected value', () => {
        let map = load(`
            123
            456
        `);

        expect(map['1x2'].value).to.equal(6);
    });

    it('sets expected id', () => {
        let map = load(`
            123
            456
        `);

        expect(map['1x2'].id).to.equal('1x2');
    });
});