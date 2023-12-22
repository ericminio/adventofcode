import { average } from './average.js';
import { circles } from './circles.js';
import { distances } from './distances.js';
import { signatureCountByZipcode } from './signatures.js';

export const clusters = (
    { zipcodes, signatures },
    { diameter, minSignaturePercentageToBeACluster },
) => {
    const signatureCounts = signatureCountByZipcode(signatures);
    const zipcodeDistances = distances(signatureCounts, zipcodes);

    return circles(diameter, zipcodeDistances)
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
        )
        .map((e) => ({ ...e, center: average(e.contributors, zipcodes) }));
};
