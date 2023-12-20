import { circles } from './circles.js';
import { distances } from './distances.js';
import { signatureCountByZipcode } from './signatures.js';

export const clusters = (
    { zipcodes, signatures },
    { maxDistanceToBeInCluster, minSignaturePercentageToBeACluster },
) => {
    const signatureCounts = signatureCountByZipcode(signatures);
    const zipcodeDistances = distances(signatureCounts, zipcodes);

    return circles(maxDistanceToBeInCluster, zipcodeDistances)
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
