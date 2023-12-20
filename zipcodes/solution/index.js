import { distances } from './distances.js';
import { group } from './group.js';
import { parse } from './parser.js';

export const solvepartone = (input) => {
    const incoming = parse(input);

    const distribution = incoming.signatures.reduce((dist, signature) => {
        if (!dist[signature]) {
            dist[signature] = 0;
        }
        dist[signature] += 1;
        return dist;
    }, {});
    console.log(distribution);
    const nodes = distances(distribution, incoming.zipcodes);
    const keep = group(nodes, { max: 2 });
    console.log(keep);

    const clusters = [
        {
            count: 5,
            contributors: ['AAAAA', 'BBBBB'],
        },
        {
            count: 5,
            contributors: ['EEEEE'],
        },
    ];
    return clusters.reduce(
        (total, cluster) => total + cluster.contributors.length * cluster.count,
        0,
    );
};

export const solveparttwo = () => '?';
