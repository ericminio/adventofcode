var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = registers[instruction[1]] > instruction[2] ? 1 : 0
		return registers
	},
	name: 'gtri'
}

module.exports = opcode
