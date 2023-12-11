import { expect } from 'chai';

import { around, east, west } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';
import { connected } from '../../solution/connected.js';

describe('connected', () => {
    describe('east', () => {
        it('is not a connection by default', () => {
            const maze = parse(['S.']);
            const positions = around({ x: 0, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection east going straight', () => {
            const maze = parse(['S-']);
            const positions = around({ x: 0, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });

        it('can identify one connection east going south', () => {
            const maze = parse(['S7']);
            const positions = around({ x: 0, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });

        it('can identify one connection east going north', () => {
            const maze = parse(['SJ']);
            const positions = around({ x: 0, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });
    });

    describe('west', () => {
        it('is not a connection by default', () => {
            const maze = parse(['.S']);
            const positions = around({ x: 1, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection west going straight', () => {
            const maze = parse(['-S']);
            const positions = around({ x: 1, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });

        it('can identify one connection west going south', () => {
            const maze = parse(['FS']);
            const positions = around({ x: 1, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });

        it('can identify one connection west going north', () => {
            const maze = parse(['LS']);
            const positions = around({ x: 1, y: 0 }, maze);
            const candidates = connected(positions, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });
    });
});
