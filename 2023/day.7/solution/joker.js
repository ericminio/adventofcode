import { type } from './typer.js';

export const joker = (distribution) => {
    const jokerCount = distribution['J'];
    if (!jokerCount) return type(distribution);

    return 2;
};
