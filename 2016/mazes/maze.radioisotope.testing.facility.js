var Maze = function() {};

Maze.prototype.isWall = function(location) {
    return !this.isSafe(location.floors[location.elevatorFloor]);
};
Maze.prototype.isSafe = function(floor) {
    var generators = this.extractIn(floor, 'G');
    if (generators.length == 0) { return true; }
    var chips = this.extractIn(floor, 'M');
    for (var c=0; c<chips.length; c++) {
        if (generators.indexOf(chips[c]) == -1) return false;
    }
    return true;
};
Maze.prototype.extractIn = function(floor, token) {
    var chips = [];
    for (var cursor = 0; cursor<floor.length; cursor++) {
        floor[cursor] == token ? chips.push(floor[cursor-1]) : null ;
    }
    return chips;
};
module.exports = Maze;
