import { average } from './average.js';
import { circles } from './circles.js';

export const clusters = (
    { distribution, count },
    { size, minSignaturePercentageToBeACluster },
) => {
    return circles(size, distribution)
        .map((g) => {
            return {
                count: g.reduce((total, { count }) => total + count, 0),
                contributors: g,
            };
        })
        .filter((e) => e.count >= minSignaturePercentageToBeACluster * count)
        .map((e) => ({
            count: e.count,
            contributors: e.contributors.map(({ postalCode }) => postalCode),
            center: e.contributors[0].position,
        }));
};
