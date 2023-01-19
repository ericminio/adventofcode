const { expect } = require('chai');
const { Chronos } = require('./chronos');

describe.only('chronos', () => {
    let chronos;
    beforeEach(() => {
        chronos = new Chronos();
        chronos.start();
    });

    it('records tops', () => {
        chronos.top('one');
        chronos.top('two');

        expect(chronos.tops.length).to.equal(2);
        expect(chronos.tops[0].label).to.equal('one');
        expect(chronos.tops[1].label).to.equal('two');
    });

    it('records tops with delay', async () => {
        chronos.top('one');
        await new Promise(resolve => {
            setTimeout(resolve, 15);
        });
        chronos.top('two');

        expect(chronos.tops[1].delay).to.be.above(chronos.tops[0].delay);
    });
});
