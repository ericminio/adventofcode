module.exports = (line) => {
    for (let i = 0; i < line.length; i++) {
        if (i > 0) {
            if (line[i] === line[i - 1]) {
                return true;
            }
        }
    }
    return false;
};
