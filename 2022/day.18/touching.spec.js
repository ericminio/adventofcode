const { expect } = require('chai');

describe.only('exploring cube touching', () => {

    it('is fun', () => {
        let total = exposed({
            '1,1,1': 1,
            '2,1,1': 1,
        });
        expect(total).to.equal(10);
    });
});

const exposed = (cubes) => 10;