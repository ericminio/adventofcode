import { average } from './average.js';
import { circles } from './circles.js';
import { distances } from './distances.js';
export const clusters = (
    { zipcodes, signatures: { distribution, count } },
    { diameter, minSignaturePercentageToBeACluster },
) => {
    const zipcodeDistances = distances(distribution, zipcodes);

    return circles(diameter, zipcodeDistances)
        .map((g) => {
            return {
                count: g.reduce((total, z) => total + distribution[z], 0),
                contributors: g,
            };
        })
        .filter((e) => e.count >= minSignaturePercentageToBeACluster * count)
        .map((e) => ({ ...e, center: average(e.contributors, zipcodes) }));
};
