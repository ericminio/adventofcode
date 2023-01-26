const { expect } = require('chai');
const { Tower } = require('./tower.js');

describe.only('tower', () => {
    let tower;

    beforeEach(() => {
        tower = new Tower();
    });

    it('starts empty', () => {
        expect(tower.height).to.equal(0);
        expect(tower.fallenRocks).to.equal(0);
    });

    it('has vertical wall on the left', () => {

    });
});