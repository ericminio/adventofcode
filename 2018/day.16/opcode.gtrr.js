var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = registers[instruction[1]] > registers[instruction[2]] ? 1 : 0
		return registers
	},
	name: 'gtrr'
}

module.exports = opcode
