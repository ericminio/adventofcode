const { expect } = require('chai');

describe.only('exploring cube touching', () => {

    it('is fun', () => {
        let total = exposed({
            '1,1,1': { x: 1, y: 1, z: 1 },
            '2,1,1': { x: 2, y: 1, z: 1 },
        });
        expect(total).to.equal(10);
    });
});

const exposed = (cubes) => {
    let cubeCount = Object.keys(cubes).length;

    return cubeCount * 6 - touching(cubes) ;
};

const touching = (cubes) => {
    let total = 0;

    let cube = Object.values(cubes)[0];
    total ++;

    total ++;

    return total;
};