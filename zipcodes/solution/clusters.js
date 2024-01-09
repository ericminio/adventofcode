import { average } from './average.js';
import { circles } from './circles.js';

export const clusters = (
    { zipcodes, distances, signatures: { distribution, count } },
    { size, minSignaturePercentageToBeACluster },
) => {
    return circles(size, distances)
        .map((g) => {
            return {
                count: g.reduce((total, z) => total + distribution[z], 0),
                contributors: g,
            };
        })
        .filter((e) => e.count >= minSignaturePercentageToBeACluster * count)
        .map((e) => ({ ...e, center: average(e.contributors, zipcodes) }));
};
