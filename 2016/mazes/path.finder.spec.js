var expect = require('chai').expect;
var PathFinder = require('./path.finder.js');
var Renderer = require('./renderer');

describe('path finder', function() {

    it('can find target east', function() {
        var maze = {
            map: [
                '...',
                '...',
                '...'
            ],
            isWall: function(x, y) {
                if (x<0 || y<0) { return false; }
                return this.map[y][x] == '#';
            }
        };
        var pathFinder = new PathFinder();
        pathFinder.useMaze(maze);
        pathFinder.startAt(1, 1);
        var path = pathFinder.pathTo(2, 1);
        var renderer = new Renderer();
        renderer.useMaze(maze);

        expect(renderer.render(path)).to.deep.equal([
            '...',
            '.OO'
        ]);
    });
});
