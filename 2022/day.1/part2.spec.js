const { expect } = require('chai');
const { solve } = require('./solve');

describe('part 2', () => {

    it('has an example', () => {
        expect(solve('example')).to.equal(24000);
    });
});

