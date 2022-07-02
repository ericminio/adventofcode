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
        it('does not happen when going right returns to the start', () => {
            let current = parse(`
                .>
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >.
            `));
        });
        it('happens going down', () => {
            let current = parse(`
                V
                V
                .
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                V
                .
                V
            `));
        });
        it('does not happen when going down returns to the start', () => {
            let current = parse(`
                .
                V
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                V
                .
            `));
        });
        it('happens going right against down soul', () => {
            let current = parse(`
                >V
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >V
            `));
        });
        it('happens going down against a right soul', () => {
            let current = parse(`
                V
                >
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                V
                >
            `));
        });
    });
    
    describe('blocked', () => {
    
        it('happens when there is nowhere to go on the right', () => {
            let current = parse(`
                >>
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >>
            `));
        });
        it('happens when there is nowhere to go down', () => {
            let current = parse(`
                V
                V
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                V
                V
            `));
        });
        it('happens when the map is just too small', () => {
            let current = parse(`
                >
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                >
            `));
        });
        it('happens when the map is just too small for down too', () => {
            let current = parse(`
                V
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                V
            `));
        });
    });

    describe('priority', () => {
    
        it('goes to right', () => {
            let current = parse(`
                V.
                >.
            `);
            let next = move(current);
            expect(render(next)).to.deep.equal(rendered(`
                ..
                V>
            `));
        });
    });
});

const rendered = (expected) => {
    return expected.trim().split('\n').map(line => line.trim());
};

const move = (current) => {
    let next = {
        rowCount: current.rowCount,
        columnCount: current.columnCount,
        rights: current.rights,
        downs: current.downs
    };
    next.rights = next.rights.map(cucumber => {
        return canNotMoveRight(cucumber, next) 
            ? cucumber 
            : moveRight(cucumber, next);
    });
    next.downs = next.downs.map(cucumber => {
        return canNotMoveDown(cucumber, next) 
            ? cucumber 
            : moveDown(cucumber, next);
    });
    return next;
};

const canNotMoveRight = (cucumber, data) => {
    return  !! data.rights.find(hasImmediateRightNeighbour(cucumber, data))
            ||
            !! data.downs.find(hasImmediateRightNeighbour(cucumber, data));
};
const hasImmediateRightNeighbour = (cucumber, data) => {
    return (other) => other.row == cucumber.row && 
                      other.column == (cucumber.column + 1) % data.columnCount;
};
const canNotMoveDown = (cucumber, data) => {
    return  !! data.rights.find(hasImmediateDownNeighbour(cucumber, data))
            ||
            !! data.downs.find(hasImmediateDownNeighbour(cucumber, data));
};
const hasImmediateDownNeighbour = (cucumber, data) => {
    return (other) => other.row == (cucumber.row + 1) % data.rowCount && 
                      other.column == cucumber.column;
};
const moveRight = (cucumber, data) => ({ row:cucumber.row, column:(cucumber.column + 1) % data.columnCount });
const moveDown = (cucumber, data) => ({ row:(cucumber.row + 1) % data.rowCount, column:cucumber.column });

const parse = (input) => {    
    let lines = input.trim().split('\n');
    let data = {
        rowCount: lines.length,
        columnCount: lines[0].length
    };
    let rights = [];
    let downs = [];
    lines.map(line => line.trim().split(''))
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
