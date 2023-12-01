import { reduce } from '../../../support/index.js';
import { real } from './real-value.js';
import { naive } from './value.js';

export const solvepartone = (lines) => reduce(lines, naive)

export const solveparttwo= (lines) => reduce(lines, real)

