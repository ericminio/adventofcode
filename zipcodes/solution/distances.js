export const distances = (distribution, zipcodes) => {
    const values = {};
    Object.keys(distribution).forEach((a) => {
        values[a] = {};
        Object.keys(distribution).forEach((b) => {
            if (b !== a) {
                const za = zipcodes[a];
                const zb = zipcodes[b];
                values[a][b] = Math.abs(zb.x - za.x + zb.y - za.y);
            }
        });
    });
    return values;
};
