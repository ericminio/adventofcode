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
    const data = spec.split(/[RL]/);
    console.log(data);

    const path = [
        { move: 10 },
        { rotate: 'R' }
    ];
    return path;
};