module.exports = (line) => {
    for (let i = 0; i < line.length; i++) {
        if (i > 1) {
            if (line[i] === line[i - 2]) {
                return true;
            }
        }
    }
    return false;
};
