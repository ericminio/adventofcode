const SAND = 0
const CLAY = 1

var vertical = (line, column, map)=>{
	var start = 0
	var end = 0
	for (x=line+1; x<map.height(); x++) {
		var point = map.point(x, column)
		if (point == CLAY) {
			end = x
			if (start == 0) { start = x }
		}
		if (start > 0 && point == SAND) {
			end = x-1
			break
		}
	}
	var height = end - start + 1
	if (start == 0 && end == 0) { height = -1 }

	return height
}

var reservoirHeight = (line, column, map)=> {
	var height = vertical(line, column, map)
	if (height == 1) {
		var x = line
		while (map.point(x, column) != CLAY) {
			x ++
		}
		x --

		var left = column-1
		while (left >=0 && map.point(x, left) != CLAY) {
			left --
		}
		if (left == -1) { return -1 }
		var top = x
		while (top >=0 && map.point(top, left) != SAND) {
			top --
		}
		leftHeight = vertical(top, left, map)

		var right = column+1
		while (right < map.width() && map.point(x, right) != CLAY) {
			right ++
		}
		if (right == map.width()) { return -1 }
		var top = x
		while (top >=0 && map.point(top, right) != SAND) {
			top --
		}
		rightHeight = vertical(top, right, map)

		height = Math.max(leftHeight, rightHeight)
	}
	return height
}
module.exports = reservoirHeight
