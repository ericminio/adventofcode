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
                if (location.x<0 || location.y<0) { return true; }
                if (location.x>2 || location.y>2) { return true; }
                return this.map[location.y][location.x] == '#';
            }
        };

        pathFinder = new PathFinder();
        renderer = new Renderer();
        pathFinder.useMaze(maze);
        renderer.useMaze(maze);
        pathFinder.startAt(xy(1, 1));
    });

    it('knows the children of a given location in the maze', function() {
        var location = xy(1, 1);
        var east = xy(2, 1), south = xy(1, 2), west = xy(0, 1);
        var children = pathFinder.children(location, []);

        expect(children.length).to.equal(3);
        expect(children[0].x).to.equal(east.x);
        expect(children[0].y).to.equal(east.y);
        expect(children[1].x).to.equal(south.x);
        expect(children[1].y).to.equal(south.y);
        expect(children[2].x).to.equal(west.x);
        expect(children[2].y).to.equal(west.y);
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

    it('can find target south-east', function() {
        var path = pathFinder.pathTo(xy(2, 2));

        expect(renderer.render(path)).to.deep.equal([
            '.#.',
            '.OO',
            '..O'
        ]);
    });

    it('can find an hidden target', function() {
        pathFinder.startAt(xy(0, 0));
        var path = pathFinder.pathTo(xy(2, 0));

        expect(renderer.render(path)).to.deep.equal([
            'O#O',
            'OOO'
        ]);
    });

    describe('Next generation', function() {

        it('does not walk back', function() {
            pathFinder.startAt(xy(1, 1));
            var path = pathFinder.pathTo(xy(2, 2));

            var startFound = false;
            var leafs = pathFinder.leafs;
            for (var i=0; i<leafs.length; i++) {
                var leaf = leafs[i];
                if (leaf.x == 1 && leaf.y == 1) { startFound = true; }
            }
            expect(startFound).to.equal(false);
        });

        it('does not visit a leaf twice', function() {
            pathFinder.startAt(xy(1, 1));
            var path = pathFinder.pathTo(xy(2, 2));

            expect(pathFinder.leafs.length).to.equal(4);
        });
    });

});
