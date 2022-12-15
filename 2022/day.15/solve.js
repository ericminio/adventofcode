const { extractor, id, lines, manhattan } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    return coverage(row, sensors) - beaconCount(row, sensors);
};

const coverage = (row, sensors) => {
    const points = {};
    const candidates = sensors.filter(sensor => Math.abs(sensor.y - row) <= sensor.distanceToBeacon);
    console.log(candidates);
    let sensor = candidates[0];
    for (var x = sensor.x - sensor.distanceToBeacon; x <= sensor.x + sensor.distanceToBeacon; x++) {
        console.log({ x, row })
        let distance = manhattan(sensor, { x, y: row });
        console.log(distance, sensor.distanceToBeacon)
        if (distance <= sensor.distanceToBeacon) {
            points[id({ x, row })] = 1;
        }
    }
    console.log(points);
    return 27;
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

module.exports = { solve1 };