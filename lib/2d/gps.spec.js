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
            123
        `);
        let request = {
            origin: '0x1',
            target: '0x2'
        };
        let path = gps(request, map);
        
        expect(path).to.deep.equal({ total:5, nodes:[ 
            { id:'0x1', value:2 }, 
            { id:'0x2', value:3 } 
        ]})
    });
});

const gps = (request, map) => {
    let origin = map[request.origin];
    let target = map[request.target];
    
    let graph = {};
    graph[origin.id] = origin;
    graph[origin.id].parent = null;
    
    let heads = [graph[origin.id]];

    search(origin, target, map, graph, heads);
    
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

const search = (origin, target, map, graph, heads) => {
    if (origin == target) { return }
    if (allOn(target, heads)) { return }

    graph[target.id] = target;
    graph[target.id].parent = graph[origin.id];
    
    heads.unshift(graph[target.id]);
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