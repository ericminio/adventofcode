
var Maze = function() {
    this.parents = [];
    this.alreadyVisitedPositions = [];
    this.visitListener = function() {};
    this.levelListener = function() {};
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
    this.levelListener(nodes);
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

module.exports = Maze;
