const numbers = [
    { word: 'one', value: 1 },
    { word: 'two', value: 2 },
    { word: 'three', value: 3 },
    { word: 'four', value: 4 },
    { word: 'five', value: 5 },
    { word: 'six', value: 6 },
    { word: 'seven', value: 7 },
    { word: 'eight', value: 8 },
    { word: 'nine', value: 9 },
];

module.exports = (line) => {
    let value = 0;
    for (let i = 0; i < line.length; i++) {
        if (!Number.isNaN(parseInt(line[i]))) {
            value += 10 * parseInt(line[i]);
            break;
        } else {
            const number = numbers.find(
                (n) => line.substring(i, i + n.word.length) === n.word,
            );
            if (number) {
                value += 10 * number.value;
                break;
            }
        }
    }
    for (let i = line.length - 1; i >= 0; i--) {
        if (!Number.isNaN(parseInt(line[i]))) {
            value += parseInt(line[i]);
            break;
        } else {
            const number = numbers.find(
                (n) => line.substring(i, i + n.word.length) === n.word,
            );
            if (number) {
                value += number.value;
                break;
            }
        }
    }

    return value;
};
