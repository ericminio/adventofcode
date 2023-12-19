export const solvepartone = () => {
    const clusters = [
        {
            count: 5,
            contributors: ['AAAAA', 'BBBBB'],
        },
        {
            count: 5,
            contributors: ['EEEEE'],
        },
    ];
    return clusters.reduce(
        (total, cluster) => total + cluster.contributors.length * cluster.count,
        0,
    );
};

export const solveparttwo = () => '?';
