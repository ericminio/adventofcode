const vowels = ['a', 'e', 'i', 'o', 'u'];

module.exports = (line) => {
    const letters = line.split('');
    let count = 0;
    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        if (vowels.includes(letter)) {
            count += 1;
        }
        if (count === 3) {
            break;
        }
    }
    return count === 3;
};
