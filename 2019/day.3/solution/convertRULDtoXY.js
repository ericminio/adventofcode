const pattern = /^(.)(.*)/;
const directions = {
    R: { dx: 1, dy: 0 },
    U: { dx: 0, dy: 1 },
    L: { dx: -1, dy: 0 },
    D: { dx: 0, dy: -1 },
};

const convert = (line) => {
    const path = [];
    const current = { x: 0, y: 0 };
    line.split(',').forEach((code) => {
        const data = pattern.exec(code);
        const move = directions[data[1]];
        const steps = parseInt(data[2]);
        for (var count = 0; count < steps; count++) {
            const position = { x: current.x + move.dx, y: current.y + move.dy };
            path.push(position);
            current.x = position.x;
            current.y = position.y;
        }
    });
    return path;
};

module.exports = (lines) => {
    const paths = [];
    for (line of lines) {
        paths.push(convert(line));
    }
    return paths;
};
