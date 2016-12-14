var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var buildMaze = require('./mazes/maze.builder');
var PathFinder = require('./mazes/path.finder.js');
var xy = require('./mazes/location');

describe('2016 day 13 challenge', function() {

    it('is described by an example', function() {
        var maze = buildMaze(10);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        var path = pathFinder.pathTo(xy(7, 4));

        expect(path.length-1).to.equal(11);
    });

    it('includes part 1', function() {
        var maze = buildMaze(1350);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        var path = pathFinder.pathTo(xy(31, 39));

        expect(path.length-1).to.equal(92);
    });

});
