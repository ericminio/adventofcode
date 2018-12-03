const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions,
    RollingInstructions
} = require('../../lib')

describe('day 1 challenge', ()=> {

    var command = (instruction, registries) => {
        registries.value += parseInt(instruction)
    }

    describe('part 1', ()=>{

        var computer

        beforeEach(()=>{
            computer = new Computer({
                registries:{ value:0 },
                command:command
            })
        })

        it('can be explored', ()=>{
            computer.run(new Instructions(['+1', '-2', '+3', '+1']))

            expect(computer.registries).to.deep.equal({ value:3 })
        })

        it('is solved', ()=> {
            computer.run(new Instructions(puzzle('day.1')))

            expect(computer.registries).to.deep.equal({ value:518 })
        })
    })

    describe('part 2', ()=>{

        var Observer = function() {
            this.seen = []
        }
        Observer.prototype.inspect = function(registries) {
            if (this.seen.includes(registries.value)) {
                this.exit(registries)
            }
            this.seen.push(registries.value)
        }
        var computer
        var observer;

        beforeEach(()=>{
            observer = new Observer()
            computer = new Computer({
                registries:{ value:0 },
                command:command,
                observer:observer
            })
        })

        it('can be explored', (done)=>{
            observer.exit = (registries)=>{
                expect(registries).to.deep.equal({ value:2 })
                done()
            }

            computer.run(new RollingInstructions(['+1', '-2', '+3', '+1']))
        })

        it('can be explored more', (done)=>{
            observer.exit = (registries)=>{
                expect(registries).to.deep.equal({ value:1 })
                done()
            }
            computer.run(new RollingInstructions(['+1', '-2', '+3']))
        })

        it.skip('is solved', (done)=>{
            observer.exit = (registries)=>{
                expect(registries).to.deep.equal({ value:72889 })
                done()
            }

            computer.run(new RollingInstructions(puzzle('day.1')))
        })
    })
})
