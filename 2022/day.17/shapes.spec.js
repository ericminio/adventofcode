const { expect } = require('chai');
const { Shapes, HORIZONTAL, PLUS, EL, VERTICAL, SQUARE } = require('./shapes');

describe.only('Shapes', () => {

    it('provides bar first', () => {
        const shapes = new Shapes();

        expect(shapes.next()).to.be.instanceOf(HORIZONTAL);
    });

    it.skip('provides the four shapes in order and then loop', () => {
        const shapes = new Shapes();
        const sequence = [
            shapes.next(), shapes.next(), shapes.next(), shapes.next(), shapes.next(),
            shapes.next()
        ];

        expect(sequence).to.deep.equal([
            HORIZONTAL, PLUS, EL, VERTICAL, SQUARE,
            HORIZONTAL
        ]);
    });

    it('provides unique instances', () => {
        const shapes = new Shapes();
        const bar1 = shapes.next();
        shapes.next(); shapes.next(); shapes.next(); shapes.next();
        const bar2 = shapes.next();
    });
});