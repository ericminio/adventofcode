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
    // console.log(distribution);
    const nodes = distances(distribution, incoming.zipcodes);
    const groups = group(nodes, { max: 2 });
    // console.log(groups);

    const counts = groups.map((g) => {
        return {
            count: g.reduce((total, z) => total + distribution[z], 0),
            contributors: g,
        };
    });
    // console.log(counts);

    const clusters = counts.filter(
        (e) => e.count >= 0.2 * incoming.signatures.length,
    );
    return clusters.reduce(
        (total, cluster) => total + cluster.contributors.length * cluster.count,
        0,
    );
};

export const solveparttwo = () => '?';
