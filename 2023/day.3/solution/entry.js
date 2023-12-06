export const entry = (acc, index) => {
    const number = parseInt(acc);
    return {
        number,
        startIndex: index,
        endIndex: index + acc.length - 1,
    };
};
