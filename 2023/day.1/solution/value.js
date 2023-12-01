import {firstDigit } from'./digit.js';
import {lastDigit } from'./last-digit.js';
import {extract } from'./extract.js';

const value = (number) => parseInt(number);

export const naive = (line) =>
    10 * value(extract(firstDigit, line)) + value(extract(lastDigit(firstDigit), line));
