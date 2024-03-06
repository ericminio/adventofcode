import { average } from './average.js';
import { circles } from './circles.js';

export const clusters = (
    { distributionWithDistances, count },
    { size, minSignaturePercentageToBeACluster },
) => {
    const countsAndPositions = distributionWithDistances.reduce(
        (all, current) => {
            all[current.postalCode] = {
                count: current.count,
                position: current.position,
            };
            return all;
        },
        {},
    );

    return circles(size, distributionWithDistances)
        .map((g) => {
            return {
                count: g.reduce(
                    (total, z) => total + countsAndPositions[z].count,
                    0,
                ),
                contributors: g,
            };
        })
        .filter((e) => e.count >= minSignaturePercentageToBeACluster * count)
        .map((e) => ({
            ...e,
            center: countsAndPositions[e.contributors[0]].position,
        }));
};
