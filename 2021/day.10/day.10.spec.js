const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe.only('day 10 challenge', ()=> {

    it('is about corrupted chunks', () => {
        expect(isCorrupted('<>')).to.equal(false);
    })

    describe('corruption', () => {

        it('happens with wrong closing', () => {
            expect(isCorrupted('<)')).to.equal(')');
            expect(isCorrupted('(>')).to.equal('>');
        })
        it('does not happen with expected closing', () => {
            expect(isCorrupted('()')).to.equal(false);
        })
        it('does not happen when sequence is incomplete', () => {
            expect(isCorrupted('(')).to.equal(false);
        })
        it('can happen after one correct chunk', () => {
            expect(isCorrupted('<><)')).to.equal(')');
        })
        it('can happen after two correct chunks', () => {
            expect(isCorrupted('<>()(>')).to.equal('>');
        })
        it('can happen with nested chunks', () => {
            expect(isCorrupted('<(>>')).to.equal('>');
        })
        it('resists digits that are not tags', () => {
            expect(isCorrupted('<(.)>')).to.equal(false);
        })
        it('resists example', () => {
            const example = lines('day.10', 'example.txt');
            const result = example.map(line => isCorrupted(line));

            expect(result).to.deep.equal([false, false, '}', false, ')', ']', false, ')', '>', false])
            
            let score = result.filter(r => r != false).reduce((acc, curr)=> acc += valueOf(curr), 0);
            expect(score).to.equal(26397);
        })
        it('helps to solve part 1', () => {
            const input = lines('day.10', 'input.txt');
            const result = input.map(line => isCorrupted(line));
            let score = result.filter(r => r != false).reduce((acc, curr)=> acc += valueOf(curr), 0);

            expect(score).to.equal(240123);
        })
    })
    const isCorrupted = (line) => {
        let expectedClosing = []
        for (var i=0; i<line.length; i++) {
            let tag = line[i];
            if (isOpening(tag)) {
                expectedClosing.push(closingOf(tag))
            }
            if (isClosing(tag)) {
                let expected = expectedClosing.pop();
                if (tag != expected) { return tag; }
            }
        }
        
        return false;
    }
    const tags = [
        { opening:'<', closing:'>', value:25137 },
        { opening:'(', closing:')', value:3 },
        { opening:'{', closing:'}', value:1197 },
        { opening:'[', closing:']', value:57 },
    ]
    const isClosing = (tag) => {
        return tags.find(t => t.closing == tag)
    }
    const isOpening = (tag) => {
        return tags.find(t => t.opening == tag)
    }
    const closingOf = (tag) => {
        return tags.find(t => t.opening == tag).closing
    }
    const valueOf = (tag) => {
        return tags.find(t => t.closing == tag).value
    }
    

})
