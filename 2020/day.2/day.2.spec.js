const { expect } = require('chai')
const { puzzle, lines } = require('../puzzle.input')
const solve = (input) => {
    return solveWithPolicy(input, policy1)
}
const solveWithPolicy = (input, policy) => {
    let entries = input.map(i => parseEntry(i))
    let valids = entries.filter(e => policy(e))
    return valids.length
}
const parseEntry = (line)=>{
    let pattern = /^(\d*)-(\d*)\s(.):\s(.*)$/
    let groups = pattern.exec(line)
    return { 
        letter: groups[3],
        minCount: parseInt(groups[1]),
        maxCount: parseInt(groups[2]),
        password: groups[4]
    }
}
const policy1 = (entry)=> {
    let count = entry.password.split('').filter(c => c == entry.letter).length
    return count >= entry.minCount && count <= entry.maxCount
}
const policy2 = (entry)=> {
    return entry.password[entry.minCount-1]==entry.letter
        ^  entry.password[entry.maxCount-1]==entry.letter
}
describe('day 2 challenge', ()=> {

    describe('parsing', ()=>{
        it('can extract letter', ()=>{
            expect(parseEntry('1-2 a: abc').letter).to.equal('a')
        })
        it('can extract minimum count', ()=>{
            expect(parseEntry('1-2 a: abc').minCount).to.equal(1)
        })
        it('can extract maximum count', ()=>{
            expect(parseEntry('1-2 a: abc').maxCount).to.equal(2)
        })
        it('can extract password', ()=>{
            expect(parseEntry('1-2 a: abc').password).to.equal('abc')
        })
        it('can resist 2-digits numbers', ()=>{
            expect(parseEntry('11-22 a: abc').minCount).to.equal(11)
            expect(parseEntry('11-22 a: abc').maxCount).to.equal(22)
        })
    })
    describe('example', ()=>{

        let input
        beforeEach(()=>{
            input = lines('day.2', 'example.txt')            
        })

        it('is readable', ()=>{
            expect(input.length).to.equal(3)
        })
        it('can be solved', ()=>{
            expect(solve(input)).to.equal(2)
        })
        
    })
    describe('input', ()=>{

        let input
        beforeEach(()=>{
            input = puzzle('day.2')            
        })

        it('is readable', ()=>{
            expect(input.length).to.equal(1000)
        })
        it('can be solved', ()=>{
            expect(solve(input)).to.equal(569)
        })
    })
    describe('part 2 policy', ()=>{

        it('is different', ()=>{
            expect(policy2(parseEntry('1-3 a: abcde'))).to.equal(1)
            expect(policy2(parseEntry('1-3 b: cdefg'))).to.equal(0)
            expect(policy2(parseEntry('2-9 c: ccccccccc'))).to.equal(0)
        })
        it('leads to different outcome', ()=>{
            let input = puzzle('day.2')
            
            expect(solveWithPolicy(input, policy2)).to.equal(346)
        })
    })
})

