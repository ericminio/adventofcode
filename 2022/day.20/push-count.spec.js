const { expect } = require('chai');
const { pushCount } = require('./push-count');

describe.only('array item pushing count', () => {

    it('works for zero', () => {
        let list = [1, 2, 3];

        expect(pushCount(0, list.length)).to.equal(0);
    });

    it('works for 1', () => {
        let list = [1, 2, 3];

        expect(pushCount(1, list.length)).to.equal(1);
    });

    it('circles back', () => {
        let list = [1, 2, 3];

        expect(pushCount(8, list.length)).to.equal(0);
    });

    it('works for -1', () => {
        let list = [1, 2, 3];

        expect(pushCount(-1, list.length)).to.equal(-1);
    });

    it('circles back in the negative too', () => {
        let list = [1, 2, 3];

        expect(pushCount(-8, list.length)).to.equal(0);
    });
});
