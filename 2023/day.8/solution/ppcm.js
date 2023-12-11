import { primes } from './primes.js';

export const ppcm = (numbers) => {
    const decompositions = numbers.map((number) => primes(number));
    const distributions = decompositions.map((decomposition) => {
        const distribution = {};
        decomposition.forEach((factor) => {
            if (!distribution[factor]) {
                distribution[factor] = 0;
            }
            distribution[factor] += 1;
        });
        return distribution;
    });
    const ppcm = {};
    distributions.forEach((distribution) => {
        Object.keys(distribution).forEach((key) => {
            if (!ppcm[key]) {
                ppcm[key] = 0;
            }
            if (distribution[key] > ppcm[key]) {
                ppcm[key] = distribution[key];
            }
        });
    });

    return Object.keys(ppcm).reduce(
        (total, key) => total * Math.pow(key, ppcm[key]),
        1,
    );
};
