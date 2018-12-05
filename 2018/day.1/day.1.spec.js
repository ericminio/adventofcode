const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions,
    RollingInstructions
} = require('../../lib')
const {
    inc,
    dec,
    value
} = require('./cpu')
const { Part1, Part2 } = require('./screens')

describe('day 1 challenge', ()=> {

    var computer

    beforeEach(()=>{
        computer = new Computer({
            registries:{ value:0 },
            commands:[inc, dec]
        })
    })

    describe('part 1', ()=>{

        beforeEach(()=>{
            computer.observer = new Part1()
        })

        it('can extract positive value', ()=>{
            expect(value('+15')).to.equal(15)
        })
        it('can extract negative value', ()=>{
            expect(value('-15')).to.equal(15)
        })

        it('can be explored', ()=>{
            computer.run(new Instructions(['+1', '-2', '+3', '+1']))

            expect(computer.observer.value).to.equal(3)
        })

        it('is solved', ()=> {
            computer.run(new Instructions(puzzle('day.1')))

            expect(computer.observer.value).to.deep.equal(518)
        })
    })

    describe('part 2', ()=>{

        beforeEach(()=>{
            computer.observer = new Part2()
        })

        it('can be explored', (done)=>{
            computer.observer.exit = (registries)=>{
                expect(computer.observer.value).to.equal(2)
                done()
            }

            computer.run(new RollingInstructions(['+1', '-2', '+3', '+1']))
        })

        it('can be explored more', (done)=>{
            computer.observer.exit = (registries)=>{
                expect(computer.observer.value).to.equal(1)
                done()
            }
            computer.run(new RollingInstructions(['+1', '-2', '+3']))
        })

        it.skip('is solved', (done)=>{
            computer.observer.exit = (registries)=>{
                expect(computer.observer.value).to.equal(72889)
                done()
            }

            computer.run(new RollingInstructions(puzzle('day.1')))
        })
    })
})
