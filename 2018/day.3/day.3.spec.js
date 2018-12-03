const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions
} = require('../../lib')

describe.only('day 3 challenge', ()=> {

    var command = (instruction, registries) => {
        var id = parseInt(instruction.substring(1, instruction.indexOf('@')).trim())
        var left = parseInt(instruction.substring(instruction.indexOf('@ ')+2, instruction.indexOf(',')))
        var top = parseInt(instruction.substring(instruction.indexOf(',')+1, instruction.indexOf(':')))
        var width = parseInt(instruction.substring(instruction.indexOf(': ')+2, instruction.indexOf('x')))
        var height = parseInt(instruction.substring(instruction.indexOf('x')+1))
        for (var i=0; i<(top+height); i++) {
            if (registries[i] === undefined) { registries.push([]) }
            for (var j=0; j<(left+width); j++) {
                if (registries[i][j] == undefined) { registries[i].push({ ids:[], count:0 }) }
            }
        }
        for (var i=top; i<top+height; i++) {
            for (var j=left; j<left+width; j++) {
                registries[i][j].count ++
                registries[i][j].ids.push(id)
            }
        }
    }

    describe('part 1', ()=>{

        var computer
        var observer;

        beforeEach(()=>{
            computer = new Computer({
                registries:[],
                command:command
            })
        })

        it('can be explored', ()=>{
            computer.run(new Instructions([
                '#1 @ 1,3: 4x4',
                '#2 @ 3,1: 4x4',
                '#3 @ 5,5: 2x2'
            ]))
            var sum = 0
            for (var i=0; i<computer.registries.length; i++) {
                for (var j=0; j<computer.registries[i].length; j++) {
                    if (computer.registries[i][j].count > 1) {
                        sum ++
                    }
                }
            }
            expect(sum).to.equal(4)
        })

        it.skip('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.3')))
            var sum = 0
            for (var i=0; i<computer.registries.length; i++) {
                for (var j=0; j<computer.registries[i].length; j++) {
                    if (computer.registries[i][j].count > 1) {
                        sum ++
                    }
                }
            }
            expect(sum).to.equal(111326)
        })
    })

    describe.only('part 2', ()=>{

        var computer
        var observer;

        beforeEach(()=>{
            computer = new Computer({
                registries:[],
                command:command
            })
        })

        it('can be explored', ()=>{
            computer.run(new Instructions([
                '#1 @ 1,3: 4x4',
                '#2 @ 3,1: 4x4',
                '#3 @ 5,5: 2x2'
            ]))
            var ids = Array(3).fill().map((x,i)=>i+1)
            var candidate
            for (var k=0; k<ids.length; k++) {
                var id = ids[k]
                var found = true
                for (var i=0; i<computer.registries.length; i++) {
                    for (var j=0; j<computer.registries[i].length; j++) {
                        if (computer.registries[i][j].ids.length > 1
                            && computer.registries[i][j].ids.includes(id)) {
                            found = false
                        }
                    }
                }
                if (found) {
                    candidate = id
                }
            }
            expect(candidate).to.equal(3)
        })

        it.skip('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.3')))
            var ids = Array(1337).fill().map((x,i)=>i+1)
            var candidate
            for (var k=0; k<ids.length; k++) {
                var id = ids[k]
                var found = true
                for (var i=0; i<computer.registries.length; i++) {
                    for (var j=0; j<computer.registries[i].length; j++) {
                        if (computer.registries[i][j].ids.length > 1
                            && computer.registries[i][j].ids.includes(id)) {
                            found = false
                        }
                    }
                }
                if (found) {
                    candidate = id
                }
            }
            expect(candidate).to.equal(1019)
        })
    })
})
