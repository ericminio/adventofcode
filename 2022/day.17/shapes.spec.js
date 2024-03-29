const { expect } = require('chai');
const { Shapes, HORIZONTAL } = require('./shapes');

describe('Shapes', () => {

    it('provides bar first', () => {
        const shapes = new Shapes();

        expect(shapes.next()).to.be.instanceOf(HORIZONTAL);
    });

    it('provides the four shapes in order and then loop', () => {
        const shapes = new Shapes();
        const sequence = [
            shapes.next(), shapes.next(), shapes.next(), shapes.next(), shapes.next(),
            shapes.next()
        ].map(o => o.constructor.name);

        expect(sequence).to.deep.equal([
            'Horizontal', 'Plus', 'El', 'Vertical', 'Square',
            'Horizontal'
        ]);
    });

    it('provides unique instances', () => {
        const shapes = new Shapes();
        const bar1 = shapes.next();
        shapes.next(); shapes.next(); shapes.next(); shapes.next();
        const bar2 = shapes.next();

        expect(bar2).to.not.equal(bar1);
    });
});