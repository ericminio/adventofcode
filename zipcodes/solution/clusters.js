import { average } from './average.js';
import { circles } from './circles.js';

export const clusters = (
    { zipcodes, distances, signatures: { distribution, count } },
    { diameter, minSignaturePercentageToBeACluster },
) => {
    return circles(diameter, distances)
        .map((g) => {
            return {
                count: g.reduce((total, z) => total + distribution[z], 0),
                contributors: g,
            };
        })
        .filter((e) => e.count >= minSignaturePercentageToBeACluster * count)
        .map((e) => ({ ...e, center: average(e.contributors, zipcodes) }));
};
