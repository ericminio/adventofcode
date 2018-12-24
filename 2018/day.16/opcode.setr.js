var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = registers[instruction[1]]
		return registers
	},
	name: 'setr'
}

module.exports = opcode
