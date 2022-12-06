const { lines, total } = require('../support');

const rounds = (file) => lines(file).map(line => ({ line: line, opponent: line.charAt(0), me: line.charAt(2) }));
const myScore = { 'X': 1, 'Y': 2, 'Z': 3 };
const outcomeCall = { 'X': 0, 'Y': 3, 'Z': 6 };
const outcomes = { 'A X': 3, 'B Y': 3, 'C Z': 3, 'B X': 0, 'C X': 6, 'A Y': 6, 'C Y': 0, 'A Z': 0, 'B Z': 6 };
const shapeScore = (file) => rounds(file).map(round => ({
    ...round,
    myShapeScore: myScore[round.me],
}));
const outcome1 = (file) => shapeScore(file).map(round => ({
    ...round,
    outcome1: outcomes[round.line],
}));
const scores1 = (file) => outcome1(file).map(round => round.myShapeScore + round.outcome1);
const outcome2 = (file) => rounds(file).map(round => ({
    ...round,
    outcome2: outcomeCall[round.me],
    me: undefined,
}));
const actualRound = (file) => outcome2(file).map(round => ({
    ...round,
    actual: Object.keys(outcomes).find(r => r.startsWith(round.opponent) && outcomes[r] == round.outcome2),
}));
const actualMe2 = (file) => actualRound(file).map(round => ({
    ...round,
    me: round.actual.charAt(2),
}))
const scores2 = (file) => actualMe2(file).map(round => myScore[round.me] + outcomes[round.actual]);


const solve1 = (file) => {
    return total(scores1(file));
};

const solve2 = (file) => {
    return total(scores2(file));
};

module.exports = { solve1, solve2 };