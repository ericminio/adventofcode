const { expect } = require('chai')
const {
    extractInt,
    extractIntWithUnit,
    extractString
} = require('./extract.js')

describe('extract string', ()=>{

    it('works as expected', ()=>{
        expect(extractString('any', 'any:what42ever')).to.equal('what42ever')
    })
    it('can find value far in input', ()=>{
        expect(extractString('any', 'toto:15 any:42')).to.equal('42')
    })
    it('can find value near in input', ()=>{
        expect(extractString('any', 'any:42 toto:15 ')).to.equal('42')
    })
    it('defaults to undefined', ()=>{
        expect(extractString('any', 'other:hello')).to.equal(undefined)
    })
    it('resists hash', ()=>{
        expect(extractString('any', 'any:#hello')).to.equal('#hello')
    })
})
describe('extract int', ()=>{

    it('works as expected', ()=>{
        expect(extractInt('any', 'any:42')).to.equal(42)
    })
    it('can find value far in input', ()=>{
        expect(extractInt('any', 'toto:15 any:42')).to.equal(42)
    })
    it('can find value near in input', ()=>{
        expect(extractInt('any', 'any:42 toto:15 ')).to.equal(42)
    })
    it('returns string when not an int', ()=>{
        expect(extractInt('any', 'any:hello')).to.equal('hello')
    })
    it('defaults to undefined', ()=>{
        expect(extractInt('any', 'other:hello')).to.equal(undefined)
    })
})
describe('extract int with unit', ()=>{

    it('works as expected', ()=>{
        expect(extractIntWithUnit('any', 'any:42cm'))
            .to.deep.equal({ unit:'cm', value:42 })
    })
    it('can find value far in input', ()=>{
        expect(extractIntWithUnit('any', 'toto:15 any:42cm'))
            .to.deep.equal({ unit:'cm', value:42 })
    })
    it('can find value near in input', ()=>{
        expect(extractIntWithUnit('any', 'any:42cm toto:15 '))
        .to.deep.equal({ unit:'cm', value:42 })
    })
    it('returns string when not an int', ()=>{
        expect(extractIntWithUnit('any', 'any:hello')).to.equal('hello')
    })
    it('returns int when missing unit', ()=>{
        expect(extractIntWithUnit('any', 'any:42')).to.equal(42)
    })
    it('defaults to undefined', ()=>{
        expect(extractIntWithUnit('any', 'other:hello')).to.equal(undefined)
    })
})
