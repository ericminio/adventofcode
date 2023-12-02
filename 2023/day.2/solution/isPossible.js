export const isPossible = (game, bag) =>
    !game.draws.some(
        (draw) =>
            draw.red > bag.red ||
            draw.green > bag.green ||
            draw.blue > bag.blue,
    );
