const checksum = (array) => array.join('-');

export const group = (nodes, { max }) => {
    Object.keys(nodes).forEach((a) => {
        const distances = nodes[a];
        const around = Object.keys(distances).filter(
            (b) => distances[b] <= max,
        );
        nodes[a] = around;
    });
    const candidates = Object.keys(nodes).map((a) => {
        nodes[a].push(a);
        nodes[a].sort();
        return nodes[a];
    });

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
