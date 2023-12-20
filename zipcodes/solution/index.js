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
    const nodes = distances(distribution, incoming.zipcodes);
    const groups = group(nodes, { max: 2 });

    const counts = groups.map((g) => {
        return {
            count: g.reduce((total, z) => total + distribution[z], 0),
            contributors: g,
        };
    });

    const clusters = counts.filter(
        (e) => e.count >= 0.2 * incoming.signatures.length,
    );
    return clusters;
};

export const solveparttwo = () => '?';
