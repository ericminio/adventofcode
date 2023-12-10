export const count = (hand) => {
    const distribution = {};
    for (let i = 0; i < hand.length; i++) {
        const card = hand[i];
        if (!distribution[card]) {
            distribution[card] = 0;
        }
        distribution[card] += 1;
    }
    return distribution;
};
