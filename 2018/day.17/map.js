const { SPRING, SAND, CLAY, FLOW, WATER } = require('./codes')

var Map = function(options) {
	this.points = options.points
	this.focus = options.focus || []
	this.highest = options.highest || 0
}
Map.prototype.point = function(x, y){
	if (this.points.length == 0) { return SAND }
	if (x < 0 || y < 0
		|| x > this.points.length-1
		|| y > this.points[0].length -1 ) {
		return SAND
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
Map.prototype.value = function() {
	var sum = 0
	for (var line=this.highestLine(); line<this.height(); line++) {
		for (var column=0; column < this.width(); column++) {
			var point = this.point(line, column)
			if (point > CLAY) {
				sum ++
			}
		}
	}
	return sum
}
Map.prototype.highestLine = function() {
	var value = -1
	for (var line=0; line<this.height() && value == -1; line++) {
		for (var column=0; column < this.width(); column++) {
			var point = this.point(line, column)
			if (point == CLAY) {
				value = line
				break
			}
		}
	}
	return value
}

module.exports = Map
