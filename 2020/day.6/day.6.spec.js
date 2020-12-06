const { expect } = require('chai')
const { raw } = require('../puzzle.input')
const {
    parseEntriesSeparatedByEmptyLineIntoArrayOfString
} = require('../parsing')

describe('day 6 challenge', ()=> {

    let answer = (entries)=> {
        return entries.reduce((acc, current)=> acc + current.count, 0)
    }

    describe('part 1', ()=>{

        let parseEntries = (file)=>{
            let input = raw('day.6', file)
            return parseEntriesSeparatedByEmptyLineIntoArrayOfString(input, countFromUnion)
        }
        
        describe('example', ()=>{

            let entries
            beforeEach(()=>{
                entries = parseEntries('example.txt')
            })

            it('has 5 definitions', ()=>{                
                expect(entries.length).to.equal(5)
            })
            it('has a smaller set', ()=>{
                expect(answer(entries)).to.equal(11)
            })
        })

        it('is solved', ()=>{
            let entries = parseEntries('input.txt')
            expect(answer(entries)).to.equal(6521)
        })
    })
    describe('part 2', ()=>{

        let parseEntries = (file)=>{
            let input = raw('day.6', file)
            return parseEntriesSeparatedByEmptyLineIntoArrayOfString(input, countFromIntersection)
        }

        describe('example', ()=>{

            let entries
            beforeEach(()=>{
                entries = parseEntries('example.txt')
            })

            it('has 5 definitions', ()=>{                
                expect(entries.length).to.equal(5)
            })
            it('has a smaller set', ()=>{
                expect(answer(entries)).to.equal(6)
            })
        })

        it('is solved', ()=>{
            let entries = parseEntries('input.txt')
            expect(answer(entries)).to.equal(3305)
        })
    })  
})

const countFromUnion = (definitions)=>{
    let union = {}
    definitions.forEach((definition)=> {
        definition.split('').forEach(letter => {
            union[letter] = 1
        })
    })
    
    return { count: Object.keys(union).length }
}
const countFromIntersection = (definitions)=> {    
    let intersection = definitions[0].split('')
    definitions.forEach((definition)=> {
        intersection = intersection.filter(e => definition.split('').includes(e))
    })

    return { count:intersection.length }
}
