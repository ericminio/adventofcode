const { expect } = require('chai');
const { lines } = require('../support/index.js');
const { parse } = require('./parser.js');
const example = `${__dirname}/data/example.txt`;

const spaceAsHash = (boundaries) => {
};

describe.only('map', () => {

    let map;
    beforeEach(() => {
        map = spaceAsHash();
    });

    it('exposes neighbours', () => {

    });
});
