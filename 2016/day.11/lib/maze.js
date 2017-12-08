var hasher = require('node-object-hash')();
var equal = require('deep-equal');

var Monitor = function() {
    this.times = {};
};
Monitor.prototype.addCategory = function(name) {
    this.times[name] = { total:0, calls:0 };
};
Monitor.prototype.top = function(category) {
    this.times[category].start = Date.now();
};
Monitor.prototype.tick = function(category) {
    this.times[category].total += Date.now() - this.times[category].start;
    this.times[category].calls ++;
    this.times[category].start = Date.now();
};


var Maze = function() {
    this.monitor = new Monitor();
    this.monitor.addCategory('total');
    this.monitor.addCategory('calculate children');
    this.monitor.addCategory('eliminate already visited');
    this.monitor.addCategory('check with target');
    this.monitor.addCategory('hasher');
    this.monitor.addCategory('final path');
    this.parents = [];
    this.alreadyVisitedPositions = {};
    this.visitListener = function() {};
    this.levelListener = function() {};
};
Maze.prototype.possibleMoves = function(position) {
    this.monitor.top('calculate children');
    var potentialMoves = this.around(position);
    this.monitor.tick('calculate children');
    if (potentialMoves === undefined ) { return []; }

    var newMoves = [];
    this.monitor.top('eliminate already visited');
    for (var i=0; i<potentialMoves.length; i++) {
        var potentialMove = potentialMoves[i];
        var hash = hasher.hash(potentialMove);
        if (this.alreadyVisitedPositions[hash] == undefined) {
            this.parents.push({
                child: potentialMove,
                parent:position
            });
            newMoves.push(potentialMove);
        }
    }
    this.monitor.tick('eliminate already visited');
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
        this.monitor.top('hasher');
        this.alreadyVisitedPositions[hasher.hash(nodes[i])] = 1;
        this.monitor.tick('hasher');
        this.monitor.top('check with target');
        var areSimilar = equal(nodes[i], this.target);
        this.monitor.tick('check with target');
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
    this.monitor.top('final path');
    var path = [position];
    var parent = this.parentOf(position);
    while (parent != 'start' && parent !== undefined) {
        path.push(parent);
        var parent = this.parentOf(parent);
    }
    path.reverse();
    this.monitor.tick('final path');
    return path;
};
Maze.prototype.parentOf = function(position) {
    for (var i=0; i<this.parents.length; i++) {
        var entry = this.parents[i];
        var areSimilar = equal(entry.child, position);
        if (areSimilar) {
            return entry.parent;
        }
    }
};

module.exports = Maze;
