const substrings = ['ab', 'cd', 'pq', 'xy'];

module.exports = (line) => {
    for (let i = 0; i < substrings.length; i++) {
        const candidate = substrings[i];
        if (line.indexOf(candidate) !== -1) {
            return false;
        }
    }
    return true;
};
