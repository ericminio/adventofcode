var Maze = function() {

};

Maze.prototype.isWall = function(location) {
    var floor = location.floors[location.elevatorFloor];
    return !this.isSafe(floor);
};
Maze.prototype.isSafe = function(floor) {
    return true;
};
module.exports = Maze;
