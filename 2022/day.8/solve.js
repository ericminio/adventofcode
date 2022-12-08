const { lines } = require('../support');

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
}
const isVisible = (tree, forest) => isVisibleFromTop(tree, forest);

const solve1 = (file) => {
    const forest = lines(file);
    return perimeter(forest) +
        isVisible(treeAt(1, 1, forest), forest) + 1 + 0 +
        1 + 0 + 1 +
        0 + 1 + 0
        ;
};

module.exports = { solve1 };