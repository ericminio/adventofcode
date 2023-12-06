import { expect } from 'chai';

import { isPartNumber } from '../../solution/isPartNumber.js';

describe('isPartNumber', () => {
    describe('when number is in the middle of the field', () => {
        it('is a part number when touching a symbol', () => {
            const candidate = {
                number: 7,
                lineIndex: 1,
                startIndex: 1,
                endIndex: 2,
            };
            const lines = ['...', '.7.', '..#'];

            expect(isPartNumber(candidate, lines)).to.equal(true);
        });

        it('is not a part number when far from any symbol', () => {
            const candidate = {
                number: 7,
                lineIndex: 1,
                startIndex: 1,
                endIndex: 2,
            };
            const lines = ['...', '.7.', '...'];

            expect(isPartNumber(candidate, lines)).to.equal(false);
        });
    });

    describe('when number is starting the field', () => {
        it('is a part number when touching a symbol', () => {
            const candidate = {
                number: 467,
                lineIndex: 0,
                startIndex: 0,
                endIndex: 2,
            };
            const lines = ['467.', '...*'];

            expect(isPartNumber(candidate, lines)).to.equal(true);
        });

        it('is not a part number when far from any symbol', () => {
            const candidate = {
                number: 467,
                lineIndex: 0,
                startIndex: 0,
                endIndex: 2,
            };
            const lines = ['467.', '....'];

            expect(isPartNumber(candidate, lines)).to.equal(false);
        });
    });
});
