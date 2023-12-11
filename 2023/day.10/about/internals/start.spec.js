import { expect } from 'chai';

import { start } from '../../solution/start.js';

describe('start', () => {
    it('is exposed', () => {
        const maze = {
            '0x0': { x: 0, y: 0, value: '.' },
            '1x0': { x: 1, y: 0, value: 'S' },
            '0x1': { x: 0, y: 1, value: '.' },
            '1x1': { x: 1, y: 1, value: '.' },
        };
        expect(start(maze)).to.deep.equal({ x: 1, y: 0, value: 'S' });
    });
});
