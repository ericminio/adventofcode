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
        it('declares wall when a floor becomes unsafe', function() {
            var location = new Location([
                    'F2 E  .  LG .  .  .  ',
                    'F1 .  LM .  .  HG HM ',
            ]);
            expect(maze.isWall(location)).to.equal(true);
        });
    });
    describe('isSafe', function() {
        it('when alone', function() {
            expect(maze.isSafe('F1 E  LM .  .  .  .  ')).to.equal(true);
        });
        it('when connected', function() {
            expect(maze.isSafe('F1 E  LM LG .  .  .  ')).to.equal(true);
        });
        it('when connected and with another RTG', function() {
            expect(maze.isSafe('F1 E  LM LG .  HG .  ')).to.equal(true);
        });
        it('when away from RTG', function() {
            expect(maze.isSafe('F1 E  LM HM .  .  .  ')).to.equal(true);
        });
    });
    describe('is not safe', function() {
        it('when with another RTG', function() {
            expect(maze.isSafe('F1 E  LM .  .  HG .  ')).to.equal(false);
        });
        it('when with another connected RTG', function() {
            expect(maze.isSafe('F1 E  LM .  .  HG HM ')).to.equal(false);
        });
    });
    describe('parsing', function() {

        it('can extract chips', function() {
            expect(maze.extractIn('F1 E  LM .  .  HG HM ', 'M')).to.deep.equal(['L', 'H']);
        });
        it('can extract generators', function() {
            expect(maze.extractIn('F1 E  LM .  .  HG HM ', 'G')).to.deep.equal(['H']);
        });
    });
});
