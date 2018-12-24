var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = instruction[1] > registers[instruction[2]] ? 1 : 0
		return registers
	},
	name: 'gtir'
}

module.exports = opcode
