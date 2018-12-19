const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
	digest,
	Map,
	tick
} = require('./lib')

describe('day 18 challenge', ()=> {

    describe('part 1', ()=>{

        describe('exploration', ()=>{
			var map
			beforeEach(()=>{
				var lines = puzzle.lines('day.18', 'example.txt')
				map = digest(lines)
			})

			it('can read map', ()=>{
				expect(map.acre(0, 0)).to.equal(0)
				expect(map.acre(0, 1)).to.equal(1)
				expect(map.acre(0, 7)).to.equal(10)

				expect(map.acre(2, 1)).to.equal(10)
			})
			it('resists out-of-range read', ()=>{
				expect(map.acre(-1, -1)).to.equal(0)
				expect(map.acre(1, -1)).to.equal(0)
				expect(map.acre(100, 100)).to.equal(0)
			})
        })

		describe('open acre', ()=>{
			it('becomes tree when surrounded by enough trees', ()=>{
				var initial = digest([
					'|.|',
					'..|'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(10)
			})
			it('stays open otherwise', ()=>{
				var initial = digest([
					'|.|',
					'..|'
				])
				var next = tick(initial)

				expect(next.acre(1, 0)).to.equal(0)
			})
		})
		describe('tree acre', ()=>{
			it('becomes lumberyard when surrounded by enough lumberyards', ()=>{
				var initial = digest([
					'#.#',
					'#|#'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(1)
			})
			it('stays tree otherwise', ()=>{
				var initial = digest([
					'...',
					'#|#'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(10)
			})
		})
		describe('lumberyard acre', ()=>{
			it('remains lumberyard when surrounded by at least 1 lumberyard and 1 tree', ()=>{
				var initial = digest([
					'||#',
					'.##'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(1)
			})
			it('becomes open when missing tree', ()=>{
				var initial = digest([
					'..#',
					'.##'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(0)
			})
			it('becomes open when missing lumberyard', ()=>{
				var initial = digest([
					'..|',
					'.#|'
				])
				var next = tick(initial)

				expect(next.acre(1, 1)).to.equal(0)
			})
		})

		describe('resource value', ()=>{
			it('multiplies trees and lumberyards', ()=>{
				var map = digest([
					'.||',
					'#|#'
				])

				expect(map.value()).to.equal(6)
			})
		})

		it('has an example', ()=>{
			var lines = puzzle.lines('day.18', 'example.txt')
			var map = digest(lines)
			for (var i=0; i<10; i++) {
				map = tick(map)
			}

			expect(map.value()).to.equal(1147)
		})
		it('is solved', ()=>{
			var lines = puzzle.lines('day.18', 'input.txt')
			var map = digest(lines)
			for (var i=0; i<10; i++) {
				map = tick(map)
			}

			expect(map.value()).to.equal(574200)
		})
	})

	describe('part 2', ()=>{

		it('eventually reaches periodicity of 28', ()=>{
			var lines = puzzle.lines('day.18', 'input.txt')
			var map = digest(lines)

			for (var i=0; i<500; i++) {
				map = tick(map)
			}
			var snapshot = map.value()
			for (var i=0; i<28; i++) {
				map = tick(map)
			}
			expect(map.value()).to.equal(snapshot)

			for (var i=0; i<333; i++) {
				map = tick(map)
			}
			snapshot = map.value()
			for (var i=0; i<28; i++) {
				map = tick(map)
			}
			expect(map.value()).to.equal(snapshot)
		})
		it('helps predict future values beyond 500', ()=>{
			var lines = puzzle.lines('day.18', 'input.txt')
			var map1 = digest(lines)
			var map2 = digest(lines)
			var jump = 2018

			for (var i=0; i<jump; i++) {
				map1 = tick(map1)
			}
			var actual = map1.value()

			for (var i=0; i<500; i++) {
				map2 = tick(map2)
			}
			for (var i=0; i<(jump-500) % 28; i++) {
				map2 = tick(map2)
			}
			var prediction = map2.value()

			expect(prediction).to.equal(actual)
		})
		it('is solved', ()=>{
			var lines = puzzle.lines('day.18', 'input.txt')
			var map = digest(lines)
			var jump = 1000000000

			for (var i=0; i<500; i++) {
				map = tick(map)
			}
			for (var i=0; i<(jump-500) % 28; i++) {
				map = tick(map)
			}
			var prediction = map.value()

			expect(prediction).to.equal(211653)
		})
	})
})
