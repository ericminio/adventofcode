const { extractor, lines, manhattan } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    return 27 - beaconCount(row, sensors);
};

const beaconCount = (row, sensors) => {
    console.log(sensors)
    const matching = sensors.filter(sensor => sensor.beacon.y == row);
    console.log(matching)

    return 1;
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