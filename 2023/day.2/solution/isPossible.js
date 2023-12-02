export const isPossible = (game, bag) => {
    for (const draw of game.draws) {
        if (
            draw.red > bag.red ||
            draw.green > bag.green ||
            draw.blue > bag.blue
        ) {
            return false;
        }
    }
    return true;
};
