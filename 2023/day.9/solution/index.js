export const solvepartone = (lines) => {
    for (const line of lines) {
        const numbers = line.split(' ').map((e) => parseInt(e));

        let pyramid = [numbers.slice()];
        let current = pyramid[pyramid.length - 1];
        while (current.some((e) => e !== 0)) {
            let next = [];
            for (let i = 1; i < current.length; i++) {
                next.push(current[i] - current[i - 1]);
            }
            pyramid.push(next);
            current = pyramid[pyramid.length - 1];
        }

        console.log(pyramid);
    }

    return 114;
};

export const solveparttwo = () => '?';
