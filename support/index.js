import fs from 'fs';
const input = (file) => fs.readFileSync(file).toString();
export const lines = (file) =>
    input(file)
        .split(/\n/)
        .filter((line) => line.length > 0);
const numbers = (file) =>
    input(file)
        .split(/\n/)
        .filter((line) => line.length > 0)
        .map((line) => parseInt(line));
const groups = (file) =>
    input(file)
        .split(/\n\n/)
        .map((items) => items.split('\n'));
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
const numberOrZero = (item) =>
    Number.isNaN(parseInt(item)) ? 0 : parseInt(item);
const groupsOfNumbers = (file) =>
    groups(file).map((items) => items.map((item) => numberOrZero(item)));
const descending = (a, b) => b - a;
const ascending = (a, b) => a - b;
const multiply = (a, b) => a * b;
const add = (a, b) => a + b;

const extractor = (pattern) => (line) => pattern.exec(line).splice(1);

const isInside = (reference, candidate) =>
    candidate.start >= reference.start && candidate.end <= reference.end;
const isOverlapping = (reference, candidate) =>
    candidate.end >= reference.start && candidate.start <= reference.end;

const manhattan = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const id = (location) => `${location.x}x${location.y}`;

export const utils = {
    input,
    lines,
    numbers,
    groups,
    groupsOf,
    groupsOfNumbers,
    add,
    multiply,
    numberOrZero,
    descending,
    ascending,
    extractor,
    isInside,
    isOverlapping,
    manhattan,
    id,
};
