export const circles = (diameter, zipcodeDistances) => {
    const spies = {};
    const cs = [];
    Object.keys(zipcodeDistances).forEach((zipcode) => {
        const used = spies[zipcode];
        if (!used) {
            spies[zipcode] = true;
            const c = [zipcode];
            const ds = zipcodeDistances[zipcode];
            const around = Object.keys(ds).filter(
                (b) => ds[b] <= diameter && !spies[b],
            );
            around.forEach((b) => {
                spies[b] = true;
                c.push(b);
            });
            cs.push(c);
        }
    });
    return cs;
};
