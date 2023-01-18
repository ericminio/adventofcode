const { expect } = require('chai');
const { around } = require('./cube');
const { exposed } = require('./exposed');

describe('exploring cube touching', () => {

    it('is fun', () => {
        let total = exposed({
            '1,1,1': { neighbours: around({ x: 1, y: 1, z: 1 }) },
            '2,1,1': { neighbours: around({ x: 2, y: 1, z: 1 }) }
        });
        expect(total).to.equal(10);
    });
});
