export const circles = (size, distribution) => {
    const spies = {};
    const cs = [];
    distribution.forEach((a) => {
        const used = spies[a.postalCode];
        if (!used) {
            spies[a.postalCode] = true;
            const c = [a];
            const around = distribution.filter((b) => {
                const distance =
                    Math.abs(b.position.x - a.position.x) +
                    Math.abs(b.position.y - a.position.y);
                return distance <= size && !spies[b.postalCode];
            });
            around.forEach((b) => {
                spies[b.postalCode] = true;
                c.push(b);
            });
            cs.push(c);
        }
    });
    return cs;
};
