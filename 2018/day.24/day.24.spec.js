const { expect } = require('chai')
const puzzle = require('../puzzle.input')
const {
    parse
} = require('./lib')

describe.only('day 24 challenge', ()=> {

	describe('parser', ()=>{

        var immunes, infections
        beforeEach(()=>{
            var lines = puzzle.lines('day.24', 'example.txt')
            immunes = parse(lines.slice(1, 3))
            infections = parse(lines.slice(5, 8))
        })

		it('can parse unit count', ()=>{
            expect(immunes.map(x => x.unitCount)).to.deep.equal([17, 989])
            expect(infections.map(x => x.unitCount)).to.deep.equal([801, 4485])
		})
        it('can parse hit points', ()=>{
            expect(immunes.map(x => x.hitPoints)).to.deep.equal([5390, 1274])
            expect(infections.map(x => x.hitPoints)).to.deep.equal([4706, 2961])
		})
        it('can parse damage', ()=>{
            expect(immunes.map(x => x.damage)).to.deep.equal([4507, 25])
            expect(infections.map(x => x.damage)).to.deep.equal([116, 12])
		})
        it('can parse damage', ()=>{
            expect(immunes.map(x => x.damage)).to.deep.equal([4507, 25])
            expect(infections.map(x => x.damage)).to.deep.equal([116, 12])
		})
        it('can parse attack', ()=>{
            expect(immunes.map(x => x.attack)).to.deep.equal(['fire', 'slashing'])
            expect(infections.map(x => x.attack)).to.deep.equal(['bludgeoning', 'slashing'])
		})
        it('can parse weaknesses', ()=>{
            expect(immunes.map(x => x.weaknesses)).to.deep.equal([['radiation', 'bludgeoning'], ['bludgeoning', 'slashing']])
            expect(infections.map(x => x.weaknesses)).to.deep.equal([['radiation'], ['fire', 'cold']])
		})
        it('can parse immunities', ()=>{
            expect(immunes.map(x => x.immunities)).to.deep.equal([[], ['fire']])
            expect(infections.map(x => x.immunities)).to.deep.equal([[], ['radiation']])
		})
	})


})
