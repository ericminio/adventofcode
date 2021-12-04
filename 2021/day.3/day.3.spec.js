const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe('day 3 challenge', ()=> {

    const example = lines('day.3', 'example.txt');
    const input = lines('day.3', 'input.txt');
    const gamaRateOf = (lines) => {
        let count = counts(lines);
        let size = lines[0].length;
        let value = '';
        for (var i=0; i< size; i++) {
            value += count[i]['0'] > count[i]['1'] ? '0' : '1'
        }
        return value;
    } 
    const epsilonRateOf = (lines) => {
        let count = counts(lines);
        let size = lines[0].length;
        let value = '';
        for (var i=0; i< size; i++) {
            value += count[i]['0'] < count[i]['1'] ? '0' : '1'
        }
        return value;
    } 
    const counts = (lines) => {
        let size = lines[0].length;
        let count = [];
        for (var i=0; i< size; i++) {
            count.push({ '0':0, '1':0 })
        }
        lines.forEach((line) => {
            for (var i=0; i<size; i++) {
                count[i][line[i]] ++;
            }
            
        })
        return count;
    }
    const powerConsumption = (input) => {
        return parseInt(gamaRateOf(input), 2) * parseInt(epsilonRateOf(input), 2);
    }

    describe('gamma rate', () => {

        it('is available for study', () => {
            expect(gamaRateOf(['1'])).to.equal('1');
        })

        it('keeps the most common value', () => {
            expect(gamaRateOf(['1', '0', '0'])).to.equal('0');
            expect(gamaRateOf(['1', '0', '0', '1', '1'])).to.equal('1');
        })

        it('works with 2 digits', () => {
            expect(gamaRateOf(['10', '01', '01'])).to.equal('01');
        });

        it('works with the example of part 1', () => {
            expect(parseInt(gamaRateOf(example), 2)).to.equal(22);
        });
    })

    describe('epsilon rate', () => {

        it('works with the example of part 1', () => {
            expect(parseInt(epsilonRateOf(example), 2)).to.equal(9);
        });
    })

    it('gives answer for the example', () => {
        expect(powerConsumption(example)).to.equal(198);
    })
    it('gives answer for the part 1', () => {
        expect(powerConsumption(input)).to.equal(738234);
    })
})
