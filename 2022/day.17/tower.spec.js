const { expect } = require('chai');
const { Tower } = require('./tower.js');

describe.only('tower', () => {

    it('starts empty', () => {
        let tower = new Tower();

        expect(tower.size).to.equal(0);
        expect(tower.fallenRocks).to.equal(0);
    });
});