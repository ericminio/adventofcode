const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions
} = require('../../lib')

describe('day 3 challenge', ()=> {

    var command = (instruction, ram) => {
        var pattern = /^\#(.*)\s@\s(.*),(.*):\s(.*)x(.*)/;
        var groups = pattern.exec(instruction)
        var id = parseInt(groups[1])
        var left = parseInt(groups[2])
        var top = parseInt(groups[3])
        var width = parseInt(groups[4])
        var height = parseInt(groups[5])
        for (var i=0; i<(top+height); i++) {
            if (ram[i] === undefined) { ram.push([]) }
            for (var j=0; j<(left+width); j++) {
                if (ram[i][j] == undefined) { ram[i].push({ ids:[], count:0 }) }
            }
        }
        for (var i=top; i<top+height; i++) {
            for (var j=left; j<left+width; j++) {
                ram[i][j].count ++
                ram[i][j].ids.push(id)
            }
        }
    }

    describe('part 1', ()=>{

        var computer
        var observer;

        beforeEach(()=>{
            computer = new Computer({
                ram:[],
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
            for (var i=0; i<computer.ram.length; i++) {
                for (var j=0; j<computer.ram[i].length; j++) {
                    if (computer.ram[i][j].count > 1) {
                        sum ++
                    }
                }
            }
            expect(sum).to.equal(4)
        })

        it.skip('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.3')))
            var sum = 0
            for (var i=0; i<computer.ram.length; i++) {
                for (var j=0; j<computer.ram[i].length; j++) {
                    if (computer.ram[i][j].count > 1) {
                        sum ++
                    }
                }
            }
            expect(sum).to.equal(111326)
        })
    })

    describe('part 2', ()=>{

        var computer
        var observer;

        beforeEach(()=>{
            computer = new Computer({
                ram:[],
                command:command
            })
        })

        var claim = function(ids) {
            var candidate
            for (var k=0; k<ids.length; k++) {
                var id = ids[k]
                var found = true
                for (var i=0; i<computer.ram.length; i++) {
                    for (var j=0; j<computer.ram[i].length; j++) {
                        if (computer.ram[i][j].ids.length > 1
                            && computer.ram[i][j].ids.includes(id)) {
                            found = false
                        }
                    }
                }
                if (found) {
                    candidate = id
                    break;
                }
            }
            return candidate
        }

        it('can be explored', ()=>{
            computer.run(new Instructions([
                '#1 @ 1,3: 4x4',
                '#2 @ 3,1: 4x4',
                '#3 @ 5,5: 2x2'
            ]))
            var ids = Array(3).fill().map((x,i)=>i+1)

            expect(claim(ids)).to.equal(3)
        })

        it.skip('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.3')))
            var ids = Array(1337).fill().map((x,i)=>i+1)

            expect(claim(ids)).to.equal(1019)
        })
    })
})
