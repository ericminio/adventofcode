import { expect } from 'chai';

import { around, east, north, south, west } from '../../solution/around.js';
import { parse } from '../../solution/parser.js';
import { connected } from '../../solution/connected.js';

describe('connected', () => {
    describe('east', () => {
        const origin = { x: 0, y: 0, id: '0x0' };

        it('is not a connection by default', () => {
            const maze = parse(['S.']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection east going straight', () => {
            const maze = parse(['S-']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });

        it('can identify one connection east going south', () => {
            const maze = parse(['S7']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });

        it('can identify one connection east going north', () => {
            const maze = parse(['SJ']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '1x0', x: 1, y: 0, direction: east },
            ]);
        });

        it('is not a connected east when origin leads elsewhere', () => {
            const maze = parse(['|J']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([]);
        });
    });

    describe('west', () => {
        const origin = { x: 1, y: 0, id: '1x0' };

        it('is not a connection by default', () => {
            const maze = parse(['.S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection west going straight', () => {
            const maze = parse(['-S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });

        it('can identify one connection west going south', () => {
            const maze = parse(['FS']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });

        it('can identify one connection west going north', () => {
            const maze = parse(['LS']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: west },
            ]);
        });
    });

    describe('south', () => {
        const origin = { x: 0, y: 0, id: '0x0' };

        it('is not a connection by default', () => {
            const maze = parse(['S', '.']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection south going straight', () => {
            const maze = parse(['S', '|']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x1', x: 0, y: 1, direction: south },
            ]);
        });

        it('can identify one connection south going east', () => {
            const maze = parse(['S', 'L']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x1', x: 0, y: 1, direction: south },
            ]);
        });

        it('can identify one connection south going west', () => {
            const maze = parse(['S', 'J']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x1', x: 0, y: 1, direction: south },
            ]);
        });
    });

    describe('north', () => {
        const origin = { x: 0, y: 1, id: '0x1' };

        it('is not a connection by default', () => {
            const maze = parse(['.', 'S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([]);
        });

        it('can identify one connection north going straight', () => {
            const maze = parse(['|', 'S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: north },
            ]);
        });

        it('can identify one connection north going east', () => {
            const maze = parse(['F', 'S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: north },
            ]);
        });

        it('can identify one connection north going west', () => {
            const maze = parse(['7', 'S']);
            const positions = around(origin, maze);
            const candidates = connected(positions, origin, maze);

            expect(candidates).to.deep.equal([
                { id: '0x0', x: 0, y: 0, direction: north },
            ]);
        });
    });
});
