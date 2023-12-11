const directions = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
];

export const around = (p, map) =>
    directions
        .map((d) => ({ x: p.x + d.dx, y: p.y + d.dy }))
        .filter(
            (c) => c.x >= 0 && c.y >= 0 && c.x < map.width && c.y < map.height,
        );
