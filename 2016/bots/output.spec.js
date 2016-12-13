var expect = require('chai').expect;
var Output = require('./output');

describe('Output', function() {

    var output;

    beforeEach(function() {
        output = new Output(42);
        expect(output.id).to.equal(42);
    });

    it('can take a chip', function() {
        output.take(5);

        expect(output.chips).to.deep.equal([5]);
    });

    it('can take a second chip', function() {
        output.take(5);
        output.take(7);

        expect(output.chips).to.deep.equal([5, 7]);
    });

    it('can always take more', function() {
        expect(output.canTakeMore()).to.equal(true);
        output.take(5);
        expect(output.canTakeMore()).to.equal(true);
        output.take(7);
        expect(output.canTakeMore()).to.equal(true);
    });
});
