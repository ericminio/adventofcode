const boundaries = (positions) => {
    const xs = positions.map(position => position.x);
    const ys = positions.map(position => position.y);
    const zs = positions.map(position => position.z);
    return {
        minimum: { x: Math.min(...xs), y: Math.min(...ys), z: Math.min(...zs) },
        maximum: { x: Math.max(...xs), y: Math.max(...ys), z: Math.max(...zs) }
    };
};

module.exports = { boundaries };
