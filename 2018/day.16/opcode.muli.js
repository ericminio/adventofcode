var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = registers[instruction[1]] * instruction[2]
		return registers
	},
	name: 'muli'
}

module.exports = opcode
