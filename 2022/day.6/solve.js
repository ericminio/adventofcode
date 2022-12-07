const { input } = require('../support');

const markerPosition = (size, data) => {
    for (var i = size - 1; i < data.length; i++) {
        let marker = {};
        for (j = i; j >= i - (size - 1); j--) {
            let digit = data.charAt(j);
            if (marker[digit] === undefined) {
                marker[digit] = 1;
            }
            else {
                marker[digit]++;
            }
            if (Object.keys(marker).length == size) {
                return i + 1;
            }
        }
    }
}

const solve1 = (file) => {
    const data = input(file);
    return markerPosition(4, data);
}

const solve2 = (file) => {
    const data = input(file);
    for (var i = 13; i < data.length; i++) {
        let marker = {};
        for (j = i; j >= i - 13; j--) {
            let digit = data.charAt(j);
            if (marker[digit] === undefined) {
                marker[digit] = 1;
            }
            else {
                marker[digit]++;
            }
            if (Object.keys(marker).length == 14) {
                return i + 1;
            }
        }
    }
};

module.exports = { solve1, solve2 };