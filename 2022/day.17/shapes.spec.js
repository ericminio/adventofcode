const { expect } = require('chai');
const { Shapes, BAR } = require('./shapes');

describe.only('Shapes', () => {

    it('provides bar first', () => {
        const shapes = new Shapes();

        expect(shapes.next()).to.equal(BAR);
    });
});