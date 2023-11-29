const { expect } = require('chai');
const paths = require('../../solution/paths');

describe('paths extraction', () => {
    it('works with ^v', () => {
        expect(paths('^v')).to.deep.equal(['^', 'v']);
    });

    it('works with ^>v<', () => {
        expect(paths('^>v<')).to.deep.equal(['^v', '><']);
    });

    it('works with ^v^v^v^v^v', () => {
        expect(paths('^v^v^v^v^v')).to.deep.equal(['^^^^^', 'vvvvv']);
    });
});
