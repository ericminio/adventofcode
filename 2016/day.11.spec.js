var expect = require('chai').expect;

var PathFinder = require('./mazes/path.finder.js');
var RadioisotopeTestingFacility = require('./mazes/maze.radioisotope.testing.facility.js');
var Location = require('./mazes/location.in.radioisotope.testing.facility.js');

describe('2016 day 11 challenge', function() {

    it('is described by an example', function() {
        var start = new Location([
                'F4 .  .  .  .  .  ',
                'F3 .  .  .  LG .  ',
                'F2 .  HG .  .  .  ',
                'F1 E  .  HM .  LM '
        ]);
        var target = new Location([
                'F4 E  HG HM LG LM ',
                'F3 .  .  .  .  .  ',
                'F2 .  .  .  .  .  ',
                'F1 .  .  .  .  .  '
        ]);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(new RadioisotopeTestingFacility());
        pathFinder.startAt(start);
        var path = pathFinder.pathTo(target);

        expect(path.length-1).to.equal(11);
    });

    it.skip('contains part 1', function() {
        var start = new Location([
                'F4 .  .  .  .  .  .  .  .  .  .  .  ',
                'F3 .  .  .  .  .  .  .  HG HM RG RM ',
                'F2 .  .  .  .  .  PM SM .  .  .  .  ',
                'F1 E  TG TM PG SG .  .  .  .  .  .  '
        ]);
        var target = new Location([
                'F4 E  TG TM PG SG PM SM HG HM RG RM ',
                'F3 .  .  .  .  .  .  .  .  .  .  .  ',
                'F2 .  .  .  .  .  .  .  .  .  .  .  ',
                'F1 .  .  .  .  .  .  .  .  .  .  .  '
        ]);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(new RadioisotopeTestingFacility());
        pathFinder.startAt(start);
        pathFinder.setStepListener(function(step, tree, leafs) {
            console.log(step + ': ' + leafs.length + ' leafs');
            // 1: 2 leafs
            // 2: 10 leafs
            // 3: 43 leafs
            // 4: 60 leafs
            // 5: 408 leafs
            // 6: 380 leafs
            // 7: 1535 leafs
            // 8: 1512 leafs
            // 9: 4752 leafs
            // 10: 4838 leafs
            // 11: 11396 leafs
            // 12: 11649 leafs
            // 13: 17785 leafs
            // 14: 18886 leafs
            // 15: 18601 leafs
            // 16: 18569 leafs
            // 17: 12765 leafs
            // 18: 11708 leafs
            // 19: 6442 leafs
            // 20: 6210 leafs
            // 21: 3121 leafs
            // 22: 3027 leafs
            // 23: 1332 leafs
            // 24: 1244 leafs
            // 25: 515 leafs
            // 26: 591 leafs
            // 27: 270 leafs
            // 28: 294 leafs
            // 29: 111 leafs
            // 30: 95 leafs
            // 31: 35 leafs
        });
        var path = pathFinder.pathTo(target);

        expect(path.length-1).to.equal(31);
    });

});
