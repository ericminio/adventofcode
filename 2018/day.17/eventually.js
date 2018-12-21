const Map = require('./map')
const tick = require('./tick')
var deepEqual = require('deep-equal')
const { visual } = require('./from.drawing')

var eventually = (map)=>{
	do {
		changes = tick(map)
	} while (changes.length > 0)

	return map
}
module.exports = eventually
