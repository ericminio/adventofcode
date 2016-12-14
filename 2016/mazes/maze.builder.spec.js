var expect = require('chai').expect;
var xy = require('./location');
var buildMaze = require('./maze.builder');

describe('MazeBuilder for favorite number 10', function() {

    var maze;

    beforeEach(function() {
        maze = buildMaze(10);
    });

    it('leaves 1,1 open', function() {
        expect(maze.isWall(xy(1, 1))).to.equal(false);
    });
    it('has wall on 1, 0', function() {
        expect(maze.isWall(xy(1, 0))).to.equal(true);
    });
    it('can count 1s', function() {
        expect(buildMaze.count1('11')).to.equal(2);
        expect(buildMaze.count1('1011')).to.equal(3);
    });
    it('builds the expected maze', function() {
        var Renderer = require('./renderer');
        var renderer = new Renderer();
        renderer.useMaze(maze);
        renderer.biggestXIn = function() { return 9; };
        renderer.biggestYIn = function() { return 6; };
        var picture = renderer.render([]);

        expect(picture).to.deep.equal([
            '.#.####.##',
            '..#..#...#',
            '#....##...',
            '###.#.###.',
            '.##..#..#.',
            '..##....#.',
            '#...##.###'
        ]);
    });
})
