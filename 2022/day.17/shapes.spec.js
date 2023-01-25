const { expect } = require('chai');
const { Shapes, HORIZONTAL } = require('./shapes');

describe.only('Shapes', () => {

    it('provides bar first', () => {
        const shapes = new Shapes();

        expect(shapes.next()).to.equal(HORIZONTAL);
    });
});