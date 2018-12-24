var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = instruction[1]
		return registers
	},
	name: 'seti'
}

module.exports = opcode
