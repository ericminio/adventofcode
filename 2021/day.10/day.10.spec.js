const { expect } = require('chai')

describe('day 10 challenge', ()=> {

    it('is about corrupted chunks', () => {
        expect(isCorrupted('<>')).to.equal(false);
    })

    describe('corruption', () => {

        it('happens with wrong closing', () => {
            expect(isCorrupted('<)')).to.equal(true);
        })
    })

    const isCorrupted = (line) => {
        if (line[1] != '>') {
            return true;
        }
        return false;
    }
    
})
