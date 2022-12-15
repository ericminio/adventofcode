const { extractor, id, lines, manhattan } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    return coverageSize(row, sensors) - beaconCount(row, sensors);
};

const solve2 = (file) => {
    const sensors = parse(file);
    const range = area(sensors);

    let beacon = {};
    for (row = range.minimum.y; row <= range.maximum.y; row++) {
        const points = Object.values(coverage(row, sensors));
        console.log(row, points);
    }

    beacon = { ...{ x: 14, y: 11 } };
    return tunningFrequency(beacon);
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
const coverage = (row, sensors) => {
    const points = {};
    const candidates = sensors.filter(sensor => Math.abs(sensor.y - row) <= sensor.distanceToBeacon);
    candidates.forEach(sensor => {
        for (var x = sensor.x - sensor.distanceToBeacon; x <= sensor.x + sensor.distanceToBeacon; x++) {
            let point = { x, y: row };
            let distance = manhattan(sensor, point);
            if (distance <= sensor.distanceToBeacon) {
                points[id(point)] = point;
            }
        }

    });
    return points;
};
const coverageSize = (row, sensors) => {
    return Object.keys(coverage(row, sensors)).length;
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