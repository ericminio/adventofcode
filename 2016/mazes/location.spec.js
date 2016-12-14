var expect = require('chai').expect;
var xy = require('./location');

describe('Location', function() {

    it('exposes x', function() {
        expect(xy(3, 5).x).to.equal(3);
    });
    it('exposes y', function() {
        expect(xy(3, 5).y).to.equal(5);
    });
});
