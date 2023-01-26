const render = (tower) => {
    const lines = [];
    for (let i = 0; i <= tower.height; i++) {
        let line = '.';
        lines.push(line);
    }
    console.log(lines.join('\n'));
};

module.exports = { render };