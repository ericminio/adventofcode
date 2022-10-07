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
            if (graph[request.target.id] !== undefined && graph[request.target.id].total < nextHead.total) {
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

module.exports = { init, gps, nextGeneration };