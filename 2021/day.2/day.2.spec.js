const { expect } = require('chai')
const { lines } = require('../puzzle.input')

describe('day 2 challenge', ()=> {

    let example = lines('day.2', 'example.txt');
    let challenge = lines('day.2', 'input.txt');

    it('is about moving in part 1', ()=>{ 
        let commands = example.map(line => build(line));
        let final = commands.reduce(
            (position, move) => move(position), 
            { horizontal:0, depth:0 });
        expect(final).to.deep.equal({ horizontal:15, depth:10 });
        expect(product(final)).to.equal(150);
    });   

    const instructions = {
        'forward': (value) => (position) => { position.horizontal += value; return position; },
        'up': (value) => (position) => { position.depth -= value; return position; },
        'down': (value) => (position) => { position.depth += value; return position; },
    }
    const build = (line) => {
        let parts = line.trim().split(' ');
        let value = parseInt(parts[1]);
        return instructions[parts[0]](value);
    }
    const product = (position) => {
        return position.horizontal * position.depth;
    }

    it('has part 1', () => {
        let commands = challenge.map(line => build(line));
        let final = commands.reduce(
            (position, move) => move(position), 
            { horizontal:0, depth:0 });
        expect(final).to.deep.equal({ horizontal:1909, depth:655 });
        expect(product(final)).to.equal(1250395);
    });

    it('is about moving aim in part 2', ()=>{ 
        let commands = example.map(line => build2(line));
        let final = commands.reduce(
            (position, move) => move(position), 
            { horizontal:0, depth:0, aim:0 });
        expect(final).to.deep.equal({ horizontal:15, depth:60, aim:10 });
        expect(product(final)).to.equal(900);
    });
    const instructions2 = {
        'forward': (value) => (position) => { 
            position.horizontal += value; 
            position.depth += value * position.aim;
            return position; 
        },
        'up': (value) => (position) => { position.aim -= value; return position; },
        'down': (value) => (position) => { position.aim += value; return position; },
    }
    const build2 = (line) => {
        let parts = line.trim().split(' ');
        let value = parseInt(parts[1]);
        return instructions2[parts[0]](value);
    }

    it('has part 2', () => {
        let commands = challenge.map(line => build2(line));
        let final = commands.reduce(
            (position, move) => move(position), 
            { horizontal:0, depth:0, aim:0 });
        expect(final).to.deep.equal({ horizontal:1909, depth:760194, aim:655 });
        expect(product(final)).to.equal(1451210346);
    });

})
