import { real } from './real-value.js';
import { naive } from './value.js';


export const solvepartone = (lines) => {
    return lines.reduce((total, line) => total + naive(line), 0);
}

export const solveparttwo= (lines) => {
    return lines.reduce((total, line) => total + real(line), 0);
}

