const { expect } = require('chai');
const { load } = require('./loading');

describe.only('gps', () => {

    it('knows you are already there', () => {
        let map = load(`
            123
            456
        `);
        let request = {
            origin: '0x2',
            target: '0x2'
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ total:3, nodes:[ { id:'0x2', value:3 } ]})
    });

    it('can find the location next door', () => {
        let map = load(`
            12
        `);
        let request = {
            origin: '0x0',
            target: '0x1'
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ total:3, nodes:[ 
            { id:'0x0', value:1 }, 
            { id:'0x1', value:2 } 
        ]})
    });
});

const gps = (request, map) => {
    let origin = map[request.origin];
    let target = map[request.target];
    
    let graph = {};
    graph[origin.id] = {
        id: origin.id,
        value: origin.value,
        parent:null
    };
    
    let heads = [graph[origin.id]];

    heads = search(target, map, graph, heads);
    
    let head = heads[0];
    let total = 0;
    let nodes = [];
    let current = head;
    while (current !== null) {
        nodes.unshift({ id:current.id, value:current.value });
        total += current.value;
        current = current.parent;
    }

    return { total, nodes };
};

const search = (target, map, graph, heads) => {
    if (allOn(target, heads)) { return heads; }
    
    return nextHeads(heads, map);
};

const nextHeads = (heads, map) => {
    let nextHeads = [];
    for (var i = 0; i < heads.length; i++) {
        let head = heads[i];
        let neighbourIds = map[head.id].neighbours;
        for (var j = 0; j < neighbourIds.length; j++) {
            let id = neighbourIds[j];
            let point = map[id];            
            let nextHead = {
                id: point.id,
                value: point.value,
                parent: head
            };
            nextHeads.push(nextHead);
        }
    }
    return nextHeads;
};

const allOn = (location, candidates) => {
    let yep = true;
    for (var i = 0; i < candidates.length; i++) {
        if (candidates[i].id !== location.id) {
            yep = false;
            break;
        }
    }
    return yep;
}