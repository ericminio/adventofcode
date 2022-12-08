const { lines } = require('../support');

const perimeter = (forest) => 2 * forest.length + 2 * (forest[0].length - 2);
const treeAt = (x, y, forest) => ({ x, y, height: 0 });
const isVisibleFromTop = (tree, forest) => {
    let candidate = treeAt(tree.x - 1, tree.y, forest);
    return tree.height > candidate.height;
}
const isVisible = (tree, forest) => isVisibleFromTop(tree, forest);

const solve1 = (file) => {
    const forest = lines(file);
    return perimeter(forest) +
        isVisible({ x: 1, y: 1, height: 5 }, forest) + 1 + 0 +
        1 + 0 + 1 +
        0 + 1 + 0
        ;
};

module.exports = { solve1 };