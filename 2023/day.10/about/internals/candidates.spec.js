import { expect } from 'chai';

import { looper } from '../../solution/looper.js';
import { raw } from '../../../../support/index.js';
import { candidates } from '../../solution/candidates.js';

describe('inside loop candidates', () => {
    it('can be a single point', () => {
        const loop = looper(
            raw(`
                S-7
                |.|
                L-J
            `),
        );
        expect(candidates(loop)).to.deep.equal({
            '1x1': { x: 1, y: 1, borders: ['0x1', '2x1', '1x0', '1x2'] },
        });
    });
    it('dont include obviously outside points', () => {
        const loop = looper(
            raw(`
                S--7
                |F-J
                |L7.
                |.|.
                L-J.
            `),
        );
        expect(candidates(loop)).to.deep.equal({
            '1x3': { x: 1, y: 3, borders: ['0x3', '2x3', '1x2', '1x4'] },
        });
    });
});
