const Map = require('./map')

var lineRange = (line, xOrY)=>{
	var index = line.indexOf(xOrY+'=')
	var part = line.substring(index+2)
	var comma = part.indexOf(',')
	if (comma != -1) {
		var value = parseInt(part.substring(0, comma))
		return { min:value, max:value }
	}
	else {
		var dot = part.indexOf('..')
		return { min:parseInt(part.substring(0, dot)), max:parseInt(part.substring(dot+2)) }
	}
}
var lineXrange = (line)=> {
	return lineRange(line, 'x')
}
var lineYrange = (line)=> {
	return lineRange(line, 'y')
}

var linesXrange = (lines)=>{
	var range = lines.reduce((range, line)=>{
		var linerange = lineXrange(line)
		if (linerange.min < range.min) {
			range.min = linerange.min
		}
		if (linerange.max > range.max) {
			range.max = linerange.max
		}
		return range
	}, { min:10000, max:-1 })

	return { min:range.min, max:range.max }
}
var linesYrange = (lines)=>{
	return {
		min:0,
		max:lines.reduce((max, line)=>{ var range = lineYrange(line)
							return range.max > max ? range.max : max
						}, -1)
	}
}

var digest = (lines)=>{
	var points = []
	minx = linesXrange(lines)
	var row = Array(minx.max - minx.min + 3).fill(0)
	row[500-minx.min+1] = -1
	points.push(row)
	var keep = { line:1, column:500-minx.min+1 }

	y = linesYrange(lines)
	for (var i=0; i<y.max; i++) {
		var row = Array(minx.max - minx.min + 3).fill(0)
		points.push(row)
	}
	var map = new Map({ points:points, focus:[keep] })
	lines.forEach((line)=>{
		var start = parseInt(/(.*)=(.*)\.\.(.*)/.exec(line)[2])
		var end = parseInt(/(.*)=(.*)\.\.(.*)/.exec(line)[3])
		if (line.indexOf('x') == 0) {
			var y = parseInt(/x=(.*),(.*)/.exec(line)[1]) - minx.min
			for (x=start; x<=end; x++) {
				map.set(x, y+1, 1)
			}
			if (end-start+1 > map.highest) {
				map.highest = end-start+1
			}
		}
		if (line.indexOf('y') == 0) {
			var x = parseInt(/y=(.*),(.*)/.exec(line)[1])
			for (y=start; y<=end; y++) {
				map.set(x, y-minx.min+1, 1)
			}
		}
	})

	return map
}
module.exports = digest
