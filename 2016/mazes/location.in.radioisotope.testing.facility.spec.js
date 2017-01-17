var Location = require('./location.in.radioisotope.testing.facility');
var expect = require('chai').expect;

describe('Location in Radioisotope Testing Facility', function() {

    var location;

    beforeEach(function() {
        location = new Location([
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 .  AA .  .  .  ',
                'F1 E  .  BB .  DD '
        ]);
    });

    it('knows its neighbours', function() {
        expect(location.neighbours()).to.deep.equal([
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA BB .  .  ',
                'F1 .  .  .  .  DD '
            ],
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA .  .  DD ',
                'F1 .  .  BB .  .  '
            ],
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA BB .  DD ',
                'F1 .  .  .  .  .  '
            ]
        ]);
    });

    it('can move first item up', function() {
        expect(location.move(-1, [1])).to.deep.equal(
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA BB .  .  ',
                'F1 .  .  .  .  DD '
            ]
        );
    });
    it('can move second item up', function() {
        expect(location.move(-1, [2])).to.deep.equal(
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA .  .  DD ',
                'F1 .  .  BB .  .  '
            ]
        );
    });
    it('can move two items up', function() {
        expect(location.move(-1, [1, 2])).to.deep.equal(
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  CC .  ',
                'F2 E  AA BB .  DD ',
                'F1 .  .  .  .  .  '
            ]
        );
    });
});
