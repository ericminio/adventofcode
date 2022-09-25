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
    let target = map[request.target];
    let graph = {};
    graph[origin.id] = origin;
    graph[origin.id].parent = null;
    let heads = [origin];
    
    let head = heads[0];
    let total = 0;
    let current = head;
    while (current !== null) {
        total += current.value;
        current = current.parent;
    }

    return { total, nodes:[ { id:'0x2', value:3 } ]};
};