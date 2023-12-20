import { clusters } from './clusters.js';
import { parse } from './parser.js';

export const solvepartone = (input) => {
    const incoming = parse(input);
    return clusters(incoming, {
        maxDistanceToBeInCluster: 2,
        minSignaturePercentageToBeACluster: 0.2,
    });
};

export const solveparttwo = () => '?';
