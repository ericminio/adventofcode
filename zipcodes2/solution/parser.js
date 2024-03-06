export const parse = (input) => {
    const lines = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    let count = 0;
    let zipcodes = {};
    let zipcodeIndex = 0;
    let distribution = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            const c = lines[y][x];
            if (c !== '.') {
                zipcodeIndex += 1;
                const zipcode = `z${zipcodeIndex}`;
                zipcodes[zipcode] = { x, y };
                const value = parseInt(c);
                count += value;
                distribution.push({
                    postalCode: zipcode,
                    count: value,
                    position: { x, y },
                });
            }
        }
    }
    distribution.sort((a, b) => b.count - a.count);
    return {
        signatures: {
            count,
            distribution,
        },
    };
};
