const Map = require('./map')

var fromDrawing = (lines)=> {
	var start = { line:1 }
	var points = []
	lines.forEach((line)=>{
		var row = []
		line.split('').forEach((point, index)=>{
			if (point == '.') { row.push(0) }
			if (point == '+') {
				row.push(-1)
				start.column = index
			}
			if (point == '#') { row.push(1) }
		})
		points.push(row)
	})
	var map = new Map({ points:points, focus:[start] })
	for (var column=0; column < map.width(); column++) {
		var count = 0
		for (var line =0; line < map.height(); line++) {
			var point = map.point(line, column)
			if (point == 0) {
				if (count > map.highest) {
					map.highest = count
				}
				count = 0
			}
			if (point == 1) {
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
			if (value == 0) { row += '.' }
			if (value == -1) { row += '+' }
			if (value == 1) { row += '#' }
			if (value == 2) { row += '|' }
			if (value == 3) { row += '~' }
		}
		display.push(row)
	}
	return display
}

module.exports = {
	fromDrawing: fromDrawing,
	visual:visual
}
