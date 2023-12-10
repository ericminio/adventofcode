import { descending } from '../../../support/index.js';

export const type = (distribution) => {
    const values = Object.values(distribution);
    values.sort(descending);
    if (values.length === 1 && values[0] === 5) {
        return 7;
    }
    if (values.length === 2 && values[0] === 4 && values[1] === 1) {
        return 6;
    }

    if (values.length === 2 && values[0] === 3 && values[1] === 2) {
        return 5;
    }

    if (values.length === 3 && values[0] === 3) {
        return 4;
    }

    if (values.length === 3 && values[0] === 2 && values[1] === 2) {
        return 3;
    }

    if (values.length === 4 && values[0] === 2) {
        return 2;
    }

    if (values.length === 5) {
        return 1;
    }

    return 0;
};
