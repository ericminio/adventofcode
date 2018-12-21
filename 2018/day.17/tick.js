const Map = require('./map')
const SPRING  = -1
const SAND = 0
const CLAY = 1
const FLOW = 2
const WATER = 3

var reservoirHeight = require('./reservoir.height')

var merge = (array, point, map)=> {
	if (map.point(point.line, point.column) == CLAY) { return }
	if (map.point(point.line, point.column) == WATER) { return }
	if (point.line >= map.height()) { return }

	var exists = false
	for (var i=0; i<array.length; i++) {
		var candidate = array[i]
		if (candidate.line == point.line && candidate.column == point.column) {
			exists = true
		}
	}
	if (! exists ) {
		array.push(point)
	}
}
var remove = (array, point, map)=> {
	var index = -1
	for (var i=0; i<array.length; i++) {
		var candidate = array[i]
		if (candidate.line == point.line && candidate.column == point.column) {
			index = i
		}
	}
	if ( index > -1 ) {
		array.splice(index, 1)
	}
}

var transform = (line, column, map)=>{
	var before = map.point(line, column)
	var after = before
	if (map.point(line-1, column) == SPRING) { after = FLOW }
	if (before == SAND
		&& map.point(line-1, column) == FLOW ) { after = FLOW }
	if (before == SAND
		&& map.point(line, column+1) == FLOW
		&& (map.point(line+1, column+1) == CLAY || map.point(line+1, column+1) == WATER) ) { after = FLOW }
	if (before == SAND
		&& map.point(line, column-1) == FLOW
		&& (map.point(line+1, column-1) == CLAY || map.point(line+1, column-1) == WATER) ) { after = FLOW }
	if (before == FLOW && (map.point(line+1, column) == CLAY || map.point(line+1, column) == WATER)) {
		var clearLeft = true
		var left = column - 1
		while (left > -1 && map.point(line, left) != CLAY) {
			if (map.point(line, left) == SAND) { clearLeft = false }
			left --
		}
		if (left == -1) { clearLeft = false }
		var clearRight = true
		var right = column + 1
		while (right < map.width() && map.point(line, right) != CLAY) {
			if (map.point(line, right) == SAND) { clearRight = false }
			right ++
		}
		if (right == map.width()) { clearRight = false }
		if (clearLeft && clearRight) { after = WATER }
	}
	return { before:before, after:after }
}

var tick = (map)=>{
	var changes = []
	var focus = map.focus.slice()
	map.focus.forEach((point)=>{
		var line = point.line
		var column = point.column
		var { before, after } = transform(line, column, map)
		if (after != before) {
			changes.push({ line:line, column:column, value:after })
		}
		if (after == FLOW) {
			if (before == SAND) {
				merge(focus, { line:line, column:column }, map)
				merge(focus, { line:line, column:column-1 }, map)
				merge(focus, { line:line, column:column+1 }, map)
				merge(focus, { line:line+1, column:column }, map)
			}
		}
		if (after == WATER) {
			remove(focus, { line:line, column:column }, map)
			remove(focus, { line:line+1, column:column }, map)
		}
	})
	changes.forEach((change)=>{
		map.set(change.line, change.column, change.value)
	})
	map.focus = focus

	return changes
}
module.exports = tick
