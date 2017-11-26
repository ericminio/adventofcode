var expect = require('chai').expect;

describe('maze', function() {

    var maze;

    beforeEach(function() {
        maze = new Maze();
        maze.positionsAreSimilar = function(p1, p2) { return p1.value == p2.value; };
    });
    it('dont consider an already visited position', function() {
        maze.alreadyVisitedPositions = [ {value:1}, {value:2} ];
        maze.around = function(position) {
            return [ {value:2}, {value:3} ];
        };

        expect(maze.possibleMoves()).to.deep.equal([ {value:3} ]);
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
            if (this.positionsAreSimilar(position, {value:2})) {
                return [ {value:3} ];
            }
            return [ {value:2} ];
        };

        expect(maze.findPath()).to.deep.equal([ {value:1}, {value:2}, {value:3} ]);
    });
    it('ignores previously visited positions', function() {
        maze.position = { value:1 };
        maze.target = { value:4 };
        maze.around = function(position) {
            if (this.positionsAreSimilar(position, {value:1})) {
                return [ {value:2} ];
            }
            if (this.positionsAreSimilar(position, {value:2})) {
                return [ {value:3} ];
            }
            if (this.positionsAreSimilar(position, {value:3})) {
                return [ {value:2}, {value:4} ];
            }
        };
        let visitCount = 0;
        maze.visitListener = function() {
            visitCount ++;
        };
        maze.findPath();

        expect(visitCount).to.deep.equal(3);
    });
    it('returns empty when not found', function() {
        maze.position = { value:1 };
        maze.target = { value:3 };
        maze.around = function(position) {
            return [ {value:2} ];
        };

        expect(maze.findPath()).to.deep.equal([ ]);
    });
});

var Maze = function() {
    this.alreadyVisitedPositions = [];
    this.visitListener = function() {};
};
Maze.prototype.possibleMoves = function(position) {
    var potentialMoves = this.around(position);
    if (potentialMoves === undefined ) { return []; }

    var newMoves = [];
    for (var i=0; i<potentialMoves.length; i++) {
        var potentialMove = potentialMoves[i];
        var wasAlreadyVisited = false;
        for (var j=0; j<this.alreadyVisitedPositions.length; j++) {
            var alreadyVisited = this.alreadyVisitedPositions[j];
            if (this.positionsAreSimilar(potentialMove, alreadyVisited)) {
                wasAlreadyVisited = true;
                break;
            }
        }
        if (!wasAlreadyVisited) { newMoves.push(potentialMove); }
    }
    return newMoves;
};
Maze.prototype.findPath = function() {
    return this.visit(this.position, []);
};
Maze.prototype.visit = function(position, path) {
    this.visitListener(position);
    path.push(position);
    this.alreadyVisitedPositions.push(position);
    if (this.positionsAreSimilar(position, this.target)) {
        return path;
    }
    var nextMoves = this.possibleMoves(position);
    for(var i=0; i<nextMoves.length; i++) {
        var move = nextMoves[i];
        if (this.positionsAreSimilar(move, this.target)) {
            path.push(move);
            return path;
        }
    }
    for(var i=0; i<nextMoves.length; i++) {
        var move = nextMoves[i];
        return this.visit(move, path);
    }
    return [];
};
