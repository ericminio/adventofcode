const { expect } = require('chai');
const { load } = require('./loading');

describe.only('gps', () => {

    it('knows you are already there', () => {
        let map = load(`
            123
            456
        `);
        let request = {
            origin: { id:'0x2' },
            target: { id:'0x2' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ nodes:[ { id:'0x2', value:3, total:3 } ]})
    });

    it('can find the location next door', () => {
        let map = load(`
            12
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'0x1' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ nodes:[ 
            { id:'0x0', value:1, total:1 }, 
            { id:'0x1', value:2, total:3 } 
        ]})
    });

    it('can find the location 2 doors away', () => {
        let map = load(`
            123
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'0x2' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ nodes:[ 
            { id:'0x0', value:1, total:1 }, 
            { id:'0x1', value:2, total:3 },
            { id:'0x2', value:3, total:6 } 
        ]});
    });

    it('keeps the shortest path', () => {
        let map = load(`
            00
            10
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'1x1' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ nodes:[ 
            { id:'0x0', value:0, total:0 }, 
            { id:'0x1', value:0, total:0 },
            { id:'1x1', value:0, total:0 } 
        ]});
    });

    it('head stops on target and wait for other paths', () => {
        let map = load(`
            00
            10
        `);
        let request = {
            origin: { id:'0x1' },
            target: { id:'1x1' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ nodes:[ 
            { id:'0x1', value:0, total:0 },
            { id:'1x1', value:0, total:0 } 
        ]});
    });

    describe(`
        000
        001
    `, function() {

        let map, request;
        beforeEach(() => {
            map = load(this.title);
            request = {
                origin: { id:'0x2' },
                target: { id:'1x2' }
            };
        });

        it('finds expected path', () => {
            let path = gps(request, map);
            
            expect(path).to.deep.equal({ nodes:[ 
                { id:'0x2', value:0, total:0 },
                { id:'1x2', value:1, total:1 } 
            ]});
        });

        describe('internals', () => {
            
            let graph;
            beforeEach(() => {
                graph = init(request, map);
            });
    
            it('explores as expected heads +1', () => {
                let next = generationN(1, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['1x2', '0x1']);
            });
            it('explores as expected heads +2', () => {
                let next = generationN(2, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['1x2', '1x1', '0x0']);
            });
            it('explores as expected heads +3', () => {
                let next = generationN(3, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['1x2', '1x0']);
            });
            it('stops after heads +4', () => {
                let next = generationN(4, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['1x2']);
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
                origin: { id:'0x0' },
                target: { id:'2x0' }
            };
        });

        it('finds expected path', () => {
            let path = gps(request, map);
            
            expect(path).to.deep.equal({ nodes:[ 
                { id:'0x0', value:0, total:0 }, 
                { id:'0x1', value:0, total:0 },
                { id:'1x1', value:0, total:0 },
                { id:'2x1', value:0, total:0 },
                { id:'2x0', value:0, total:0 },
            ]});
        });

        describe('internals', () => {
            
            let graph;
            beforeEach(() => {
                graph = init(request, map);
            });
            
            it('explores as expected heads +1', () => {
                let next = generationN(1, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['0x1', '1x0']);
            });
            it('explores as expected heads +2', () => {
                let next = generationN(2, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['1x1', '2x0']);
                expect(next.heads['1x1'].parent.id).to.equal('0x1');
            });
            it('explores as expected heads +3', () => {
                let next = generationN(3, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['2x1', '2x0']);
                expect(next.heads['2x0'].parent.id).to.equal('1x0');
                expect(next.heads['2x0'].total).to.equal(1);
                expect(next.heads['2x1'].parent.id).to.equal('1x1');
                expect(next.heads['2x1'].total).to.equal(0);
            });
            it('explores as expected heads +4', () => {
                let next = generationN(4, graph, map, request);
    
                expect(Object.keys(next.heads)).to.deep.equal(['2x0']);
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
    }
    
    it('can explore 2021.15 example', () => {
        let map = load(`
            1163751742
            1381373672
            2136511328
            3694931569
            7463417111
            1319128137
            1359912421
            3125421639
            1293138521
            2311944581
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'9x9' }
        };
        let path = gps(request, map);
        
        expect(path.nodes[path.nodes.length - 1].total).to.equal(41);
    });

    it.skip('can explore 2021.15 part 1', () => {
        const { line } = require('../../2021/puzzle.input')
        let map = load(line('day.15'));
        
        expect(map['0x0'].value).to.equal(9);
    });
});

const gps = (request, map) => {
    let graph = init(request, map);
    let destination = search(request, map, graph);
    
    return path(destination);
};

const search = (request, map, graph) => {
    if (arrivedOn(request.target, graph.heads)) { return Object.values(graph.heads)[0]; }
    
    return search(request, map, nextGeneration(graph, map, request));
};

const nextGeneration = (graph, map, request) => {
    let nextHeads = {};
    Object.values(graph.heads).forEach(head => {
        let nexts = head.id == request.target.id
                    ? [head] 
                    : map[head.id].neighbours.map(id => node(map[id], { parent: head }));        
        nexts.forEach(nextHead => {
            if (isGoingBack(nextHead, head)) {
                return;
            }
            if (graph[nextHead.id] === undefined || nextHead.total < graph[nextHead.id].total) {
                nextHeads[nextHead.id] = nextHead;
                graph[nextHead.id] = nextHead;
                return;
            }
            if (nextHead.id == request.target.id && nextHeads[nextHead.id] == undefined) {
                nextHeads[nextHead.id] = nextHead;
            }
        });
    });
    graph.heads = nextHeads;
    return graph;
};

const init = (request, map) => {
    let origin = map[request.origin.id];
    let root = node(origin, { parent: null });
    let heads = {};
    heads[root.id] = root;
    let graph = {};
    graph.heads = heads;
    graph[root.id] = root;

    return graph;
}

const path = (destination) => {
    let nodes = [];
    let current = destination;
    while (current !== null) {
        nodes.unshift({ id:current.id, value:current.value, total:current.total });
        current = current.parent;
    }

    return { nodes };
};

const node = (point, upstream) => {
    let next = {
        id: point.id,
        value: point.value,
        total : point.value,
        ...upstream
    };
    if (upstream.parent !== null) {
        next.total = upstream.parent.total + point.value;
    }
    return next;
}

const isGoingBack = (neighbour, head) => {
    return head.parent !== null && neighbour.id === head.parent.id;
};

const arrivedOn = (location, candidates) => {
    let values = Object.values(candidates);
    if (values.length > 1) { return false; }
    
    return values[0].id === location.id;
}