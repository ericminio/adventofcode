import { extract } from '../../../support/index.js';

export const game = (line) => {
    const id = extract(/Game (.*):/, line);
    const draws = line
        .substring(line.indexOf(':') + 1)
        .split(';')
        .map((draw) => {
            let rgb = {};
            try {
                rgb.red = parseInt(extract(/\s(\d*)\sred/, draw));
            } catch {
                rgb.red = 0;
            }
            try {
                rgb.green = parseInt(extract(/\s(\d*)\sgreen/, draw));
            } catch {
                rgb.green = 0;
            }
            try {
                rgb.blue = parseInt(extract(/\s(\d*)\sblue/, draw));
            } catch {
                rgb.blue = 0;
            }
            return rgb;
        });

    return {
        id: parseInt(id),
        draws,
    };
};
