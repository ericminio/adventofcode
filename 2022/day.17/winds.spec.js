const { expect } = require('chai');
const { Winds, LEFT } = require('./winds');

describe('winds', () => {

    it('can be left', () => {
        const winds = new Winds('<');

        expect(winds.next()).to.deep.equal(LEFT);
    });
});