var xy = require('./location');

var self;
var PathFinder = function() { self = this; };

PathFinder.prototype.useMaze = function(maze) {
    this.maze = maze;
};
PathFinder.prototype.startAt = function(location) {
    this.start = location;
};
PathFinder.prototype.pathTo = function(location) {
    this.target = location;

    var path = [];
    path.push(this.start);

    candidates = this.children(this.start);
    candidates.forEach(function(candidate) {
        if (self.targetReached(candidate) ) { path.push(candidate); }
    })

    return path;
};
PathFinder.prototype.children = function(location) {
    var candidates = [ north(location), east(location), south(location), west(location) ];
    var children = [];
    candidates.forEach(function(candidate) {
        if (!self.maze.isWall(candidate)) { children.push(candidate); }
    });

    return children;
};
PathFinder.prototype.targetReached = function(location) {
    return location.x == this.target.x && location.y == this.target.y;
};

module.exports = PathFinder;

var north = function(location) { return xy(location.x, location.y-1); }
var south = function(location) { return xy(location.x, location.y+1); }
var east = function(location) { return xy(location.x+1, location.y); }
var west = function(location) { return xy(location.x-1, location.y); }
