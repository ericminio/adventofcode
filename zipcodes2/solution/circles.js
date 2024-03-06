export const circles = (size, distributionWithDistances) => {
    const spies = {};
    const cs = [];
    distributionWithDistances.forEach(({ postalCode, distances }) => {
        const used = spies[postalCode];
        if (!used) {
            spies[postalCode] = true;
            const c = [postalCode];
            const around = distances.filter(
                (b) => b.distance <= size && !spies[b.postalCode],
            );
            around.forEach((b) => {
                spies[b.postalCode] = true;
                c.push(b.postalCode);
            });
            cs.push(c);
        }
    });
    return cs;
};
