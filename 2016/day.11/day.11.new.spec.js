var expect = require('chai').expect;
var Maze = require('./maze');
var around = require('./radioisotope.around.position');
var positionsAreSimilar = require('./radioisotope.similar.positions');

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

describe.skip('day 11 challenge', function() {
    it.skip('is described by an example', function() {
        var maze = new Maze();
        maze.positionsAreSimilar = positionsAreSimilar;
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
                { floor:4, type:1 }, { floor:4, type:-1 }, { floor:4, type:2 }, { floor:4, type:-2 },
            ]
        };
        var path = maze.findPath();

        expect(path.length-1).to.equal(11);
    });
    it('contains part 1', function() {
        var maze = new Maze();
        var level = 0;
        maze.levelListener = function(nodes) {
            level ++;
            console.log('level ' + level + ': ' + nodes.length + ' nodes');
        };
        maze.positionsAreSimilar = positionsAreSimilar;
        maze.around = around;
        maze.position = {
            floorCount:4,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:-1 }, { floor:1, type:-2 }, { floor:1, type:-3 },
                { floor:2, type:2 }, { floor:2, type:3 },
                { floor:3, type:4 }, { floor:3, type:-4 }, { floor:3, type:5 }, { floor:3, type:-5 }
            ]
        };
        maze.target = {
            floorCount:4,
            elevator:4,
            items: [
                { floor:4, type:1 }, { floor:4, type:-1 }, { floor:4, type:2 }, { floor:4, type:-2 },
                { floor:4, type:3 }, { floor:4, type:-3 }, { floor:4, type:4 }, { floor:4, type:-4 },
                { floor:4, type:5 }, { floor:4, type:-5 }
            ]
        };
        var path = maze.findPath();

        expect(path.length-1).to.equal(11);
    });
});
