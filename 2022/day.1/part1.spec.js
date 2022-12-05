const { expect } = require('chai');
const { solve } = require('./solve');

describe('part 1', () => {

    it('has an example', () => {
        expect(solve('example')).to.equal(24000);
    });

    it('works with a single elf carrying a single item', () => {
        expect(solve('one')).to.equal(1000);
    });
    it('works with a single elf carrying two items', () => {
        expect(solve('two')).to.equal(1000);
    });
});

