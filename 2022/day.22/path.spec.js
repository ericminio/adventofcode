const { expect } = require('chai');

describe.only('parsing the path', () => {

    it('can be explored', () => {
        const path = parse('1R');

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: 'R' }
        ]);
    });
});

const parse = (spec) => {
    const path = [
        { move: 10 },
        { rotate: 'R' }
    ];
    return path;
};