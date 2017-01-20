var Maze = function() {};

Maze.prototype.isWall = function(location) {
    var safe = true;
    for (var floor=0 ; floor<location.floors.length; floor++) {
        var floorIsSafe = this.isSafe(location.floors[floor]);
        safe = safe && floorIsSafe;
    }
    return !safe;
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
