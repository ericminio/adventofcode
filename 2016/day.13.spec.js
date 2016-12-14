var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

var buildMaze = require('./mazes/maze.builder');
var PathFinder = require('./mazes/path.finder.js');
var xy = require('./mazes/location');
var Renderer = require('./mazes/renderer');

describe('2016 day 13 challenge', function() {

    it('is described by an example', function() {
        var maze = buildMaze(10);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        var path = pathFinder.pathTo(xy(7, 4));

        expect(path.length-1).to.equal(11);
    });

    it('uses my maze', function() {
        var maze = buildMaze(1350);
        var renderer = new Renderer();
        renderer.useMaze(maze);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        var path = pathFinder.pathTo(xy(31, 39));

        console.log(renderer.render(path));

        expect(maze.isWall(xy(-1, 1))).to.equal(true);
    });

    it('includes part 1', function() {
        var maze = buildMaze(1350);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        var path = pathFinder.pathTo(xy(31, 39));

        expect(path.length-1).to.equal(92);
    });

    it('includes part 2', function() {
        var maze = buildMaze(1350);
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
        pathFinder.setStepListener(function(step, tree) {
            if (step == 50) {
                expect(tree.length).to.equal(124);
            }
        });

        pathFinder.pathTo(xy(31, 39));
    });

});
