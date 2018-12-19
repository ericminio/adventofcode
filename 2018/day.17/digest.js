const { Map } = require('./map')

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
	var map = []
	x = linesXrange(lines)
	var row = Array(x.max - x.min + 3).fill(0)
	row[500-x.min+1] = -1
	map.push(row)

	y = linesYrange(lines)
	for (var i=0; i<y.max; i++) {
		var row = Array(x.max - x.min + 3).fill(0)
		map.push(row)
	}

	return new Map({ points:map })
}
module.exports = digest
