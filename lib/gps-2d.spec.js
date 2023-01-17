const { expect } = require('chai');
const { load } = require('./2d/loading');
const { init, gps, nextGeneration } = require('./gps');

describe('gps - 2d', () => {

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
        let map = load(`
            12
        `);
        let request = {
            origin: { id: '0x0' },
            target: { id: '0x1' }
        };
        let path = gps(request, map);

        expect(path).to.deep.equal({
            nodes: [
                { id: '0x0', value: 1, total: 1 },
                { id: '0x1', value: 2, total: 3 }
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
