import { expect } from 'chai';

import { around, east } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';
import { connected } from '../../solution/connected.js';

describe('connected', () => {
    it('can identify one connection east', () => {
        const maze = parse(['S-', '..']);
        const origin = { x: 0, y: 0 };
        const positions = around(origin, maze);
        const candidates = connected(positions, origin, maze);

        expect(candidates).to.deep.equal([
            { id: '1x0', x: 1, y: 0, direction: east },
        ]);
    });
});
