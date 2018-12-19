const { Map } = require('./map')

var tick = (map)=>{
	var next = []
	for (var line=0; line<map.height(); line++) {
		var row = []
		for (var column=0; column<map.width(); column++) {
			var count = 0
			count += map.acre(line-1, column-1) + map.acre(line-1, column) + map.acre(line-1, column+1)
			count += map.acre(line, column-1)                              + map.acre(line, column+1)
			count += map.acre(line+1, column-1) + map.acre(line+1, column) + map.acre(line+1, column+1)

			before = map.acre(line, column)
			if (before == 0) {
				if (count/10 >= 3) { row.push(10) }
				else { row.push(before) }
			}
			if (before == 10) {
				if (count % 10 >= 3) { row.push(1) }
				else { row.push(before) }
			}
			if (before == 1) {
				if (count/10 >= 1 && count % 10 >= 1) { row.push(1) }
				else { row.push(0) }
			}
		}
		next.push(row)
	}

	return new Map({ acres:next })
}
module.exports = tick
