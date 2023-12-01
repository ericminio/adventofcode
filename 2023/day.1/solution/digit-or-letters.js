import { numbers } from './numbers.js';

export const firstDigit = new RegExp('(\\d|' + numbers.join('|') + ')');
