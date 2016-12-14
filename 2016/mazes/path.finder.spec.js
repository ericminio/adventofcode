var expect = require('chai').expect;
var PathFinder = require('./path.finder.js');
var Renderer = require('./renderer');
var xy = require('./location');

describe('PathFinder', function() {

    var pathFinder;
    var renderer;

    beforeEach(function() {
        var maze = {
            map: [
                '.#.',
                '...',
                '...'
            ],
            isWall: function(location) {
                if (location.x<0 || location.y<0) { return false; }
                return this.map[location.y][location.x] == '#';
            }
        };

        pathFinder = new PathFinder();
        renderer = new Renderer();
        pathFinder.useMaze(maze);
        renderer.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
    });

    it('konws the children of a given location in the maze', function() {
        expect(pathFinder.children(xy(1, 1))).to.deep.equal([
            xy(2, 1), xy(1, 2), xy(0, 1)
        ]);
    });

    it('can find target east', function() {
        var path = pathFinder.pathTo(xy(2, 1));

        expect(renderer.render(path)).to.deep.equal([
            '.#.',
            '.OO'
        ]);
    });

    it('can find target south', function() {
        var path = pathFinder.pathTo(xy(1, 2));

        expect(renderer.render(path)).to.deep.equal([
            '.#',
            '.O',
            '.O'
        ]);
    });
});
