const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions,
    RollingInstructions
} = require('../../lib')

describe('day 2 challenge', ()=> {

    var command = (id, registries) => {
        var counts = {
            'a':0, 'b':0, 'c':0, 'd':0, 'e':0, 'f':0,
            'g':0, 'h':0, 'i':0, 'j':0, 'k':0, 'l':0,
            'm':0, 'n':0, 'o':0, 'p':0, 'q':0, 'r':0,
            's':0, 't':0, 'u':0, 'v':0, 'w':0, 'x':0,
            'y':0, 'z':0
        }
        var letters = id.split('')
        for (var i=0; i<letters.length; i++) {
            var letter = letters[i]
            counts[letter] ++
        }
        var keys = Object.keys(counts);
        var twos = false;
        var threes = false;
        for (var i=0; i<keys.length; i++) {
            var key = keys[i]
            if (counts[key] == 2 && !twos) {
                registries.twos ++
                twos = true
            }
            if (counts[key] == 3 && !threes) {
                registries.threes ++
                threes = true
            }
        }
        registries.checksum = registries.twos * registries.threes
    }

    describe('part 1', ()=>{

        var computer;

        beforeEach(()=>{
            computer = new Computer({
                registries:{ twos:0, threes:0 },
                command:command
            })
        })

        it('can be explored 1', ()=>{
            computer.run(new Instructions(['abcdef']))
            expect(computer.registries).to.deep.equal({ twos:0, threes:0, checksum:0 })
        })
        it('can be explored 2', ()=>{
            computer.run(new Instructions(['bababc']))
            expect(computer.registries).to.deep.equal({ twos:1, threes:1, checksum:1 })
        })
        it('can be explored 3', ()=>{
            computer.run(new Instructions(['abbcde']))
            expect(computer.registries).to.deep.equal({ twos:1, threes:0, checksum:0 })
        })
        it('can be explored 4', ()=>{
            computer.run(new Instructions(['abcccd']))
            expect(computer.registries).to.deep.equal({ twos:0, threes:1, checksum:0 })
        })
        it('can be explored 5', ()=>{
            computer.run(new Instructions(['aabcdd']))
            expect(computer.registries).to.deep.equal({ twos:1, threes:0, checksum:0 })
        })
        it('can be explored 6', ()=>{
            computer.run(new Instructions(['abcdee']))
            expect(computer.registries).to.deep.equal({ twos:1, threes:0, checksum:0 })
        })
        it('can be explored 7', ()=>{
            computer.run(new Instructions(['ababab']))
            expect(computer.registries).to.deep.equal({ twos:0, threes:1, checksum:0 })
        })
        it('can be explored 7', ()=>{
            computer.run(new Instructions([
                'abcdef',
                'bababc',
                'abbcde',
                'abcccd',
                'aabcdd',
                'abcdee',
                'ababab',
            ]))
            expect(computer.registries).to.deep.equal({ twos:4, threes:3, checksum:12 })
        })
        it('can be solved', ()=>{
            computer.run(new Instructions(puzzle('day.2')))
            expect(computer.registries).to.deep.equal({ twos:248, threes:31, checksum:7688 })
        })
    })
})
