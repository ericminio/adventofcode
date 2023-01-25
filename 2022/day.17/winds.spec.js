const { expect } = require('chai');
const { Winds, LEFT, RIGHT } = require('./winds');

describe('winds', () => {

    it('can be left', () => {
        const winds = new Winds('<');

        expect(winds.next()).to.deep.equal(LEFT);
    });

    it('can be right', () => {
        const winds = new Winds('>');

        expect(winds.next()).to.deep.equal(RIGHT);
    });

    it('loop', () => {
        const winds = new Winds('<>');

        let current = winds.next();
        expect(current).to.deep.equal(LEFT);
        current = winds.next();
        expect(current).to.deep.equal(RIGHT);
        current = winds.next();
        expect(current).to.deep.equal(LEFT);
    });
});