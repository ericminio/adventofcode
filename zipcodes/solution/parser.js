import { signatureCountByZipcode } from './signatures.js';

const parseDistribution = (input) => {
    const lines = input
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    let count = 0;
    let zipcodes = {};
    let zipcodeIndex = 0;
    let distribution = {};
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[0].length; x++) {
            const c = lines[y][x];
            if (c !== '.') {
                zipcodeIndex += 1;
                const zipcode = `z${zipcodeIndex}`;
                zipcodes[zipcode] = { x, y };
                const value = parseInt(c);
                count += value;
                distribution[zipcode] = value;
            }
        }
    }
    return {
        zipcodes,
        signatures: {
            count,
            distribution,
        },
    };
};

export const parse = (input) => {
    if (input.indexOf('\n') === 0) {
        return parseDistribution(input);
    }
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

    return {
        zipcodes,
        signatures: {
            count: signatures.length,
            distribution: signatureCountByZipcode(signatures),
        },
    };
};
