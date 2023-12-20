import { distances } from './distances.js';
import { signatureCountByZipcode } from './signatures.js';

export const clusters = (
    { zipcodes, signatures },
    { maxDistanceToBeInCluster, minSignaturePercentageToBeACluster },
) => {
    const signatureCounts = signatureCountByZipcode(signatures);
    const zipcodeDistances = distances(signatureCounts, zipcodes);
    const spies = Object.keys(signatureCounts).reduce((reduced, z) => {
        reduced[z] = {
            zipcode: z,
            count: signatureCounts[z],
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
            const ds = zipcodeDistances[zipcode];
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
