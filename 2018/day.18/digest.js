const { Map } = require('./map')

var digest = (lines)=>{
	var map = []
	lines.forEach((line)=>{
		var row = []
		line.split('').forEach((acre)=>{
			if (acre == '.') { row.push(0) }
			if (acre == '#') { row.push(1) }
			if (acre == '|') { row.push(10) }
		})
		map.push(row)
	})
	return new Map({ acres:map })
}
module.exports = digest
