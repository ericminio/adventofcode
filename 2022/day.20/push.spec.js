const { expect } = require('chai');
const { endIndex } = require('./end-index');
const { push } = require('./push');

describe.only('index after pushing', () => {

    it('works for 1', () => {
        let list = [1, 2, 3];
        let message = list.slice();
        push(0, list, message);
    });

});