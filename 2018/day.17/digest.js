const { Map } = require('./map')

var lineXrange = (line)=> {
	var xindex = line.indexOf('x=')
	var xpart = line.substring(xindex+2)
	var comma = xpart.indexOf(',')
	if (comma != -1) {
		var x = parseInt(xpart.substring(0, comma))
		return { min:x, max:x }
	}
	else {
		var dot = xpart.indexOf('..')
		return { min:parseInt(xpart.substring(0, dot)), max:parseInt(xpart.substring(dot+2)) }
	}
}

var linesXrange = (lines)=>{
	var minx = 10000
	var maxx = -1
	lines.forEach((line)=>{
		var range = lineXrange(line)
		if (range.min < minx) {
			minx = range.min
		}
		if (range.max > maxx) {
			maxx = range.max
		}
	})
	return { min:minx, max:maxx }
}

var digest = (lines)=>{
	var map = []
	x = linesXrange(lines)
	var row = Array(x.max - x.min + 3).fill(0)
	row[500-x.min+1] = -1
	map.push(row)

	return new Map({ points:map })
}
module.exports = digest
