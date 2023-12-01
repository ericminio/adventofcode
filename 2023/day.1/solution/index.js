import { reduce } from '../../../support/index.js';

import { naive } from './naive-value.js';
import { real } from './real-value.js';

export const solvepartone = (lines) => reduce(lines, naive);

export const solveparttwo = (lines) => reduce(lines, real);
