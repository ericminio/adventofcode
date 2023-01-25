const { expect } = require('chai');
const { Shapes, HORIZONTAL, PLUS, EL, VERTICAL, SQUARE } = require('./shapes');

describe('Shapes', () => {

    it('provides bar first', () => {
        const shapes = new Shapes();

        expect(shapes.next()).to.equal(HORIZONTAL);
    });

    it('provides the four shapes in order and then loop', () => {
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
});