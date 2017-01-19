var Maze = require('./maze.radioisotope.testing.facility');
var Location = require('./location.in.radioisotope.testing.facility');
var expect = require('chai').expect;

describe('Radioisotope maze', function() {

    var maze = new Maze();

    describe('isMaze', function() {
        it('declares wall when a LM meets a HG', function() {
            var location = new Location([
                    'F2 .  .  LG .  .  .  ',
                    'F1 E  LM .  .  HG HM ',
            ]);
            expect(maze.isWall(location)).to.equal(true);
        });
        it('declares !wall when a LM is secured by LG', function() {
            var location = new Location([
                    'F2 .  .  .  .  .  .  ',
                    'F1 E  LM LG .  HG HM ',
            ]);
            expect(maze.isWall(location)).to.equal(false);
        });
    });
    describe('isSafe', function() {
        it('knows when a floor is safe', function() {
            expect(maze.isSafe('F1 E  LM LG .  HG HM ')).to.equal(true);
        });
        it('knows when a floor is not safe', function() {
            expect(maze.isSafe('F1 E  LM .  .  HG HM ')).to.equal(false);
        });
    });
});
