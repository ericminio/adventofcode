import { expect } from 'chai';

import { lines } from '../../../../support/index.js';
import { looper } from '../../solution/looper.js';

describe('looper', () => {
    const incoming = lines(new URL('../example1-0.txt', import.meta.url));
    const loop = looper(incoming);

    it('parses start', () => {
        expect(loop['1x1']).to.deep.equal({
            id: '1x1',
            x: 1,
            y: 1,
            value: 'S',
            previous: '1x2',
            next: '2x1',
        });
    });

    it('parses the first step', () => {
        expect(loop['2x1']).to.deep.equal({
            id: '2x1',
            x: 2,
            y: 1,
            value: '-',
            previous: '1x1',
            next: '3x1',
        });
    });

    it('parses the last step', () => {
        expect(loop['1x2']).to.deep.equal({
            id: '1x2',
            x: 1,
            y: 2,
            value: '|',
            previous: '1x3',
            next: '1x1',
        });
    });
});
