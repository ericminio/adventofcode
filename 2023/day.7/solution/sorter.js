const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
const orderWithJoker = [
    'A',
    'K',
    'Q',
    'T',
    '9',
    '8',
    '7',
    '6',
    '5',
    '4',
    '3',
    '2',
    'J',
];

export const sortTwo = (left, right) => {
    return sort(left, right, order);
};

export const sortTwoWithJoker = (left, right) => {
    return sort(left, right, orderWithJoker);
};

const sort = (left, right, set) => {
    for (let index = 0; index < 5; index++) {
        const li = set.indexOf(left[index]);
        const ri = set.indexOf(right[index]);
        if (li < ri) {
            return 1;
        }
        if (li > ri) {
            return -1;
        }
    }
    return 0;
};
