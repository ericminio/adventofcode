const { expect } = require('chai');

describe.only('day 25 challenge', () => {

    it('is about one moving right', () => {
        let current = parse(`
            >.
        `);
        let next = move(current);
        expect(render(next)).to.deep.equal(rendered(`
            .>
        `));
    });
    it('is about one moving down', () => {
        let current = parse(`
            V
            .
        `);
        let next = move(current);
        expect(render(next)).to.deep.equal(rendered(`
            .
            V
        `));
    });
    describe('traffic jam', () => {

        it('happens going right', () => {
            let current = parse(`
                >>.
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >.>
            `));
        });
        it('happens when there is nowhere to go on the right', () => {
            let current = parse(`
                >>
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >>
            `));
        });
        it('does not happen when going right returns to the start', () => {
            let current = parse(`
                .>
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >.
            `));
        });
    });
});

const rendered = (expected) => {
    return expected.trim().split('\n').map(line => line.trim());
};

const move = (current) => {
    return {
        rowCount: current.rowCount,
        columnCount: current.columnCount,
        rights: current.rights.map(cucumber => {
            return ( current.rights.find(other => 
                other.row == cucumber.row && 
                other.column == (cucumber.column + 1) % current.columnCount)) 
                ? cucumber 
                : moveRight(cucumber, current.columnCount);
        }),
        downs: current.downs.map(moveDown),
    };
};

const moveRight = (cucumber, columnCount) => ({ row:cucumber.row, column:(cucumber.column + 1) % columnCount });
const moveDown = cucumber => ({ row:cucumber.row + 1, column:cucumber.column });

const parse = (input) => {    
    let lines = input.trim().split('\n');
    let data = {
        rowCount: lines.length,
        columnCount: lines[0].length
    };
    let rights = [];
    let downs = [];
    lines.map(line => line.split(''))
        .forEach((line, row) => line.forEach((char, column) => {
            if (char == '>') { rights.push({ row:row, column:column }); }
            if (char == 'V') { downs.push({ row:row, column:column }); }
        }));
    data.rights = rights;
    data.downs = downs;
    return data;
}

const render = (data) => {
    let rows = [];
    for (let i = 0; i < data.rowCount; i++) {
        let row = [];
        for (let j = 0; j < data.columnCount; j++) {
            row.push('.');
        }
        rows.push(row);
    }
    data.rights.forEach(cucumber => { rows[cucumber.row][cucumber.column] = '>'; })
    data.downs.forEach(cucumber => { rows[cucumber.row][cucumber.column] = 'V'; })
    return rows.map(row => row.join(''));
};
