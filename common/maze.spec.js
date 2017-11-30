var expect = require('chai').expect;

describe('maze', function() {

    var maze;
    let visited;

    beforeEach(function() {
        maze = new Maze();
        visited = []
        maze.positionsAreSimilar = function(p1, p2) { return p1.value == p2.value; };
        maze.visitListener = function(position) { visited.push(position); };
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
            if (this.positionsAreSimilar(position, {value:1})) {
                return [ {value:2} ];
            }
            if (this.positionsAreSimilar(position, {value:2})) {
                return [ {value:3} ];
            }
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
            if (this.positionsAreSimilar(position, {value:1})) {
                return [ {value:2}, {value:3} ];
            }
            if (this.positionsAreSimilar(position, {value:2})) {
                return [ {value:4}, {value:5} ];
            }
            if (this.positionsAreSimilar(position, {value:3})) {
                return [ {value:6}, {value:7} ];
            }
            if (this.positionsAreSimilar(position, {value:4})) {
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

var Maze = function() {
    this.parents = [];
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
        if (!wasAlreadyVisited) {
            this.parents.push({
                child: potentialMove,
                parent:position
            });
            newMoves.push(potentialMove);
        }
    }
    return newMoves;
};
Maze.prototype.findPath = function() {
    this.parents.push({
        child: this.position,
        parents: 'start'
    });
    return this.visit([this.position]);
};
Maze.prototype.visit = function(nodes) {
    for (var i=0; i<nodes.length; i++) {
        this.visitListener(nodes[i]);
        this.alreadyVisitedPositions.push(nodes[i]);
        if (this.positionsAreSimilar(nodes[i], this.target)) {
            return this.pathTo(nodes[i]);
        }
    }
    var children = [];
    for (var i=0; i<nodes.length; i++) {
        var nextMoves = this.possibleMoves(nodes[i]);
        children = children.concat(nextMoves);
    }
    if (children.length != 0) { return this.visit(children); }
    return [];
};
Maze.prototype.pathTo = function(position) {
    var path = [position];
    var parent = this.parentOf(position);
    while (parent != 'start' && parent !== undefined) {
        path.push(parent);
        var parent = this.parentOf(parent);
    }
    path.reverse();
    return path;
};
Maze.prototype.parentOf = function(position) {
    for (var i=0; i<this.parents.length; i++) {
        var entry = this.parents[i];
        if (this.positionsAreSimilar(entry.child, position)) {
            return entry.parent;
        }
    }
};
