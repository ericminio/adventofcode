var opcodes = [
	require('../day.16/opcode.eqir'),
	require('../day.16/opcode.borr'),
	require('../day.16/opcode.addr'),
	require('../day.16/opcode.gtri'),
	require('../day.16/opcode.muli'),
	require('../day.16/opcode.gtir'),
	require('../day.16/opcode.mulr'),
	require('../day.16/opcode.banr'),
	require('../day.16/opcode.bori'),
	require('../day.16/opcode.eqri'),
	require('../day.16/opcode.eqrr'),
	require('../day.16/opcode.bani'),
	require('../day.16/opcode.setr'),
	require('../day.16/opcode.gtrr'),
	require('../day.16/opcode.addi'),
	require('../day.16/opcode.seti')
]
var lookup = (name)=>{
	var command
	opcodes.forEach((opcode)=>{
		if (name == opcode.name) {
			command = opcode
		}
	})
	return command
}
var run = (options)=>{
	var registers = options.registers
	var pointer = options.pointer
	var instructions = options.instructions
	var count = options.count || -1
	var ip = 0
	var line
	var command
	var instruction

	while (ip < instructions.length -1 && count != 0) {
		count --
		line = instructions[ip+1]
		registers[pointer] = ip
		command = lookup(line.substring(0, 4))
		instruction = JSON.parse('[0, ' + line.substring(5).split(' ').join(',') + ']')
		command.exec(instruction, registers)
		ip = registers[pointer]
		ip ++
	}
	return registers
}
var divisors = (number)=>{
	var array = []
	for (var i=1 ; i<=number; i++) {
		if (number % i == 0) {
			array.push(i)
		}
	}
	return array
}

module.exports = {
	run:run,
	divisors:divisors
}
