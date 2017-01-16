var Location = function(x, y) {
    return {
        x:x,
        y:y,
        neighbours: function() {
            return [ north(this), east(this), south(this), west(this) ];
        },
        equals: function(o) {
            return this.x == o.x && this.y == o.y
        }
    };
};

var north = function(location) { return new Location(location.x, location.y-1); }
var south = function(location) { return new Location(location.x, location.y+1); }
var east = function(location) { return new Location(location.x+1, location.y); }
var west = function(location) { return new Location(location.x-1, location.y); }

module.exports = Location;
