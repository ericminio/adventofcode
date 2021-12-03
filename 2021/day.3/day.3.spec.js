const { expect } = require('chai')
const { data } = require('../puzzle.input')

describe('day 3 challenge', ()=> {

    const example = data('day.3', 'example.txt');
    const gamaRateOf = (lines) => {
        let count = { '0':0, '1':0 }
        lines.forEach((line) => {
            count[line[0]] ++;
        })
        return count['0'] > count['1'] ? '0' : '1'
    } 

    describe('gamma rate', () => {

        it('is available for study', () => {
            expect(gamaRateOf(['1'])).to.equal('1');
        })

        it('keeps the most common value', () => {
            expect(gamaRateOf(['1', '0', '0'])).to.equal('0');
        })
    })
})
