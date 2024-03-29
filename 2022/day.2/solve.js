const { add, lines } = require('../support');

const rounds = (file) => lines(file)
    .map(line => ({
        line: line,
        opponent: line.charAt(0),
        me: line.charAt(2)
    }));
const myScore = { 'X': 1, 'Y': 2, 'Z': 3 };
const calls = { 'X': 0, 'Y': 3, 'Z': 6 };
const outcomes = { 'A X': 3, 'B Y': 3, 'C Z': 3, 'B X': 0, 'C X': 6, 'A Y': 6, 'C Y': 0, 'A Z': 0, 'B Z': 6 };

const shapeScore = round => ({
    ...round,
    myShapeScore: myScore[round.me],
});
const outcome = round => ({
    ...round,
    outcome: outcomes[round.line],
});
const score = round => round.myShapeScore + round.outcome;
const scores = rounds => rounds.map(shapeScore).map(outcome).map(score);
const scores1 = file => scores(rounds(file));

const outcomeCall = round => ({
    ...round,
    call: calls[round.me],
    me: undefined,
});
const actualRound = round => ({
    ...round,
    line: Object.keys(outcomes).find(r => r.startsWith(round.opponent) && outcomes[r] == round.call),
});
const actualMe = round => ({
    ...round,
    me: round.line.charAt(2),
});
const scores2 = file => scores(rounds(file).map(outcomeCall).map(actualRound).map(actualMe));


const solve1 = (file) => {
    return scores1(file).reduce(add);
};

const solve2 = (file) => {
    return scores2(file).reduce(add);
};

module.exports = { solve1, solve2 };