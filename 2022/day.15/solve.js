const { extractor, id, lines, manhattan, ascending, descending } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    const points = Object.values(coverage(sensors));
    console.log(points.length);
    const rowSize = points.filter(point => point.y === row).length

    return rowSize - beaconCount(row, sensors);
};

const solve2 = (file) => {
    const sensors = parse(file);
    const range = area(sensors);

    let beacon = {};
    for (row = range.minimum.y; row <= range.maximum.y; row++) {
        const points = Object.values(rowCoverage(row, sensors));
        const x = missing(points);
        if (x !== undefined) {
            beacon.x = x;
            beacon.y = row;
            break;
        }
    }

    return tunningFrequency(beacon);
};

const coverage = (sensors) => {
    const points = {};
    sensors.forEach(sensor => {
        for (var x = sensor.x - sensor.distanceToBeacon; x <= sensor.x + sensor.distanceToBeacon; x++) {
            for (var y = sensor.y - sensor.distanceToBeacon; y <= sensor.y + sensor.distanceToBeacon; y++) {
                let point = { x, y };
                let distance = manhattan(sensor, point);
                if (distance <= sensor.distanceToBeacon) {
                    points[id(point)] = point;
                }
            }
        }
    });
    return points;
}

const missing = (points) => {
    let found;
    points.sort(ascending);
    for (var i = 0; i < points.length - 1; i++) {
        if (points[i] + 1 !== points[i + 1]) {
            found = points[i] + 1;
            break;
        }
    }
    return found;
};
const area = (sensors) => {
    const first = sensors[0];
    let range = {
        minimum: clone(first),
        maximum: clone(first),
    };
    sensors.forEach(sensor => {
        if (sensor.x < range.minimum.x) {
            range.minimum.x = sensor.x;
        }
        if (sensor.y < range.minimum.y) {
            range.minimum.y = sensor.y;
        }
        if (sensor.x > range.maximum.x) {
            range.maximum.x = sensor.x;
        }
        if (sensor.y > range.maximum.y) {
            range.maximum.y = sensor.y;
        }
    });
    return range;
};
const clone = (sensor) => ({ x: sensor.x, y: sensor.y });
const tunningFrequency = (point) => point.x * 4000000 + point.y;
const rowCoverage = (row, sensors) => {
    const points = {};
    const candidates = sensors.filter(sensor => Math.abs(sensor.y - row) <= sensor.distanceToBeacon);
    candidates.forEach(sensor => {
        for (var x = sensor.x - sensor.distanceToBeacon; x <= sensor.x + sensor.distanceToBeacon; x++) {
            let point = { x, y: row };
            let distance = manhattan(sensor, point);
            if (distance <= sensor.distanceToBeacon) {
                points[id(point)] = point.x;
            }
        }

    });
    return points;
};
const beaconCount = (row, sensors) => {
    let matching = {};
    sensors.forEach(sensor => {
        if (sensor.beacon.y === row) {
            matching[id(sensor.beacon)] = 1;
        }
    })
    return Object.keys(matching).length;
};

const parse = (file) => {
    return lines(file)
        .map(extractor(/^Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)$/))
        .map(data => ({
            x: parseInt(data[0]),
            y: parseInt(data[1]),
            beacon: {
                x: parseInt(data[2]),
                y: parseInt(data[3]),
            },
        }))
        .map(sensor => ({
            ...sensor,
            distanceToBeacon: manhattan(sensor, sensor.beacon),
        }));
};

module.exports = { solve1, solve2 };