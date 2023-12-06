import { entry } from './entry.js';
import { isNumber } from './isNumber.js';

export const parse = (line) => {
    const numbers = [];
    let acc = '';
    let start = 0;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (isNumber(c)) {
            if (acc === '') {
                start = i;
            }
            acc += c;
        } else {
            if (acc.length > 0) {
                numbers.push(entry(acc, start));
            }
            acc = '';
        }
    }
    if (acc.length > 0) {
        numbers.push(entry(acc, start));
    }

    return numbers;
};
