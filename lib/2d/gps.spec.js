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
});

const gps = (request, map) => {
    let origin = map[request.origin];
    
    let graph = {};
    graph[origin.id] = origin;
    graph[origin.id].parent = null;
    
    let heads = [graph[origin.id]];
    
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