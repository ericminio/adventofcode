export const parse = (input) => {
    const groups = input.split('\n\n');
    const zipcodes = groups[0]
        .split('\n')
        .map((line) => {
            const data = /(.*),(-?\d+),\s(-?\d+)/.exec(line);
            return {
                zipcode: data[1],
                x: parseInt(data[2]),
                y: parseInt(data[3]),
            };
        })
        .reduce((codes, code) => {
            codes[code.zipcode] = { x: code.x, y: code.y };
            return codes;
        }, {});
    const signatures = groups[1].split('\n');

    return { zipcodes, signatures };
};
