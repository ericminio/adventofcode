export const distances = (distribution) => {
    const values = distribution.map((a) => {
        a.distances = [];
        distribution.forEach((b) => {
            if (b.postalCode !== a.postalCode) {
                const zb = b.postalCode;
                const d =
                    Math.abs(b.position.x - a.position.x) +
                    Math.abs(b.position.y - a.position.y);
                a.distances.push({ postalCode: zb, distance: d });
            }
        });
        return a;
    });
    return values;
};
