var Map = function(options) {
	this.points = options.points
}
Map.prototype.point = function(x, y){
	if (this.points.length == 0) { return 0 }
	if (x < 0 || y < 0
		|| x > this.points.length-1
		|| y > this.points[0].length -1 ) {
		return 0
	}
	return this.points[x][y]
}
Map.prototype.width = function() {
	return this.points[0].length
}
Map.prototype.height = function() {
	return this.points.length
}
Map.prototype.set = function(x, y, value) {
	this.points[x][y] = value
}

module.exports = {
	Map:Map
}
