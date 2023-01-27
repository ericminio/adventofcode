const leftOf = (points) => {
    return points
        .map(point => ({ x: point.x - 1, y: point.y }))
        .filter(candidate => !points.some(point => point.x == candidate.x && point.y == candidate.y));
};

const rightOf = (points) => {
    return points
        .map(point => ({ x: point.x + 1, y: point.y }))
        .filter(candidate => !points.some(point => point.x == candidate.x && point.y == candidate.y));
};

const under = (points) => {
    return points
        .map(point => ({ x: point.x, y: point.y - 1 }))
        .filter(candidate => !points.some(point => point.x == candidate.x && point.y == candidate.y));
};

module.exports = { under, leftOf, rightOf };