const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();
const lines = (file) => input(file).split(/\n/);
const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const groupsOf = (size, file) => {
    const rows = lines(file);
    const groups = [];
    let group = [];
    for (var i = 0; i < rows.length; i++) {
        group.push(rows[i]);
        if (group.length == size) {
            groups.push(group);
            group = [];
        }
    }
    return groups;
};
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));
const total = (array) => array.reduce((acc, current) => acc += current, 0);
const orderDescending = (array) => { array.sort((a, b) => b - a); }

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

module.exports = {
    lines,
    groupsOf,
    groupsOfNumbers,
    total,
    orderDescending,

    scores1,
    scores2,
};