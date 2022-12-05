const { expect } = require('chai');
const { solve } = require('./solve');

describe('part 1', () => {

    it('has an example', () => {
        expect(solve('example')).to.equal(24000);
    });

    it('works with one elf carrying a single item', () => {
        expect(solve('one')).to.equal(1000);
    });
    it('works with one elf carrying two items', () => {
        expect(solve('two')).to.equal(3000);
    });
    it('works with two elves carrying several items', () => {
        expect(solve('three')).to.equal(4000);
    });

    it('is solved', () => {
        expect(solve('input')).to.equal(72718);
    });
});

