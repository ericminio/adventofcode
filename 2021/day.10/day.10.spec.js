const { expect } = require('chai')

describe.only('day 10 challenge', ()=> {

    it('is about corrupted chunks', () => {
        expect(isCorrupted('<>')).to.equal(false);
    })

    describe('corruption', () => {

        it('happens with wrong closing', () => {
            expect(isCorrupted('<)')).to.equal(true);
        })
        it('does not happen with expected closing', () => {
            expect(isCorrupted('()')).to.equal(false);
        })
    })
    const isCorrupted = (line) => {
        let expectedClosing = []
        if (isOpening(line[0])) {
            expectedClosing.push(closingOf(line[0]))
        }
        
        if (isClosing(line[1])) {
            return line[1] != expectedClosing[0];
        }
        return false;
    }
    const isClosing = (tag) => {
        return tag == '>' || tag == ')'
    }
    const isOpening = (tag) => {
        return tag == '<' || tag == '('
    }
    const closingOf = (tag) => {
        if (tag == '<') return '>';
        if (tag == '(') return ')';
        throw new Error('unknown tag ' + tag);
    }
    
})
