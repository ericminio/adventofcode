import { expect } from 'chai';

import { looper } from '../../solution/looper.js';
import { orientation } from '../../solution/orientation.js';
import { raw } from '../../../../support/index.js';

describe('orientation', () => {
    it('can be right', () => {
        const loop = looper(
            raw(`
                S-7
                L-J
            `),
        );
        expect(orientation(loop)).to.equal('right');
    });

    it('can be left', () => {
        const loop = looper(
            raw(`
                F-7
                S-J
            `),
        );
        expect(orientation(loop)).to.equal('left');
    });
});
