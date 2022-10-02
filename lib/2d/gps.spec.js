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

        let map;
        let request;
        let heads;
        let target;
        beforeEach(() => {
            map = load(this.title);
            request = {
                origin: { id:'0x2' },
                target: { id:'1x2' }
            };

            let origin = map[request.origin.id];
            let root = node(origin, { parent: null });
            heads = {};
            heads[root.id] = root;
            target = map[request.target.id];
        });

        it.skip('finds expected path', () => {
            let path = gps(request, map);
            
            expect(path).to.deep.equal({ nodes:[ 
                { id:'0x2', value:0, total:0 },
                { id:'1x2', value:1, total:1 } 
            ]});
        });

        it('explores as expected heads +1', () => {
            let nexts = nextHeads(heads, map, target);

            expect(Object.keys(nexts)).to.deep.equal(['1x2', '0x1']);
        });
        it('explores as expected heads +2', () => {
            let nexts = nextHeads(heads, map, target);
            nexts = nextHeads(nexts, map, target);

            expect(Object.keys(nexts)).to.deep.equal(['1x2', '1x1', '0x0']);
        });
        it('explores as expected heads +3', () => {
            let nexts = nextHeads(heads, map, target);
            nexts = nextHeads(nexts, map, target);
            nexts = nextHeads(nexts, map, target);

            expect(Object.keys(nexts)).to.deep.equal(['1x2', '1x0']);
        });
    });    
});

const gps = (request, map) => {
    let origin = map[request.origin.id];
    let root = node(origin, { parent: null });
    let heads = {};
    heads[root.id] = root;
    let target = map[request.target.id];
    let destination = search(target, map, heads);
    
    return path(destination);
};

const path = (destination) => {
    let nodes = [];
    let current = destination;
    while (current !== null) {
        nodes.unshift({ id:current.id, value:current.value, total:current.total });
        current = current.parent;
    }

    return { nodes };
};

const search = (target, map, heads) => {
    if (arrivedOn(target, heads)) { return Object.values(heads)[0]; }
    
    return search(target, map, nextHeads(heads, map, target));
};

const nextHeads = (heads, map, target) => {
    let nextHeads = {};
    Object.values(heads).forEach(head => {
        if (head.id == target.id) {
            nextHeads[head.id] = head;
            return;
        }
        let nexts = map[head.id].neighbours.map(id => node(map[id], { parent: head }));
        nexts.forEach(nextHead => {
            if (isGoingBack(nextHead, head)) {
                return;
            }
            if (nextHeads[nextHead.id] !== undefined && nextHeads[nextHead.id].total < nextHead.total ) {
                return;
            }
            nextHeads[nextHead.id] = nextHead;
        });
    });
    return nextHeads;
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