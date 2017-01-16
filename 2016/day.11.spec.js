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
                'F4 E  HG HM LG LM',
                'F3 .  .  .  .  . ',
                'F2 .  .  .  .  . ',
                'F1 .  .  .  .  . '
        ]);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(new RadioisotopeTestingFacility());
        pathFinder.startAt(start);
        var path = pathFinder.pathTo(target);

        expect(path.length-1).to.equal(11);
    });

});
