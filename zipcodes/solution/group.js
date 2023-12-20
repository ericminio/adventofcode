const checksum = (array) => array.join('-');
const removeDuplicates = (candidates) => {
    const keep = [];
    candidates.forEach((candidate, i) => {
        let existing = false;
        const candidateChecksum = checksum(candidate);
        keep.forEach((maybe, j) => {
            const otherChecksum = checksum(maybe);
            if (j !== i && otherChecksum === candidateChecksum) {
                existing = true;
            }
        });
        if (!existing) {
            keep.push(candidate);
        }
    });

    return keep;
};

export const group = (nodes, { maxDistanceToBeInCluster }) => {
    const incoming = { ...nodes };
    Object.keys(incoming).forEach((a) => {
        const distances = incoming[a];
        const around = Object.keys(distances).filter(
            (b) => distances[b] <= maxDistanceToBeInCluster,
        );
        incoming[a] = around;
    });
    const candidates = Object.keys(incoming).map((a) => {
        incoming[a].push(a);
        incoming[a].sort();
        return incoming[a];
    });

    const keep = removeDuplicates(candidates);

    return keep;
};
