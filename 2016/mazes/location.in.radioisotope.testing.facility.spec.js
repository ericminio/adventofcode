var Location = require('./location.in.radioisotope.testing.facility');
var expect = require('chai').expect;

describe('Location in Radioisotope Testing Facility', function() {

    var location;

    beforeEach(function() {
        location = new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 .  AA .  .  .  .  ',
                'F2 E  .  BB .  DD .  ',
                'F1 .  .  .  .  .  FF ',
        ]);
    });

    it('knows its neighbours', function() {
        expect(location.neighbours()).to.deep.equal([
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA BB .  .  .  ',
                'F2 .  .  .  .  DD .  ',
                'F1 .  .  .  .  .  FF ',
            ]),
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 .  AA .  .  .  .  ',
                'F2 .  .  .  .  DD .  ',
                'F1 E  .  BB .  .  FF ',
            ]),
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA .  .  DD .  ',
                'F2 .  .  BB .  .  .  ',
                'F1 .  .  .  .  .  FF ',
            ]),
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 .  AA .  .  .  .  ',
                'F2 .  .  BB .  .  .  ',
                'F1 E  .  .  .  DD FF ',
            ]),
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA BB .  DD .  ',
                'F2 .  .  .  .  .  .  ',
                'F1 .  .  .  .  .  FF ',
            ]),
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 .  AA .  .  .  .  ',
                'F2 .  .  .  .  .  .  ',
                'F1 E  .  BB .  DD FF ',
            ])
        ]);
    });

    it('can move first item up', function() {
        expect(location.move(-1, [1])).to.deep.equal(
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA BB .  .  .  ',
                'F2 .  .  .  .  DD .  ',
                'F1 .  .  .  .  .  FF ',
            ])
        );
    });
    it('can move second item up', function() {
        expect(location.move(-1, [2])).to.deep.equal(
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA .  .  DD .  ',
                'F2 .  .  BB .  .  .  ',
                'F1 .  .  .  .  .  FF ',
            ])
        );
    });
    it('can move two items up', function() {
        expect(location.move(-1, [1, 2])).to.deep.equal(
            new Location([
                'F5 .  .  .  .  .  .  ',
                'F4 .  .  .  CC .  .  ',
                'F3 E  AA BB .  DD .  ',
                'F2 .  .  .  .  .  .  ',
                'F1 .  .  .  .  .  FF ',
            ])
        );
    });
    it('can move two items down', function() {
        location = new Location([
                'F4 .  .  .  .  .  .  .  .  ',
                'F3 .  .  .  CC .  .  .  .  ',
                'F2 E  AA .  .  .  EE .  FF ',
                'F1 .  .  BB .  DD .  .  .  '
        ]);
        expect(location.move(1, [1, 3])).to.deep.equal(
            new Location([
                'F4 .  .  .  .  .  .  .  .  ',
                'F3 .  .  .  CC .  .  .  .  ',
                'F2 .  .  .  .  .  EE .  .  ',
                'F1 E  AA BB .  DD .  .  FF '
            ])
        );
    });
    it('knows the number of items on elevator floor', function() {
        location = new Location([
                'F4 .  .  .  .  .  .  .  .  ',
                'F3 .  .  .  CC .  .  .  .  ',
                'F2 E  AA .  .  .  EE .  FF ',
                'F1 .  .  BB .  DD .  .  .  '
        ]);
        expect(location.itemCountInElevatorFloor()).to.equal(3);
    });
    it('does not invent neighbours above roof', function() {
        location = new Location([
                'F2 E  .  AA .  BB .  ',
                'F1 .  .  .  .  .  CC ',
        ]);
        expect(location.neighbours()).to.deep.equal([
            new Location([
                'F2 .  .  .  .  BB .  ',
                'F1 E  .  AA .  .  CC ',
            ]),
            new Location([
                'F2 .  .  AA .  .  .  ',
                'F1 E  .  .  .  BB CC ',
            ]),
            new Location([
                'F2 .  .  .  .  .  .  ',
                'F1 E  .  AA .  BB CC ',
            ]),
        ]);
    });
    it('does not invent neighbours under ground', function() {
        location = new Location([
                'F2 .  .  AA .  .  .  ',
                'F1 E  .  .  .  BB CC ',
        ]);
        expect(location.neighbours()).to.deep.equal([
            new Location([
                'F2 E  .  AA .  BB .  ',
                'F1 .  .  .  .  .  CC ',
            ]),
            new Location([
                'F2 E  .  AA .  .  CC ',
                'F1 .  .  .  .  BB .  ',
            ]),
            new Location([
                'F2 E  .  AA .  BB CC ',
                'F1 .  .  .  .  .  .  ',
            ]),
        ]);
    });
    describe('equals', function() {

        it('can detect that two locations are different', function() {
            var one = new Location([
                    'F2 .  .  AA .  .  .  ',
                    'F1 E  .  .  .  BB CC ',
            ]);
            var two = new Location([
                    'F2 .  .  AA .  .  CC ',
                    'F1 E  .  .  .  BB .  ',
            ]);

            expect(one.equals(two)).to.equal(false);
        });
        it('can detect that two locations are equal', function() {
            var one = new Location([
                    'F2 .  .  AA .  .  .  ',
                    'F1 E  .  .  .  BB CC ',
            ]);
            one.any =  42;
            var two = new Location([
                    'F2 .  .  AA .  .  .  ',
                    'F1 E  .  .  .  BB CC ',
            ]);

            expect(one.equals(two)).to.equal(true);
        });
    });
});
