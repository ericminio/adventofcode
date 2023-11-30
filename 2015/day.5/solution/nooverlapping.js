module.exports = (line) => {
    for (let i = 0; i < line.length; i++) {
        for (let j = i + 2; j < line.length; j++) {
            if (line[j] === line[i] && line[j + 1] === line[i + 1]) {
                return true;
            }
        }
    }
    return false;
};
