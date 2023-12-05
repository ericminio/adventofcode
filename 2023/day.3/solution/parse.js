export const parse = (line) => {
    const numbers = [];
    let acc = '';
    let start = 0;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (!Number.isNaN(parseInt(c))) {
            if (acc === '') {
                start = i;
            }
            acc += c;
        }
    }
    const number = parseInt(acc);
    numbers.push({
        number,
        startIndex: line.indexOf(acc),
        endIndex: line.indexOf(acc) + acc.length - 1,
    });
    return numbers;
};
