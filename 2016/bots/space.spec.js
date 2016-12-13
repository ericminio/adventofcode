var expect = require('chai').expect;
var Space = require('./space');

describe('Space', function() {

    var space;
    var listener = {};

    beforeEach(function() {
        space = new Space(listener);
    });

    it('creates bot when missing', function() {
        expect(space.findBot(42).id).to.equal(42);
    });

    it('returns the expected bot', function() {
        expect(space.findBot(42)).to.equal(space.findBot(42));
    });

    it('creates output when missing', function() {
        expect(space.findOutput(15).id).to.equal(15);
    });

    it('returns the expected output', function() {
        expect(space.findOutput(15)).to.equal(space.findOutput(15));
    });

    it('gives the listener to each bot', function() {
        expect(space.findBot(42).listener).to.equal(listener);
    });
});
