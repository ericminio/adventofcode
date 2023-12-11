import { expect } from 'chai';

import { around, east } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';
import { connected } from '../../solution/connected.js';

describe('connected', () => {
    it('can identify one connection east going straight', () => {
        const maze = parse(['S-', '..']);
        const positions = around({ x: 0, y: 0 }, maze);
        const candidates = connected(positions, maze);

        expect(candidates).to.deep.equal([
            { id: '1x0', x: 1, y: 0, direction: east },
        ]);
    });

    it('can identify one connection east going south', () => {
        const maze = parse(['S7', '..']);
        const positions = around({ x: 0, y: 0 }, maze);
        const candidates = connected(positions, maze);

        expect(candidates).to.deep.equal([
            { id: '1x0', x: 1, y: 0, direction: east },
        ]);
    });

    it('can identify one connection east going north', () => {
        const maze = parse(['SJ', '..']);
        const positions = around({ x: 0, y: 0 }, maze);
        const candidates = connected(positions, maze);

        expect(candidates).to.deep.equal([
            { id: '1x0', x: 1, y: 0, direction: east },
        ]);
    });
});
