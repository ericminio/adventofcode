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
            
            let score = result.filter(r => r != false).reduce((acc, curr)=> acc += syntaxErrorValueOf(curr), 0);
            expect(score).to.equal(26397);
        })
        it('helps to solve part 1', () => {
            const input = lines('day.10', 'input.txt');
            const result = input.map(line => isCorrupted(line));
            let score = result.filter(r => r != false).reduce((acc, curr)=> acc += syntaxErrorValueOf(curr), 0);

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
        { opening:'<', closing:'>', syntaxErrorValue:25137, completionValue:4 },
        { opening:'(', closing:')', syntaxErrorValue:3,     completionValue:1 },
        { opening:'{', closing:'}', syntaxErrorValue:1197,  completionValue:3 },
        { opening:'[', closing:']', syntaxErrorValue:57,    completionValue:2 },
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
    const syntaxErrorValueOf = (tag) => {
        return tags.find(t => t.closing == tag).syntaxErrorValue
    }
    const completionValueOf = (tag) => {
        return tags.find(t => t.closing == tag).completionValue
    }
    
    describe('part 2', () => {

        it('is about completing the incomplete chunks', () => {
            expect(autocomplete('[({(<(())[]>[[{[]{<()<>>')).to.equal('}}]])})]');
        })

        const autocomplete = (line) => {
            let expectedClosing = []
            for (var i=0; i<line.length; i++) {
                let tag = line[i];
                if (isOpening(tag)) {
                    expectedClosing.push(closingOf(tag))
                }
                if (isClosing(tag)) {
                    expectedClosing.pop();
                }
            }
            
            return expectedClosing.reverse().join('') 
        }

        it('has an example', () => {
            const example = lines('day.10', 'example.txt');
            const result = example.filter(line => !isCorrupted(line)).map(line => autocomplete(line));

            expect(result).to.deep.equal(['}}]])})]', ')}>]})', '}}>}>))))', ']]}}]}]}>', '])}>'])

            const scores = result.map(completion => completion.split('').reduce(
                (acc, curr) =>  acc*5 + completionValueOf(curr), 0))
            expect(scores).to.deep.equal([288957, 5566, 1480781, 995444, 294])
            
            scores.sort((a,b) => b-a);
            expect(scores).to.deep.equal([1480781, 995444, 288957, 5566, 294])

            expect(scores[(scores.length-1)/2]).to.equal(288957)

            expect(solution(example)).to.equal(288957)
        })

        const solution = (lines) => {
            const result = lines.filter(line => !isCorrupted(line)).map(line => autocomplete(line));

            const scores = result.map(completion => completion.split('').reduce(
                (acc, curr) =>  acc*5 + completionValueOf(curr), 0))
            
            scores.sort((a,b) => b-a);
            
            return scores[(scores.length-1)/2]
        }

        it('is now solved', () => {
            const input = lines('day.10', 'input.txt');
            expect(solution(input)).to.equal(3260812321)
        })        
    })
})
