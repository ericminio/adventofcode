const { expect } = require('chai');
const { solve1, load } = require('./solve');

describe.only('2022.12', () => {

    describe('part 1', () => {

        it('has an example', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(31);
        });
        it('is solved', () => {
            expect(solve1(`${__dirname}/data/example.txt`)).to.equal(31);
        });

    });

    describe('loading the map', () => {

        it('exposes the size of the map', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map.size).to.deep.equal({ height: 2, width: 3 });
        });

        it('exposes the request', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map.request).to.deep.equal({ origin: { id: '0x0' }, target: { id: '1x2' } });
        });

        it('sets expected value', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map['1x2'].value).to.equal(1);
        });

        it('sets expected height', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map['0x0'].height).to.equal(1);
            expect(map['0x1'].height).to.equal(2);
            expect(map['1x2'].height).to.equal(26);
        });

        it('sets expected neighbours', () => {
            let map = load(`
                Sbc
                deE
            `);
            expect(map['0x0'].neighbours).to.deep.equal(['0x1']);
        });
    });
});


