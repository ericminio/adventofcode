const render = (tower) => {
    const lines = [];
    for (let y = 0; y <= tower.height; y++) {
        let line = '';
        for (let x = 0; x <= 8; x++) {
            let cell = '.';
            if (!tower.isFree({ x, y })) {
                cell = '#';
            }
            line += cell;
        }
        lines.push(line);
    }
    console.log(lines.join('\n'));
};

module.exports = { render };