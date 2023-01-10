const { expect } = require('chai');
const { push } = require('./push');

describe.only('index after pushing', () => {

    it('works for 1', () => {
        let list = [1, 2, 3];
        let message = list.slice();
        push(0, list, message);

        expect(message).to.deep.equal([2, 1, 3])
    });

});