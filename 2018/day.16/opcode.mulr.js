var opcode = {
	exec: function(instruction, registers) {
		registers[instruction[3]] = registers[instruction[1]] * registers[instruction[2]]
		return registers
	},
	name: 'mulr'
}

module.exports = opcode
