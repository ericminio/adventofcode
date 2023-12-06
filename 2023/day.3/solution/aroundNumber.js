export const aroundNumber = (position, lines) =>
    position.x >= 0 &&
    position.y >= 0 &&
    position.x < lines[0].length &&
    position.y < lines.length;
