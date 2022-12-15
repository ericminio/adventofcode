const { extractor, lines } = require('../support');

const solve1 = (file, row) => {
    const sensors = parse(file);
    return 26;
};

const parse = (file) => {
    let sensors = lines(file)
        .map(extractor(/^Sensor at x=(.*), y=(.*): closest beacon is at x=(.*), y=(.*)$/))
        .map(data => ({
            x: parseInt(data[0]),
            y: parseInt(data[1]),
            beacon: {
                x: parseInt(data[3]),
                y: parseInt(data[4]),
            },
        }))
        ;
    console.log(sensors);
};

module.exports = { solve1 };