const { expect } = require('chai');
const { load } = require('./loading');

describe.only('gps', () => {

    it('knows you are already there', () => {
        let map = load(`
            123
            456
        `);
        let request = {
            origin: '0x0',
            target: '0x0'
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal(['0x0'])
    });
});

const gps = () => ['0x0'];