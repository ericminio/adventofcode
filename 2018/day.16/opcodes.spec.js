var { expect } = require('chai')

describe('opcodes', ()=>{

	it('addr works', ()=>{
		var opcode = require('./opcode.addr')
		var after = opcode.exec([9, 0, 1, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 7])
	})
	it('addi works', ()=>{
		var opcode = require('./opcode.addi')
		var after = opcode.exec([9, 0, 1, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 6])
	})
	it('mulr works', ()=>{
		var opcode = require('./opcode.mulr')
		var after = opcode.exec([9, 0, 1, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 10])
	})
	it('muli works', ()=>{
		var opcode = require('./opcode.muli')
		var after = opcode.exec([9, 0, 3, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 15])
	})
	it('setr works', ()=>{
		var opcode = require('./opcode.setr')
		var after = opcode.exec([9, 0, 3, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 5])
	})
	it('seti works', ()=>{
		var opcode = require('./opcode.seti')
		var after = opcode.exec([9, 7, 3, 3], [5, 2, 0, 0])

		expect(after).to.deep.equal([5, 2, 0, 7])
	})
	it('banr works', ()=>{
		var opcode = require('./opcode.banr')
		var after = opcode.exec([9, 0, 1, 3], [6, 3, 0, 0])

		expect(after).to.deep.equal([6, 3, 0, 2])
	})
	it('bani works', ()=>{
		var opcode = require('./opcode.bani')
		var after = opcode.exec([9, 0, 3, 3], [6, 0, 0, 0])

		expect(after).to.deep.equal([6, 0, 0, 2])
	})
	it('borr works', ()=>{
		var opcode = require('./opcode.borr')
		var after = opcode.exec([9, 0, 1, 3], [2, 1, 0, 0])

		expect(after).to.deep.equal([2, 1, 0, 3])
	})
	it('bori works', ()=>{
		var opcode = require('./opcode.bori')
		var after = opcode.exec([9, 0, 4, 3], [2, 1, 0, 0])

		expect(after).to.deep.equal([2, 1, 0, 6])
	})
	it('gtir works', ()=>{
		var opcode = require('./opcode.gtir')

		expect(opcode.exec([9, 3, 0, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 1])
		expect(opcode.exec([9, 1, 0, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 0])
	})
	it('gtri works', ()=>{
		var opcode = require('./opcode.gtri')

		expect(opcode.exec([9, 0, 1, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 1])
		expect(opcode.exec([9, 0, 3, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 0])
	})
	it('gtrr works', ()=>{
		var opcode = require('./opcode.gtrr')

		expect(opcode.exec([9, 0, 1, 3], [2, 1, 0, 0])).to.deep.equal([2, 1, 0, 1])
		expect(opcode.exec([9, 0, 1, 3], [2, 3, 0, 0])).to.deep.equal([2, 3, 0, 0])
	})
	it('eqir works', ()=>{
		var opcode = require('./opcode.eqir')

		expect(opcode.exec([9, 0, 1, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 1])
		expect(opcode.exec([9, 0, 1, 3], [2, 3, 0, 0])).to.deep.equal([2, 3, 0, 0])
	})
	it('eqri works', ()=>{
		var opcode = require('./opcode.eqri')

		expect(opcode.exec([9, 0, 2, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 1])
		expect(opcode.exec([9, 0, 1, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 0])
	})
	it('eqrr works', ()=>{
		var opcode = require('./opcode.eqrr')

		expect(opcode.exec([9, 0, 1, 3], [2, 2, 0, 0])).to.deep.equal([2, 2, 0, 1])
		expect(opcode.exec([9, 0, 1, 3], [2, 0, 0, 0])).to.deep.equal([2, 0, 0, 0])
	})
})
