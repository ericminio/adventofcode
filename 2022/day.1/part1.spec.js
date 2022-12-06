const { expect } = require('chai');
const { solve1 } = require('./solve');

describe('part 1', () => {

    it('has an example', () => {
        expect(solve1(`${__dirname}/example.txt`)).to.equal(24000);
    });

    it('works with one elf carrying a single item', () => {
        expect(solve1(`${__dirname}/one.txt`)).to.equal(1000);
    });

    it('works with one elf carrying two items', () => {
        expect(solve1(`${__dirname}/two.txt`)).to.equal(3000);
    });

    it('works with two elves carrying several items', () => {
        expect(solve1(`${__dirname}/three.txt`)).to.equal(4000);
    });

    it('is solved', () => {
        expect(solve1(`${__dirname}/input.txt`)).to.equal(72718);
    });
});

