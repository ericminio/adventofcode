var Location = require('./location.in.radioisotope.testing.facility');
var expect = require('chai').expect;

describe('Location in Radioisotope Testing Facility', function() {

    var location;

    beforeEach(function() {
        location = new Location([
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  LG .  ',
                'F2 .  HG .  .  .  ',
                'F1 E  .  HM .  LM '
        ]);
    });

    it('knows its neighbours', function() {
        expect(location.neighbours()).to.deep.equal([
            [
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  LG .  ',
                'F2 E  HG HM  .  .  ',
                'F1    .  .   .  LM '
            ],
        ]);
    });
});
