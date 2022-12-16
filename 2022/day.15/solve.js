const { extractor, id, lines, manhattan, ascending, descending } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    const range = area(sensors);

    const points = {};
    for (x = range.minimum.x; x <= range.maximum.x; x++) {
        let point = { x, y: row };
        for (var i = 0; i < sensors.length; i++) {
            let sensor = sensors[i];
            let distance = manhattan(sensor, point);
            if (distance <= sensor.distanceToBeacon) {
                console.log(point, sensor)
                points[id(point)] = point.x;
                break;
            }
        }
    }
    const values = Object.values(points).sort(ascending);
    console.log(values)

    return rowCoverageSize(row, sensors) - beaconCount(row, sensors);
};

const solve2 = (file) => {
    const sensors = parse(file);
    const range = area(sensors);
    let beacon = {};

    let stop = false;
    for (y = range.minimum.y; y <= range.maximum.y; y++) {
        for (x = range.minimum.x; x <= range.maximum.x; x++) {
            let candidate = { x, y };
            let covered = false;
            for (var i = 0; i < sensors.length; i++) {
                let sensor = sensors[i];
                if (manhattan(candidate, sensor) <= sensor.distanceToBeacon) {
                    covered = true;
                    break;
                }
            }
            if (!covered) {
                beacon = candidate;
                stop = true;
                break;
            }
        }
        if (stop) {
            break;
        }
    }

    // for (row = range.minimum.y; row <= range.maximum.y; row++) {
    //     const points = Object.values(rowCoverage(row, sensors));
    //     const x = missing(points);
    //     if (x !== undefined) {
    //         beacon.x = x;
    //         beacon.y = row;
    //         break;
    //     }
    // }

    return tunningFrequency(beacon);
};

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
const rowCoverageSize = (row, sensors) => {
    return Object.keys(rowCoverage(row, sensors)).length;
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

module.exports = { solve1, solve2, parse, area, rowCoverage };