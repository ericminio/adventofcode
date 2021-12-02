const { expect } = require('chai')
const { data } = require('../puzzle.input')

describe('day 2 challenge', ()=> {

    let example = data('day.2', 'example.txt');
    let challenge = data('day.2', 'input.txt');

    it('is about moving in part 1', ()=>{ 
        let commands = example.map(line => build(line, part1));
        let final = move({ horizontal:0, depth:0 }, commands);
        expect(final).to.deep.equal({ horizontal:15, depth:10 });
        expect(product(final)).to.equal(150);
    });   

    const build = (line, instructions) => {
        return instructions[line[0]](line[1]);
    }
    const move = (start, commands) => {
        return commands.reduce((position, move) => move(position), start);
    }
    const part1 = {
        'forward': (value) => (position) => { position.horizontal += value; return position; },
        'up': (value) => (position) => { position.depth -= value; return position; },
        'down': (value) => (position) => { position.depth += value; return position; },
    }
    const product = (position) => {
        return position.horizontal * position.depth;
    }

    it('starts with part 1', () => {
        let commands = challenge.map(line => build(line, part1));
        let final = move({ horizontal:0, depth:0 }, commands);
        expect(final).to.deep.equal({ horizontal:1909, depth:655 });
        expect(product(final)).to.equal(1250395);
    });

    it('is about moving aim in part 2', ()=>{ 
        let commands = example.map(line => build(line, part2));
        let final = move({ horizontal:0, depth:0, aim:0 }, commands);
        expect(final).to.deep.equal({ horizontal:15, depth:60, aim:10 });
        expect(product(final)).to.equal(900);
    });

    const part2 = {
        'forward': (value) => (position) => { 
            position.horizontal += value; 
            position.depth += value * position.aim;
            return position; 
        },
        'up': (value) => (position) => { position.aim -= value; return position; },
        'down': (value) => (position) => { position.aim += value; return position; },
    }

    it('continues with part 2', () => {
        let commands = challenge.map(line => build(line, part2));
        let final = commands.reduce(
            (position, move) => move(position), 
            { horizontal:0, depth:0, aim:0 });
        expect(final).to.deep.equal({ horizontal:1909, depth:760194, aim:655 });
        expect(product(final)).to.equal(1451210346);
    });
})
