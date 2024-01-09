import { clusters } from './clusters.js';
import { distances } from './distances.js';
import { parse } from './parser.js';

export const solvepartone = (input) => {
    const incoming = parse(input);
    const signatureDistances = distances(
        incoming.signatures.distribution,
        incoming.zipcodes,
    );
    return clusters(
        { signatures: incoming.signatures, distances: signatureDistances },
        {
            diameter: 2,
            minSignaturePercentageToBeACluster: 0.2,
        },
    );
};

export const solveparttwo = () => '?';
