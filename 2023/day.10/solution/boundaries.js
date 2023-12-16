export const boundaries = (loop) => {
    const values = Object.values(loop);
    const rectangle = {
        x1: values[0].x,
        y1: values[0].y,
        x2: values[0].x,
        y2: values[0].y,
    };
    for (const p of values) {
        if (p.x < rectangle.x1) {
            rectangle.x1 = p.x;
        }
        if (p.y < rectangle.y1) {
            rectangle.y1 = p.y;
        }
        if (p.x > rectangle.x2) {
            rectangle.x2 = p.x;
        }
        if (p.y > rectangle.y2) {
            rectangle.y2 = p.y;
        }
    }
    return rectangle;
};
