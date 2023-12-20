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

export const group = (nodes, { max }) => {
    console.log(nodes);
    Object.keys(nodes).forEach((a) => {
        const distances = nodes[a];
        const around = Object.keys(distances).filter(
            (b) => distances[b] <= max,
        );
        nodes[a] = around;
    });
    console.log(nodes);
    const candidates = Object.keys(nodes).map((a) => {
        nodes[a].push(a);
        nodes[a].sort();
        return nodes[a];
    });
    console.log(candidates);

    const keep = removeDuplicates(candidates);

    return keep;
};
