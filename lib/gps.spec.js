const { expect } = require('chai');
const { load } = require('./2d/loading');
const { init, gps, nextGeneration, matching } = require('./gps');

describe.only('gps', () => {

    it('knows you are already there', () => {
        let map = load(`
            123
            456
        `);
        let request = {
            origin: { id: '0x2' },
            target: { id: '0x2' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({ nodes: [ { id: '0x2', value: 3, total: 3 } ] });
    });

    it('can find the location next door', () => {
        let map = {
            '0x0x0': { id: '0x0x0', value: 1, neighbours: [ '0x1x0' ] },
            '0x1x0': { id: '0x1x0', value: 1, neighbours: [ '0x0x0', '0x1x1' ] },
            '0x1x1': { id: '0x1x1', value: 1, neighbours: [ '0x1x0' ] },
        };
        let request = {
            origin: { id: '0x0x0' },
            target: { id: '0x1x1' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x0x0', value: 1, total: 1 },
                { id: '0x1x0', value: 1, total: 2 },
                { id: '0x1x1', value: 1, total: 3 },
            ]
        });
    });

    it('can find the location 2 doors away', () => {
        let map = load(`
            123
        `);
        let request = {
            origin: { id: '0x0' },
            target: { id: '0x2' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x0', value: 1, total: 1 },
                { id: '0x1', value: 2, total: 3 },
                { id: '0x2', value: 3, total: 6 }
            ]
        });
    });

    it('keeps the shortest path', () => {
        let map = load(`
            00
            10
        `);
        let request = {
            origin: { id: '0x0' },
            target: { id: '1x1' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x0', value: 0, total: 0 },
                { id: '0x1', value: 0, total: 0 },
                { id: '1x1', value: 0, total: 0 }
            ]
        });
    });

    it('head stops on target and wait for other paths', () => {
        let map = load(`
            00
            10
        `);
        let request = {
            origin: { id: '0x1' },
            target: { id: '1x1' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x1', value: 0, total: 0 },
                { id: '1x1', value: 0, total: 0 }
            ]
        });
    });

    it('reports when target is not reachable', () => {
        let map = {
            '0x0': { id: '0x0', value: 1, neighbours: [ '0x1' ] },
            '0x1': { id: '0x1', value: 1, neighbours: [ '0x0' ] },
            '0x5': { id: '0x5', value: 1, neighbours: [ ] },
        };
        let request = {
            origin: { id: '0x0' },
            target: { id: '0x5' }
        };
        try {
            gps(request, map);
            throw new Error('should have failed');
        }
        catch (error) {
            expect(error.message).to.equal('target not reachable');
        }
    });

    it.skip('offers a stop-at-first-match', () => {
        let map = load(`
            00
            10
        `);
        let request = {
            origin: { id: '0x1' },
            target: { id: '1x1' }
        };
        let { path, heads } = matching(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x1', value: 0, total: 0 },
                { id: '1x1', value: 0, total: 0 }
            ]
        });
        expect(Object.keys(heads)).to.deep.equal([ '1x1' ]);
    });

    describe(`
        000
        001
    `, function() {

        let map, request;
        beforeEach(() => {
            map = load(this.title);
            request = {
                origin: { id: '0x2' },
                target: { id: '1x2' }
            };
        });

        it('finds expected path', () => {
            let path = gps(request, map);

            expect(path).to.deep.equal({
                nodes: [
                    { id: '0x2', value: 0, total: 0 },
                    { id: '1x2', value: 1, total: 1 }
                ]
            });
        });

        describe('internals', () => {

            let graph;
            beforeEach(() => {
                graph = init(request, map);
            });

            it('explores as expected heads +1', () => {
                let next = generationN(1, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '1x2', '0x1' ]);
            });
            it('explores as expected heads +2', () => {
                let next = generationN(2, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '1x2', '1x1', '0x0' ]);
            });
            it('explores as expected heads +3', () => {
                let next = generationN(3, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '1x2', '1x0' ]);
            });
            it('stops after heads +4', () => {
                let next = generationN(4, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '1x2' ]);
            });
        });
    });

    describe(`
        00
        10
        00
    `, function() {

        let map, request;
        beforeEach(() => {
            map = load(this.title);
            request = {
                origin: { id: '0x0' },
                target: { id: '2x0' }
            };
        });

        it('finds expected path', () => {
            let path = gps(request, map);

            expect(path).to.deep.equal({
                nodes: [
                    { id: '0x0', value: 0, total: 0 },
                    { id: '0x1', value: 0, total: 0 },
                    { id: '1x1', value: 0, total: 0 },
                    { id: '2x1', value: 0, total: 0 },
                    { id: '2x0', value: 0, total: 0 },
                ]
            });
        });

        describe('internals', () => {

            let graph;
            beforeEach(() => {
                graph = init(request, map);
            });

            it('explores as expected heads +1', () => {
                let next = generationN(1, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '0x1', '1x0' ]);
            });
            it('explores as expected heads +2', () => {
                let next = generationN(2, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '1x1', '2x0' ]);
                expect(next.heads['1x1'].parent.id).to.equal('0x1');
            });
            it('explores as expected heads +3', () => {
                let next = generationN(3, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '2x1', '2x0' ]);
                expect(next.heads['2x0'].parent.id).to.equal('1x0');
                expect(next.heads['2x0'].total).to.equal(1);
                expect(next.heads['2x1'].parent.id).to.equal('1x1');
                expect(next.heads['2x1'].total).to.equal(0);
            });
            it('explores as expected heads +4', () => {
                let next = generationN(4, graph, map, request);

                expect(Object.keys(next.heads)).to.deep.equal([ '2x0' ]);
                expect(next.heads['2x0'].total).to.equal(0);
            });
        });
    });

    const generationN = (n, graph, map, request) => {
        let next = graph;
        for (var i = 0; i < n; i++) {
            next = nextGeneration(next, map, request);
        }
        return next;
    };
});
