var Map = function(options) {
	this.acres = options.acres
}
Map.prototype.acre = function(x, y){
	if (this.acres.length == 0) { return 0 }
	if (x < 0 || y < 0
		|| x > this.acres.length-1
		|| y > this.acres[0].length -1 ) {
		return 0
	}
	return this.acres[x][y]
}
Map.prototype.width = function() {
	return this.acres[0].length
}
Map.prototype.height = function() {
	return this.acres.length
}
Map.prototype.value = function() {
	var trees = 0
	var lumberyards = 0
	this.acres.forEach((lines)=>{
		lines.forEach((acre)=>{
			if (acre == 10) { trees++ }
			if (acre == 1) { lumberyards++ }
		})
	})
	return trees * lumberyards
}

module.exports = {
	Map:Map
}
