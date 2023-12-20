import { distances } from './distances.js';
import { signatureCountByZipcode } from './signatures.js';

export const clusters = (
    { zipcodes, signatures },
    { maxDistanceToBeInCluster, minSignaturePercentageToBeACluster },
) => {
    const signatureCounts = signatureCountByZipcode(signatures);
    const zipcodeDistances = distances(signatureCounts, zipcodes);
    const spies = {};
    const cs = [];
    Object.keys(signatureCounts).forEach((zipcode) => {
        const used = spies[zipcode];
        if (!used) {
            spies[zipcode] = true;
            const c = [zipcode];
            const ds = zipcodeDistances[zipcode];
            const around = Object.keys(ds).filter(
                (b) => ds[b] <= maxDistanceToBeInCluster && !spies[b],
            );
            around.forEach((b) => {
                spies[b] = true;
                c.push(b);
            });
            cs.push(c);
        }
    });

    return cs
        .map((g) => {
            return {
                count: g.reduce((total, z) => total + signatureCounts[z], 0),
                contributors: g,
            };
        })
        .filter(
            (e) =>
                e.count >=
                minSignaturePercentageToBeACluster * signatures.length,
        );
};
