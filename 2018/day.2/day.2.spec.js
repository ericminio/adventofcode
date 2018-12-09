const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')
const {
    Computer,
    Instructions,
    command
} = require('../../lib')
const { Part1 } = require('./screens')

describe('day 2 challenge', ()=> {

    describe('part 1', ()=>{

        var computer;
        beforeEach(()=>{
            computer = new Computer({
                ram:{ twos:0, threes:0 },
                screen: new Part1(),
                command:command(/(.*)/, (id, ram)=>{
                    var counts = {}
                    var letters = id.split('').forEach((letter)=>{
                        if (!counts[letter]) { counts[letter]=0 }
                        counts[letter] ++
                    })
                    Object.keys(counts).some((key)=>{
                        if (counts[key] == 2) {
                            ram.twos ++
                            return true
                        }
                    })
                    Object.keys(counts).some((key)=>{
                        if (counts[key] == 3) {
                            ram.threes ++
                            return true
                        }
                    })
                })
            })
        })

        it('can be explored 1', ()=>{
            computer.run(new Instructions(['abcdef']))
            expect(computer.screen.checksum).to.equal(0)
        })
        it('can be explored 2', ()=>{
            computer.run(new Instructions(['bababc']))
            expect(computer.screen.checksum).to.equal(1)
        })
        it('can be explored 3', ()=>{
            computer.run(new Instructions(['abbcde']))
            expect(computer.screen.checksum).to.equal(0)
        })
        it('can be explored 4', ()=>{
            computer.run(new Instructions(['abcccd']))
            expect(computer.screen.checksum).to.equal(0)
        })
        it('can be explored 5', ()=>{
            computer.run(new Instructions(['aabcdd']))
            expect(computer.screen.checksum).to.equal(0)
        })
        it('can be explored 6', ()=>{
            computer.run(new Instructions(['abcdee']))
            expect(computer.screen.checksum).to.equal(0)
        })
        it('can be explored 7', ()=>{
            computer.run(new Instructions(['ababab']))
            expect(computer.screen.checksum).to.equal(0)
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
            expect(computer.screen.checksum).to.equal(12)
        })
        it('can be solved', ()=>{
            computer.run(new Instructions(puzzle('day.2')))
            expect(computer.screen.checksum).to.equal(7688)
        })
    })

    describe('part 2', ()=>{

        var computer;
        beforeEach(()=>{
            computer = new Computer({
                ram:{ value:'', ids:[] },
                command:command(/(.*)/, (id, ram)=>{
                    var inspect = function(s1, s2) {
                        var s = ''
                        s1.split('').forEach((letter, i)=>{
                            s += letter == s2[i] ? letter : '' ;
                        })
                        return s;
                    }
                    ram.ids.some((item)=>{
                        var candidate = inspect(item, id)
                        if (candidate.length == id.length-1) {
                            ram.value = candidate
                            return true
                        }
                    })
                    ram.ids.push(id)
                })
            })
        })

        it('can be explored 1', ()=>{
            computer.run(new Instructions(['fghij', 'fguij']))
            expect(computer.ram.value).to.deep.equal('fgij')
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
            expect(computer.ram.value).to.deep.equal('fgij')
        })

        it('is solved', ()=>{
            computer.run(new Instructions(puzzle('day.2')))
            expect(computer.ram.value).to.deep.equal('lsrivmotzbdxpkxnaqmuwcchj')
        })
    })
})
