const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	Sample,
	matching
} = require('./lib')


describe('day 16 challenge', ()=> {

	describe('part 1', ()=>{

        describe('example', ()=>{

			it('works', ()=>{
				var sample = new Sample([
					'Before: [3, 2, 1, 1]',
					'9 2 1 2',
					'After:  [3, 2, 2, 1]'
				])
				var samples = [ { sample:sample, opcodes:matching(sample) }]
				var count = samples.reduce((acc, current)=>{
					if (current.opcodes.length == 3) { acc++ }
					return acc
				}, 0)

				expect(count).to.equal(1)
			})

		})

		it('is solved', ()=>{
			var lines = puzzle.lines('day.16', 'input-1.txt')
			var samples = []
			var i = 0
			while (i < lines.length) {
				var sample = new Sample([
					lines[i],
					lines[i+1],
					lines[i+2],
				])
				samples.push({ sample:sample, opcodes:matching(sample) })
				i += 4
			}

			var count = samples.reduce((acc, current)=>{
				if (current.opcodes.length >= 3) { acc++ }
				return acc
			}, 0)

			expect(count).to.equal(614)
		})
	})

	describe('part 2', ()=>{

		it('needs the codes', ()=>{
			var lines = puzzle.lines('day.16', 'input-1.txt')
			var samples = []
			var i = 0
			while (i < lines.length) {
				var sample = new Sample([
					lines[i],
					lines[i+1],
					lines[i+2],
				])
				samples.push({ sample:sample, opcodes:matching(sample) })
				i += 4
			}
			samples.sort((a, b)=>{
				if (b.sample.code > a.sample.code) { return -1 }
				if (b.sample.code == a.sample.code) { return 0 }
				if (b.sample.code < a.sample.code) { return 1 }
			})
			var candidates = Array(16).fill([])
			for (var i =0; i< samples.length; i++) {
				candidates[samples[i].sample.code] = samples[i].opcodes.map(opcode => opcode.name)
			}
			expect(candidates[10]).to.deep.equal(['eqrr'])

			codes = Array(16).fill('')
			codes[10] = 'eqrr'
			var assigneds = ['eqrr']
			var stop = false
			while (!stop) {
				for (var i=0; i<candidates.length; i++) {
					var candidate = candidates[i]
					for (var j=0; j<assigneds.length; j++) {
						var assigned = assigneds[j]
						// console.log(assigned);
						if (candidate.indexOf(assigned) != -1) {
							candidate.splice(candidate.indexOf(assigned), 1)
						}
					}
					if (candidate.length == 1) {
						codes[i] = candidate[0]
						assigneds.push(candidate[0])
					}
				}
				stop = true
				for (var i=0; i<candidates.length; i++) {
					var candidate = candidates[i]
					if (candidate.length != 0) {
						stop = false
					}
				}
			}

			expect(codes).to.deep.equal([
				'eqir',
				'borr',
				'addr',
				'gtri',
				'muli',
				'gtir',
				'mulr',
				'banr',
				'bori',
				'eqri',
				'eqrr',
				'bani',
				'setr',
				'gtrr',
				'addi',
  				'seti'
			])
		})

		it('is solved', ()=>{
			var opcodes = [
				require('./opcode.eqir'),
				require('./opcode.borr'),
				require('./opcode.addr'),
				require('./opcode.gtri'),
				require('./opcode.muli'),
				require('./opcode.gtir'),
				require('./opcode.mulr'),
				require('./opcode.banr'),
				require('./opcode.bori'),
				require('./opcode.eqri'),
				require('./opcode.eqrr'),
				require('./opcode.bani'),
				require('./opcode.setr'),
				require('./opcode.gtrr'),
				require('./opcode.addi'),
  				require('./opcode.seti')
			]
			var registries = [0, 0, 0, 0]
			var lines = puzzle.lines('day.16', 'input-2.txt')
			lines.forEach((line)=>{
				var instruction = JSON.parse('[' + line.split(' ').join(',') + ']')
				var opcode = opcodes[instruction[0]]
				opcode.exec(instruction, registries)
			})
			expect(registries[0]).to.equal(656)
		})
	})
})
