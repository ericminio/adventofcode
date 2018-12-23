const { SPRING, SAND, CLAY, FLOW, WATER } = require('./codes')
const Map = require('./map')

var fromDrawing = (lines)=> {
	var start = { line:1 }
	var points = []
	lines.forEach((line)=>{
		var row = []
		line.split('').forEach((point, index)=>{
			if (point == '.') { row.push(SAND) }
			if (point == '+') {
				row.push(SPRING)
				start.column = index
			}
			if (point == '#') { row.push(CLAY) }
		})
		points.push(row)
	})
	var map = new Map({ points:points, focus:[start] })
	for (var column=0; column < map.width(); column++) {
		var count = 0
		for (var line =0; line < map.height(); line++) {
			var point = map.point(line, column)
			if (point == SAND) {
				if (count > map.highest) {
					map.highest = count
				}
				count = 0
			}
			if (point == CLAY) {
				count ++
			}
		}
		if (count > map.highest) {
			map.highest = count
		}
	}
	return map
}
var visual = (map)=> {
	var display = []
	for (var line=0; line<map.height(); line++) {
		var row = ''
		for (var column=0; column<map.width(); column++) {
			value = map.point(line, column)
			if (value == SAND) { row += '.' }
			if (value == SPRING) { row += '+' }
			if (value == CLAY) { row += '#' }
			if (value == FLOW) { row += '|' }
			if (value == WATER) { row += '~' }
		}
		display.push(row)
	}
	return display
}

module.exports = {
	fromDrawing: fromDrawing,
	visual:visual
}
