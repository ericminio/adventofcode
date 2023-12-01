module.exports = (line) => {
    let value = 0;
    for (let i = 0; i < line.length; i++) {
        if (!Number.isNaN(parseInt(line[i]))) {
            value += 10 * parseInt(line[i]);
            break;
        }
    }
    for (let i = line.length - 1; i >= 0; i--) {
        if (!Number.isNaN(parseInt(line[i]))) {
            value += parseInt(line[i]);
            break;
        }
    }

    return value;
};
