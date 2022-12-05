const { expect } = require('chai');
const { solve1 } = require('./solve');

describe('part 1', () => {

    it('has an example', () => {
        expect(solve1('example')).to.equal(24000);
    });

    it('works with one elf carrying a single item', () => {
        expect(solve1('one')).to.equal(1000);
    });
    it('works with one elf carrying two items', () => {
        expect(solve1('two')).to.equal(3000);
    });
    it('works with two elves carrying several items', () => {
        expect(solve1('three')).to.equal(4000);
    });

    it('is solved', () => {
        expect(solve1('input')).to.equal(72718);
    });
});

