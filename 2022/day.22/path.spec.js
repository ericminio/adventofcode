const { expect } = require('chai');

describe.only('parsing the path', () => {

    it('can be explored', () => {
        const path = parse('10R');

        expect(path).to.deep.equal([
            { move: 10 },
            { rotate: 'R' }
        ]);
    });
});

const parse = (spec) => {
    const path = [];

    let command = { move: 10 };
    path.push(command);

    command = { rotate: 'R' };
    path.push(command);

    return path;
};