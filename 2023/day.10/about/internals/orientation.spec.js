import { expect } from 'chai';

import { looper } from '../../solution/looper.js';
import { orientation } from '../../solution/orientation.js';
import { lines, raw } from '../../../../support/index.js';

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

    it('can be found for first example', () => {
        const incoming = lines(new URL('../example1-0.txt', import.meta.url));
        const loop = looper(incoming);

        expect(orientation(loop)).to.equal('right');
    });

    it('can be found for second example', () => {
        const incoming = lines(new URL('../example-3.txt', import.meta.url));
        const loop = looper(incoming);

        expect(orientation(loop)).to.equal('right');
    });

    it('can be found for third example', () => {
        const incoming = lines(new URL('../example-4.txt', import.meta.url));
        const loop = looper(incoming);

        expect(orientation(loop)).to.equal('right');
    });

    it('can be found for fourth example', () => {
        const incoming = lines(new URL('../example-5.txt', import.meta.url));
        const loop = looper(incoming);

        expect(orientation(loop)).to.equal('right');
    });
});
