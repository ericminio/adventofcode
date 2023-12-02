import { extract } from '../../../support/index.js';

export const game = (line) => {
    const id = parseInt(extract(/Game (.*):/, line));
    const draws = line
        .substring(line.indexOf(':') + 1)
        .split(';')
        .map((draw) => {
            const maybered = /\s(\d*)\sred/.exec(draw);
            const maybegreen = /\s(\d*)\sgreen/.exec(draw);
            const maybeblue = /\s(\d*)\sblue/.exec(draw);
            return {
                red: maybered ? parseInt(maybered[1]) : 0,
                green: maybegreen ? parseInt(maybegreen[1]) : 0,
                blue: maybeblue ? parseInt(maybeblue[1]) : 0,
            };
        });

    return {
        id,
        draws,
    };
};
