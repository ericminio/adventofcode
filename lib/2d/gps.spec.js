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

    it.skip('keeps the shortest path', () => {
        let map = load(`
            01
            00
        `);
        let request = {
            origin: { id:'0x0' },
            target: { id:'1x1' }
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ total:0, nodes:[ 
            { id:'0x0', value:0, total:0 }, 
            { id:'1x0', value:0, total:0 },
            { id:'1x1', value:0, total:0 } 
        ]});
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
    if (arrivedOn(target, heads)) { return heads[Object.keys(heads)[0]]; }
    
    return search(target, map, nextHeads(heads, map));
};

const nextHeads = (heads, map) => {
    let nextHeads = {};
    Object.values(heads).forEach(head => {
        let neighbourIds = map[head.id].neighbours;
        for (var j = 0; j < neighbourIds.length; j++) {
            let id = neighbourIds[j];
            let point = map[id];            
            let nextHead = node(point, { parent: head });
            if (! isGoingBack(id, head)) {
                nextHeads[nextHead.id] = nextHead;
            }
        }
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

const isGoingBack = (id, head) => {
    return head.parent !== null && id === head.parent.id;
};

const arrivedOn = (location, candidates) => {
    let keys = Object.keys(candidates);
    if (keys.length > 1) { return false; }
    let yep = true;
    for (var i = 0; i < keys.length; i++) {
        let candidate = candidates[keys[0]]
        if (candidate.id !== location.id) {
            yep = false;
            break;
        }
    }
    return yep;
}