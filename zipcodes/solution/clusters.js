import { distances } from './distances.js';
import { group } from './group.js';

export const clusters = (
    { zipcodes, signatures },
    { maxDistanceToBeInCluster, minSignaturePercentageToBeACluster },
) => {
    const distribution = signatures.reduce((dist, signature) => {
        if (!dist[signature]) {
            dist[signature] = 0;
        }
        dist[signature] += 1;
        return dist;
    }, {});
    const nodes = distances(distribution, zipcodes);
    const groups = group(nodes, { maxDistanceToBeInCluster });

    const counts = groups.map((g) => {
        return {
            count: g.reduce((total, z) => total + distribution[z], 0),
            contributors: g,
        };
    });

    return counts.filter(
        (e) =>
            e.count >= minSignaturePercentageToBeACluster * signatures.length,
    );
};
