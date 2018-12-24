var candidates = [
	require('./opcode.addr'),
	require('./opcode.addi'),
	require('./opcode.mulr'),
	require('./opcode.muli'),
	require('./opcode.setr'),
	require('./opcode.seti'),

	require('./opcode.banr'),
	require('./opcode.bani'),

	require('./opcode.borr'),
	require('./opcode.bori'),

	require('./opcode.gtir'),
	require('./opcode.gtri'),
	require('./opcode.gtrr'),

	require('./opcode.eqir'),
	require('./opcode.eqri'),
	require('./opcode.eqrr'),
]
const deepEqual = require('deep-equal')

var matching = (sample) => {
	var opcodes = []
	candidates.forEach((opcode)=>{
		var before = sample.before.slice()
		var after = opcode.exec(sample.instruction, before)
		if (deepEqual(after, sample.after)) {
			opcodes.push(opcode)
		}
	})

	return opcodes
}

module.exports = matching
