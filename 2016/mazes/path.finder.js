var xy = require('./location');

var self;
var PathFinder = function() { self = this; };

PathFinder.prototype.useMaze = function(maze) {
    this.maze = maze;
};
PathFinder.prototype.startAt = function(location) {
    this.start = location;
};
PathFinder.prototype.setStepListener = function(listener) {
    this.listener = listener;
};
PathFinder.prototype.pathTo = function(location) {
    this.target = location;
    var tree = leafs = [this.start];
    var found = undefined;
    var step = 0;
    while (!found) {
        leafs = this.nextGeneration(leafs, tree);
        tree = tree.concat(leafs);
        found = this.isTargetReached(leafs);
        if (this.listener) {
            step ++;
            this.listener(step, tree);
        }
    }
    this.leafs = leafs;
    return this.buildPath(found);
};
PathFinder.prototype.buildPath = function(target) {
    var path = [];
    var current = target;
    while (current != undefined) {
        path.push(current);
        current = current.parent;
    }
    return path;
};
PathFinder.prototype.children = function(location, alreadyIdentified) {
    var candidates = [ north(location), east(location), south(location), west(location) ];
    var children = [];
    candidates.forEach(function(candidate) {
        if (!self.maze.isWall(candidate)) {
            children.push(candidate);
            candidate.parent = location;
        }
    });

    return this.exclude(alreadyIdentified, children);
};
PathFinder.prototype.nextGeneration = function(leafs, tree) {
    var next = [];
    for (var i=0; i<leafs.length; i++) {
        var children = this.children(leafs[i], next);
        next = next.concat(this.exclude(tree, children));
    }
    return next;
};
PathFinder.prototype.exclude = function(tree, children) {
    var keep = [];
    for (var i=0; i<children.length; i++) {
        var child = children[i];
        var visited = false;
        for (var j=0; j<tree.length; j++) {
            var node = tree[j];
            if (node.x == child.x && node.y == child.y) { visited = true; break; }
        }
        if (!visited) { keep.push(child); }
    }
    return keep;
};
PathFinder.prototype.targetReached = function(location) {
    return location.x == this.target.x && location.y == this.target.y;
};
PathFinder.prototype.isTargetReached = function(leafs) {
    for (var i=0; i<leafs.length ; i++) {
        var leaf = leafs[i];
        if (this.targetReached(leaf) ) {
            return leaf;
        }
    };
};

module.exports = PathFinder;

var north = function(location) { return xy(location.x, location.y-1); }
var south = function(location) { return xy(location.x, location.y+1); }
var east = function(location) { return xy(location.x+1, location.y); }
var west = function(location) { return xy(location.x-1, location.y); }
