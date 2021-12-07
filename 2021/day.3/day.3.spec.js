const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe('day 3 challenge', ()=> {

    const example = lines('day.3', 'example.txt');
    const input = lines('day.3', 'input.txt');
    
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

        it ('explore reduce with strings', () => {
            let counts = [
                { '0':2, '1':0 },
                { '0':0, '1':2 },
            ];
            let value = counts.reduce((acc, curr) => 
                acc += curr['0'] > curr['1'] ? '0' : '1'
            , '')
            expect(value).to.equal('01');
        })
    })

    it('gives answer for the example', () => {
        expect(powerConsumption(example)).to.equal(198);
    })
    it('gives answer for the part 1', () => {
        expect(powerConsumption(input)).to.equal(738234);
    })

    const gamaRateOf = (lines) => {
        return counts(lines).reduce(
            (acc, curr) => acc += curr['0'] > curr['1'] ? '0' : '1', '')
    } 
    const epsilonRateOf = (lines) => {
        return counts(lines).reduce(
            (acc, curr) => acc += curr['0'] < curr['1'] ? '0' : '1', '')
    } 
    const powerConsumption = (input) => {
        return parseInt(gamaRateOf(input), 2) * parseInt(epsilonRateOf(input), 2);
    }
    const counts = (lines) => {
        return lines.reduce((a, line) => {
            line.split('').forEach((c, i) => a[i][c] ++ )
            return a;
        }, Array(lines[0].length).fill({}).map(() => { return { '0':0, '1':0 } }))
    }

    describe('oxygen generator rating', () => {

        it('keeps entry with the most common digit or 1', () => {
            expect(oxygenGeneratorRatingOf(['11', '01', '00'])).to.equal('01');
        });
        it('works with the example of part 1', () => {
            expect(parseInt(oxygenGeneratorRatingOf(example), 2)).to.equal(23);
        });
    });

    const oxygenGeneratorRatingOf = (lines) => {
        let values = withMost(counts(lines))
        var i =0;
        while (lines.length > 1) {
            lines = lines.filter((line) => line[i] == values[i].most)
            values = withMost(counts(lines))            
            i ++;
        }

        return lines[0]
    }
    const withMost = (counts) => {
        return counts.map((value) => {
            value.most = value['0'] > value['1'] ? '0' : '1';
            return value;
        })
    }
    
    describe('co2 scrubber rating', () => {

        it('works with the example of part 1', () => {
            expect(parseInt(co2ScrubberRatingOf(example), 2)).to.equal(10);
        });
    });

    const co2ScrubberRatingOf = (lines) => {
        let values = withFewer(counts(lines))
        var i =0;
        while (lines.length > 1) {
            lines = lines.filter((line) => line[i] == values[i].fewer)
            values = withFewer(counts(lines))            
            i ++;
        }

        return lines[0]
    }
    const withFewer = (counts) => {
        return counts.map((value) => {
            value.fewer = value['1'] < value['0'] ? '1' : '0';
            return value;
        })
    }

    describe('life support rating', () => {

        it('is correct for the example', () => {
            expect(lifeSupportRating(example)).to.equal(230);
        })

        it('is correct for the puzzle', () => {
            expect(lifeSupportRating(input)).to.equal(3969126);
        })

    });

    const lifeSupportRating = (input) => {
        return parseInt(oxygenGeneratorRatingOf(input), 2) * parseInt(co2ScrubberRatingOf(input), 2);
    }
})
