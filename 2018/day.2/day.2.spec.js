const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions
} = require('../../lib')

describe('day 2 challenge', ()=> {

    var command = (id, registries) => {
        var counts = {}
        var letters = id.split('').forEach((letter)=>{
            if (!counts[letter]) { counts[letter]=0 }
            counts[letter] ++
        })
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

    describe('part 2', ()=>{

        var computer;
        var ids
        var command = (id, registries) => {
            ids.forEach((item)=>{
                var candidate = inspect(item, id)
                if (candidate.length == id.length-1) {
                    registries.value = candidate
                }
            })
            ids.push(id)
        }
        var inspect = function(s1, s2) {
            var s = ''
            s1.split('').forEach((letter, i)=>{
                s += letter == s2[i] ? letter : '' ;
            })
            return s;
        }

        beforeEach(()=>{
            ids =[]
            computer = new Computer({
                registries:{ value:'' },
                command:command
            })
        })

        it('can be explored 1', ()=>{
            computer.run(new Instructions(['fghij', 'fguij']))
            expect(computer.registries).to.deep.equal({ value:'fgij' })
        })

        it('can be explored 2', ()=>{
            var ids = [
                'abcde',
                'fghij',
                'klmno',
                'pqrst',
                'fguij',
                'axcye',
                'wvxyz'
            ]

            computer.run(new Instructions(ids))
            expect(computer.registries).to.deep.equal({ value:'fgij' })
        })

        it('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.2')))
            expect(computer.registries).to.deep.equal({ value:'lsrivmotzbdxpkxnaqmuwcchj' })
        })
    })
})
