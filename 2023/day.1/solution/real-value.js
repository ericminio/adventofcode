import { extract } from '../../../support/index.js';
import { firstDigit } from './digit-or-letters.js';
import { lastDigit } from './last-digit.js';
import { numbers } from './numbers.js';

const value = (number) => {
    const index = numbers.indexOf(number);
    return index === -1 ? parseInt(number) : index + 1;
};

export const real = (line) =>
    10 * value(extract(firstDigit, line)) + value(extract(lastDigit(firstDigit), line));
