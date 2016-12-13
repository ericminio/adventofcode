var Renderer = function() {

};
Renderer.prototype.useMaze = function(maze) {
    this.maze = maze;
};

Renderer.prototype.render = function(path) {
    var picture = [];
    for(var y=0; y<=this.biggestYIn(path); y++) {
        picture[y] = '';
        for(var x=0; x<=this.biggestXIn(path); x++) {
            picture[y] += this.maze.isWall(x, y) ? '#' : '.';
        }
    }

    for (var i=0; i<path.length; i++) {
        var location = path[i];
        var line = picture[location.y];
        var updated = line.substring(0, location.x) + 'O' + line.substring(location.x+1);
        picture[location.y] = updated;
    }

    return picture;
};

Renderer.prototype.biggestXIn = function(path) {
    var max = 0;
    for (var i=0; i< path.length; i++) {
        var location = path[i];
        if (location.x > max) { max = location.x; }
    }
    return max;
};

Renderer.prototype.biggestYIn = function(path) {
    var max = 0;
    for (var i=0; i< path.length; i++) {
        var location = path[i];
        if (location.y > max) { max = location.y; }
    }
    return max;
};

module.exports = Renderer;
