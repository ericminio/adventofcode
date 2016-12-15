var expect = require('chai').expect;

describe('2016 day 15 challenge', function() {

    describe('exploration', function() {

        it('requires expirimentation', function() {
            var discs = [ disc(5, 4), disc(2, 1) ];
            var time = 1;
            while (!good(time, discs)) { time++; }

            expect(time).to.equal(5);
        });
    });

    it('includes part 1', function() {
        var discs = [ disc(5, 2), disc(13, 7), disc(17, 10), disc(3, 2), disc(19, 9), disc(7, 0)];
        var time = 1;
        while (!good(time, discs)) { time++; }

        expect(time).to.equal(148737);
    });

    it('includes part 2', function() {
        var discs = [ disc(5, 2), disc(13, 7), disc(17, 10), disc(3, 2), disc(19, 9), disc(7, 0)];
        var time = 1;
        while (!good(time, discs)) { time++; }
        discs.push(disc(11, 0));
        var time = 1;
        while (!good(time, discs)) { time++; }

        expect(time).to.equal(2353212);
    });
});

var disc = function(positions, start) {
    return function(time) { return (time + start) % positions == 0; }
};
var good = function(time, discs) {
    var fall = true;
    for (var tic=1; tic<=discs.length; tic++) {
        fall = fall && discs[tic-1](time+tic);
    }

    return fall;
};
