var Monitor = function() {
    this.times = {};
};
Monitor.prototype.addCategory = function(name) {
    this.times[name] = { total:0 };
};
Monitor.prototype.top = function(category) {
    this.times[category].start = Date.now();
};
Monitor.prototype.tick = function(category) {
    this.times[category].total += Date.now() - this.times[category].start;
    this.times[category].start = Date.now();
};


var Maze = function() {
    this.monitor = new Monitor();
    this.monitor.addCategory('total');
    this.monitor.addCategory('around');
    this.monitor.addCategory('similar:parentOf');
    this.monitor.addCategory('similar:visit');
    this.monitor.addCategory('similar:possibleMoves');
    this.parents = [];
    this.alreadyVisitedPositions = [];
    this.visitListener = function() {};
    this.levelListener = function() {};
};
Maze.prototype.possibleMoves = function(position) {
    this.monitor.top('around');
    var potentialMoves = this.around(position);
    this.monitor.tick('around');
    if (potentialMoves === undefined ) { return []; }

    var newMoves = [];
    for (var i=0; i<potentialMoves.length; i++) {
        var potentialMove = potentialMoves[i];
        var wasAlreadyVisited = false;
        for (var j=0; j<this.alreadyVisitedPositions.length; j++) {
            var alreadyVisited = this.alreadyVisitedPositions[j];
            this.monitor.top('similar:possibleMoves');
            var areSimilar = this.positionsAreSimilar(potentialMove, alreadyVisited);
            this.monitor.tick('similar:possibleMoves');
            if (areSimilar) {
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
    this.monitor.top('total');
    this.parents.push({
        child: this.position,
        parents: 'start'
    });
    var path = this.visit([this.position]);
    this.monitor.tick('total');
    return path;
};
Maze.prototype.visit = function(nodes) {
    this.levelListener(nodes);
    for (var i=0; i<nodes.length; i++) {
        this.visitListener(nodes[i]);
        this.alreadyVisitedPositions.push(nodes[i]);
        this.monitor.top('similar:visit');
        var areSimilar = this.positionsAreSimilar(nodes[i], this.target);
        this.monitor.tick('similar:visit');
        if (areSimilar) {
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
        this.monitor.top('similar:parentOf');
        var areSimilar = this.positionsAreSimilar(entry.child, position);
        this.monitor.tick('similar:parentOf');
        if (areSimilar) {
            return entry.parent;
        }
    }
};

module.exports = Maze;
