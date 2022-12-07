const { input } = require('../support');

const solve1 = (file) => {
    const data = input(file);
    for (var i = 3; i < data.length; i++) {
        let marker = {};
        for (j = i; j >= i - 3; j--) {
            let digit = data.charAt(j);
            if (marker[digit] === undefined) {
                marker[digit] = 1;
            }
            else {
                marker[digit]++;
            }
        }
    }
    return 7;
}

module.exports = { solve1 };