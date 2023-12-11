import { type } from './typer.js';

export const joker = (distribution) => {
    const adjusted = { ...distribution };
    const jokerCount = adjusted['J'];
    if (!jokerCount) return type(adjusted);
    if (jokerCount === 5) return 7;

    delete adjusted['J'];
    let keyWithMaxValue;
    let maxValue = 0;
    Object.keys(adjusted).forEach((key) => {
        if (adjusted[key] > maxValue) {
            maxValue = adjusted[key];
            keyWithMaxValue = key;
        }
    });
    adjusted[keyWithMaxValue] += jokerCount;

    return type(adjusted);
};
