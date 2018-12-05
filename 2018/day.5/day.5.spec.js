const { expect } = require('chai')
const { puzzle } = require('../puzzle.input')

describe('day 5 challenge', ()=> {

    var reduce = function(input) {
        var index = 0;
        while (index < input.length-1) {
            if (Math.abs((input.charCodeAt(index) - input.charCodeAt(index+1))) == 97-65) {
                input = input.substring(0, index) + input.substring(index+2)
                index = 0
            } else {
                index ++
            }
        }
        return input
    }

    describe('part 1', ()=>{

        it('can be explored #1', ()=>{
            expect(reduce('aA').length).to.equal(0)
        })
        it('can be explored #2', ()=>{
            expect(reduce('abBA').length).to.equal(0)
        })
        it('can be explored #3', ()=>{
            expect(reduce('dabAcCaCBAcCcaDA').length).to.equal(10)
        })
        it.skip('is solved', ()=>{
            expect(reduce(
                require('fs').readFileSync(require('path').
                join(__dirname, 'input.txt')).toString().trim()).length)
                .to.equal(11108)
        })
    })

    describe('part 2', ()=>{

        var remove = function(code, input) {
            input = input.split(String.fromCharCode(code)).join('')
            input = input.split(String.fromCharCode(code-32)).join('')
            return input
        }
        var shortest = function(input) {
            var min = 10000
            for (var code=97; code<97+25; code++) {
                var candidate = remove(code, input)
                var result = reduce(candidate)
                if (result.length < min) {
                    min = result.length
                }
            }
            return min
        }

        it('can be explored #1', ()=>{
            expect(remove(97, 'dabAcCaCBAcCcaDA')).to.equal('dbcCCBcCcD')
        })
        it('can be explored #2', ()=>{
            expect(shortest('dabAcCaCBAcCcaDA')).to.equal(4)
        })
        it.skip('is solved', ()=>{
            var input = require('fs').readFileSync(require('path').
                            join(__dirname, 'input.txt')).toString().trim()
            expect(shortest(input)).to.equal(5094)
        })
    })
})
