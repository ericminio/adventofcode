const order = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

export const sortTwo = (left, right) => {
    for (let index = 0; index < 5; index++) {
        const li = order.indexOf(left[index]);
        const ri = order.indexOf(right[index]);
        if (li < ri) {
            return 1;
        }
        if (li > ri) {
            return -1;
        }
    }
    return 0;
};
