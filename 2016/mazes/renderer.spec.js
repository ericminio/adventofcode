var expect = require('chai').expect;
var Renderer = require('./renderer');

describe('Renderer', function() {

    var renderer = new Renderer();
    renderer.useMaze({
        isWall: function() { return false; }
    });

    it('can render a path heading east', function() {
        expect(renderer.render([
            { x:1, y:1 }, { x:2, y:1 }
        ])).to.deep.equal([
            '...',
            '.OO'
        ]);
    });
    it('can render a path heading south', function() {
        expect(renderer.render([
            { x:1, y:1 }, { x:1, y:2 }
        ])).to.deep.equal([
            '..',
            '.O',
            '.O'
        ]);
    });
    it('can render a curved path', function() {
        expect(renderer.render([
            { x:1, y:0 }, { x:1, y:1 }, { x:1, y:2 },
            { x:2, y:2 }, { x:3, y:2 }, { x:4, y:2 },
            { x:4, y:1 }
        ])).to.deep.equal([
            '.O...',
            '.O..O',
            '.OOOO'
        ]);
    });
    it('can render walls', function() {
        renderer.useMaze({
            isWall: function() { return true; }
        });
        expect(renderer.render([
            { x:1, y:0 }, { x:1, y:1 }, { x:1, y:2 },
            { x:2, y:2 }, { x:3, y:2 }, { x:4, y:2 },
            { x:4, y:1 }
        ])).to.deep.equal([
            '#O###',
            '#O##O',
            '#OOOO'
        ]);
    });
});
