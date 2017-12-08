var expect = require('chai').expect;
var equal = require('deep-equal');
var Maze = require('./maze');

describe('maze', function() {

    var maze;
    let visited;

    beforeEach(function() {
        maze = new Maze();
        visited = []
        maze.visitListener = function(position) { visited.push(position); };
    });
    it('can find a just-around away target', function() {
        maze.target = { value:2 };
        maze.position = { value:1 };
        maze.around = function(position) { return [ {value:2} ]; };

        expect(maze.findPath()).to.deep.equal([ {value:1}, {value:2} ]);
    });
    it('can find a 2-steps away target', function() {
        maze.position = { value:1 };
        maze.target = { value:3 };
        maze.around = function(position) {
            if (equal(position, {value:1})) {
                return [ {value:2} ];
            }
            if (equal(position, {value:2})) {
                return [ {value:3} ];
            }
        };

        expect(maze.findPath()).to.deep.equal([ {value:1}, {value:2}, {value:3} ]);
    });
    it('ignores previously visited positions', function() {
        maze.position = { value:1 };
        maze.target = { value:4 };
        maze.around = function(position) {
            if (equal(position, {value:1})) {
                return [ {value:2} ];
            }
            if (equal(position, {value:2})) {
                return [ {value:3} ];
            }
            if (equal(position, {value:3})) {
                return [ {value:2}, {value:4} ];
            }
        };
        let visitCount = 0;
        maze.visitListener = function() {
            visitCount ++;
        };
        maze.findPath();

        expect(visitCount).to.deep.equal(4);
    });
    it('returns empty when not found', function() {
        maze.position = { value:1 };
        maze.target = { value:3 };
        maze.around = function(position) {
            return [ {value:2} ];
        };

        expect(maze.findPath()).to.deep.equal([ ]);
    });
    it('visits breadth-first', function() {
        //  1
        //      2
        //          4
        //              8
        //          5
        //      3
        //          6
        //          7
        maze.position = { value:1 };
        maze.target = { value:8 };
        maze.around = function(position) {
            if (equal(position, {value:1})) {
                return [ {value:2}, {value:3} ];
            }
            if (equal(position, {value:2})) {
                return [ {value:4}, {value:5} ];
            }
            if (equal(position, {value:3})) {
                return [ {value:6}, {value:7} ];
            }
            if (equal(position, {value:4})) {
                return [ {value:8} ];
            }
        };
        var path = maze.findPath();

        expect(visited).to.deep.equal([
            {value:1}, {value:2}, {value:3}, {value:4},
            {value:5}, {value:6}, {value:7}, {value:8}
        ]);
        expect(path).to.deep.equal([
            {value:1}, {value:2}, {value:4}, {value:8}
        ]);
    });
});
