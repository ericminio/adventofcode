var expect = require('chai').expect;
var Maze = require('./lib/maze');
var around = require('./lib/radioisotope.around.position');

describe('weapons', function() {

    it('contains Maze', function() {
        expect(Maze).not.to.equal(undefined);
    });
    it('contains around', function() {
        expect(Maze).not.to.equal(undefined);
    });
    it('contains similar positions', function() {
        expect(positionsAreSimilar).not.to.equal(undefined);
    });
});

describe.only('day 11 challenge', function() {
    it('exploration', function() {
        var maze = new Maze();
        maze.around = around;
        var position = {
            floorCount:4,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:2 },
                { floor:2, type:-1 },
                { floor:3, type:-2 },
            ]
        };
        var children = maze.around(position);
        expect(children.length).to.equal(1);
        var next = maze.possibleMoves(position);
        expect(next.length).to.equal(1);
    });
    it('is described by an example', function() {
        var maze = new Maze();
        var level = 0;
        // maze.levelListener = function(nodes) {
        //     level ++;
        //     console.log('level ' + level + ': ' + nodes.length + ' nodes');
        //     console.log('node 1' + JSON.stringify(nodes[0], null, 2));
        //     console.log('node 2' + JSON.stringify(nodes[1], null, 2));
        //     console.log('node 3' + JSON.stringify(nodes[2], null, 2));
        //     console.log('times');
        //     console.log(JSON.stringify(maze.monitor.times, null, 2));
        // };
        maze.around = around;
        maze.position = {
            floorCount:4,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:2 },
                { floor:2, type:-1 },
                { floor:3, type:-2 },
            ]
        };
        maze.target = {
            floorCount:4,
            elevator:4,
            items: [
                { floor:4, type:-2 }, { floor:4, type:-1 }, { floor:4, type:1 }, { floor:4, type:2 }
            ]
        };
        var path = maze.findPath();

        //console.log(JSON.stringify(maze.monitor.times, null, 2));
        expect(path.length-1).to.equal(11);
    });
    it('contains part 1', function() {
        var maze = new Maze();
        var level = 0;
        maze.levelListener = function(nodes) {
        //     level ++;
        //     console.log('level ' + level + ': ' + nodes.length + ' nodes');
        //     console.log(JSON.stringify(maze.monitor.times, null, 2));
        };
        maze.notifyFound = function(node) {
            // console.log('Target found, computing path');
        };
        maze.around = around;
        maze.position = {
            floorCount:4,
            elevator:1,
            items: [
                { floor:1, type:-3 }, { floor:1, type:-2 },{ floor:1, type:-1 }, { floor:1, type:1 },
                { floor:2, type:2 }, { floor:2, type:3 },
                { floor:3, type:-5 }, { floor:3, type:-4 }, { floor:3, type:4 }, { floor:3, type:5 }
            ]
        };
        maze.target = {
            floorCount:4,
            elevator:4,
            items: [
                { floor:4, type:-5 }, { floor:4, type:-4 }, { floor:4, type:-3 }, { floor:4, type:-2 },
                { floor:4, type:-1 }, { floor:4, type:1 }, { floor:4, type:2 },
                { floor:4, type:3 }, { floor:4, type:4 },
                { floor:4, type:5 }
            ]
        };
        var path = maze.findPath();
        // console.log(JSON.stringify(maze.monitor.times, null, 2));

        expect(path.length-1).to.equal(31);
    });
    it('contains part 2', function() {
        var maze = new Maze();
        var level = 0;
        maze.levelListener = function(nodes) {
            level ++;
            console.log('level ' + level + ': ' + nodes.length + ' nodes');
            // console.log(JSON.stringify(nodes[0], null, 2))
            // console.log(JSON.stringify(maze.monitor.times, null, 2));
        };
        maze.notifyFound = function(node) {
            console.log('Target found, computing path');
        };
        maze.around = around;
        maze.position = {
            floorCount:4,
            elevator:1,
            items: [
                { floor:1, type:-7 }, { floor:1, type:-6 }, { floor:1, type:-3 }, { floor:1, type:-2 },
                { floor:1, type:-1 }, { floor:1, type:1 }, { floor:1, type:6 }, { floor:1, type:7 },

                { floor:2, type:2 }, { floor:2, type:3 },
                { floor:3, type:-5 }, { floor:3, type:-4 }, { floor:3, type:4 }, { floor:3, type:5 }
            ]
        };
        maze.target = {
            floorCount:4,
            elevator:4,
            items: [
                { floor:4, type:-7 }, { floor:4, type:-6 },
                { floor:4, type:-5 }, { floor:4, type:-4 }, { floor:4, type:-3 }, { floor:4, type:-2 },
                { floor:4, type:-1 }, { floor:4, type:1 }, { floor:4, type:2 },
                { floor:4, type:3 }, { floor:4, type:4 },
                { floor:4, type:5 }, { floor:4, type:6 }, { floor:4, type:7 }
            ]
        };
        var path = maze.findPath();
        // console.log(JSON.stringify(maze.monitor.times, null, 2));

        expect(path.length-1).to.equal(31);
    });
});
