export const parse = (input) => {
    const groups = input.split('\n\n');
    const zipcodes = groups[0]
        .split('\n')
        .map((line) => {
            const data =
                /(.*),(-?([0-9][.])?[0-9]+),\s(-?([0-9][.])?[0-9]+)/.exec(line);
            return {
                zipcode: data[1],
                x: parseFloat(data[2]),
                y: parseFloat(data[4]),
            };
        })
        .reduce((codes, code) => {
            codes[code.zipcode] = { x: code.x, y: code.y };
            return codes;
        }, {});
    const signatures = groups[1].split('\n');

    return { zipcodes, signatures };
};
