const fs = require('fs');
const input = (file) => fs.readFileSync(file).toString();

const groups = (file) => input(file).split(/\n\n/).map(items => items.split('\n'));
const numberOrZero = (item => Number.isNaN(parseInt(item)) ? 0 : parseInt(item));
const groupsOfNumbers = (file) => groups(file).map(items => items.map(item => numberOrZero(item)));
const total = (array) => array.reduce((acc, current) => acc += current, 0);
const orderDescending = (array) => { array.sort((a, b) => b - a); }

const lines = (file) => input(file).split(/\n/);
const rounds = (file) => lines(file).map(line => ({ line:line, opponent:line.charAt(0), me:line.charAt(2) }));
const opponentScore = { 'A':1, 'B':2, 'C': 3 };
const myScore = { 'X':1, 'Y':2, 'Z': 3 };
const outcomeCall = { 'X':0, 'Y':3, 'Z':6 };
const outcomes = { 'A X':3, 'B Y':3, 'C Z':3, 'B X':0, 'C X':6, 'A Y':6, 'C Y':0, 'A Z':0, 'B Z':6 };
const shapeScore = (file) => rounds(file).map(round => ({
    ...round, 
    myShapeScore:myScore[round.me],
}));
const outcome1 = (file) => shapeScore(file).map(round => ({
    ...round,
    outcome1: outcomes[round.line],
}));
const scores1 = (file) => outcome1(file).map(round => round.myShapeScore + round.outcome1);

module.exports = {
    groupsOfNumbers,
    total,
    orderDescending,

    scores1,
};