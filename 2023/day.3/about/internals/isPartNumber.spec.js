import { expect } from 'chai';

import { isPartNumber } from '../../solution/isPartNumber.js';

describe.only('isPartNumber', () => {
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
});
