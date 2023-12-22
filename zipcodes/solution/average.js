export const average = (contributors, zipcodes) => {
    const sum = contributors.reduce(
        (total, c) => ({
            x: total.x + zipcodes[c].x,
            y: total.y + zipcodes[c].y,
        }),
        { x: 0, y: 0 },
    );
    return { x: sum.x / contributors.length, y: sum.y / contributors.length };
};
