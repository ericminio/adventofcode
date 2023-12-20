import { distances } from './distances.js';
import { signatureCountByZipcode } from './signatures.js';

export const clusters = (
    { zipcodes, signatures },
    { maxDistanceToBeInCluster, minSignaturePercentageToBeACluster },
) => {
    const distribution = signatureCountByZipcode(signatures);
    const nodes = distances(distribution, zipcodes);
    const spies = Object.keys(distribution).reduce((reduced, z) => {
        reduced[z] = {
            zipcode: z,
            count: distribution[z],
            used: false,
        };
        return reduced;
    }, {});

    const cs = [];
    Object.keys(spies).forEach((zipcode) => {
        const used = spies[zipcode].used;
        if (!used) {
            spies[zipcode].used = true;
            const c = [zipcode];
            const ds = nodes[zipcode];
            const around = Object.keys(ds).filter(
                (b) => ds[b] <= maxDistanceToBeInCluster && !spies[b].used,
            );
            around.forEach((b) => {
                spies[b].used = true;
                c.push(b);
            });
            cs.push(c);
        }
    });

    const counts = cs.map((g) => {
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
