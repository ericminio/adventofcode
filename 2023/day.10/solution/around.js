import { id } from '../../../support/index.js';

export const east = { dx: 1, dy: 0, name: 'east' };
export const south = { dx: 0, dy: 1, name: 'south' };
export const west = { dx: -1, dy: 0, name: 'west' };
export const north = { dx: 0, dy: -1, name: 'north' };

export const directions = [east, south, west, north];

export const around = (p, map) =>
    directions
        .map((d) => {
            const m = { x: p.x + d.dx, y: p.y + d.dy };
            return { ...m, id: id(m), direction: d };
        })
        .filter(
            (c) => c.x >= 0 && c.y >= 0 && c.x < map.width && c.y < map.height,
        );
