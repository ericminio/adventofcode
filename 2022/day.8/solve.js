const { lines, orderDescending } = require('../support');

const perimeter = (forest) => 2 * forest.length + 2 * (forest[0].length - 2);
const treeAt = (x, y, forest) => ({ x, y, height: forest[x][y] });

const isVisibleFromTop = (tree, forest) => {
    for (var i = tree.x - 1; i >= 0; i--) {
        let candidate = treeAt(i, tree.y, forest);
        if (tree.height <= candidate.height) {
            return false;
        }
    }
    return true;
};
const viewingDistanceTop = (tree, forest) => {
    let count = 0;
    for (var i = tree.x - 1; i >= 0; i--) {
        let candidate = treeAt(i, tree.y, forest);
        count += 1;
        if (tree.height <= candidate.height) {
            break;
        }
    }
    return count;
};

const isVisibleFromRight = (tree, forest) => {
    for (var j = tree.y + 1; j < forest[0].length; j++) {
        let candidate = treeAt(tree.x, j, forest);
        if (tree.height <= candidate.height) {
            return false;
        }
    }
    return true;
};
const isVisibleFromBottom = (tree, forest) => {
    for (var i = tree.x + 1; i < forest.length; i++) {
        let candidate = treeAt(i, tree.y, forest);
        if (tree.height <= candidate.height) {
            return false;
        }
    }
    return true;
};
const isVisibleFromLeft = (tree, forest) => {
    for (var j = tree.y - 1; j >= 0; j--) {
        let candidate = treeAt(tree.x, j, forest);
        if (tree.height <= candidate.height) {
            return false;
        }
    }
    return true;
};
const viewingDistanceRight = (tree, forest) => {
    let count = 0;
    for (var j = tree.y + 1; j < forest[0].length; j++) {
        let candidate = treeAt(tree.x, j, forest);
        count += 1;
        if (tree.height <= candidate.height) {
            return count;
        }
    }
    return count;
};
const viewingDistanceBottom = (tree, forest) => {
    let count = 0;
    for (var i = tree.x + 1; i < forest.length; i++) {
        let candidate = treeAt(i, tree.y, forest);
        count += 1;
        if (tree.height <= candidate.height) {
            return count;
        }
    }
    return count;
};
const viewingDistanceLeft = (tree, forest) => {
    let count = 0;
    for (var j = tree.y - 1; j >= 0; j--) {
        let candidate = treeAt(tree.x, j, forest);
        count += 1;
        if (tree.height <= candidate.height) {
            return count;
        }
    }
    return count;
};

const isVisible = (tree, forest) => (
    isVisibleFromTop(tree, forest) ||
    isVisibleFromRight(tree, forest) ||
    isVisibleFromBottom(tree, forest) ||
    isVisibleFromLeft(tree, forest)
);

const scenicScore = (tree, forest) => (
    viewingDistanceTop(tree, forest) *
    viewingDistanceLeft(tree, forest) *
    viewingDistanceBottom(tree, forest) *
    viewingDistanceRight(tree, forest)
);

const solve1 = (file) => {
    const forest = lines(file);
    let count = 0;
    for (var x = 1; x < forest.length - 1; x++) {
        for (var y = 1; y < forest[0].length - 1; y++) {
            count = count + isVisible(treeAt(x, y, forest), forest);
        }
    }
    return perimeter(forest) + count;
};

const solve2 = (file) => {
    const forest = lines(file);
    let scores = [];
    for (var x = 1; x < forest.length - 1; x++) {
        for (var y = 1; y < forest[0].length - 1; y++) {
            let score = scenicScore(treeAt(x, y, forest), forest);
            scores.push(score);
        }
    }
    orderDescending(scores);

    return scores[0];
}

module.exports = { solve1, solve2 };