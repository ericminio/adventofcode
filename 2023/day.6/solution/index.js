export const solvepartone = (races) => {
    let count = 1;
    for (const { time, record } of races) {
        let better = 0;
        for (let hold = 0; hold <= time; hold++) {
            const distance = hold * (time - hold);
            if (distance > record) {
                better += 1;
            }
        }
        count *= better;
    }
    return count;
};
