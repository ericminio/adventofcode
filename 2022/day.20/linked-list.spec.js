const { expect } = require('chai');
const { add, lines } = require('../support');
const { fingerPrints } = require('./finger-prints');
const { pushCount } = require('./push-count');

describe.only('linked list', () => {

    describe('build from array', () => {

        it('works with a single element', () => {
            let list = buildFrom([1]);

            expect(list['0']).to.deep.equal({
                key: '0',
                value: 1,
                next: '0',
                previous: '0',
            });
        })

        it('works with two elements', () => {
            let list = buildFrom([1, 2]);

            expect(list['0']).to.deep.equal({
                key: '0',
                value: 1,
                next: '1',
                previous: '1',
            });
            expect(list['1']).to.deep.equal({
                key: '1',
                value: 2,
                next: '0',
                previous: '0',
            });
        });

        it('keeps track of first and last elements right from the start', () => {
            let list = buildFrom([1]);

            expect(list.first).to.equal('0');
            expect(list.last).to.equal('0');
        });

        it('keeps track of first and last elements after push', () => {
            let list = buildFrom([1, 2]);

            expect(list.first).to.equal('0');
            expect(list.last).to.equal('1');
        });
    });

    describe('recreate array', () => {

        it('works', () => {
            let list = buildFrom([1, 2, 3]);
            let array = asArray(list);

            expect(array).to.deep.equal([1, 2, 3]);
        });
    });

    describe('inversion', () => {

        it('can mean push right', () => {
            let incoming = [1, 2, 3, 4, 5];
            let list = buildFrom(incoming);
            let inverted = asArray(pushRight(list, 1))

            expect(inverted).to.deep.equal([1, 3, 2, 4, 5]);
        });

        it('can mean push left', () => {
            let incoming = [1, 2, 3, 4, 5];
            let list = buildFrom(incoming);
            let inverted = asArray(pushLeft(list, 3))

            expect(inverted).to.deep.equal([1, 2, 4, 3, 5]);
        });
    });

    it('can solve part 1', () => {
        let input = lines(`${__dirname}/data/input.txt`).map(line => parseInt(line));
        let list = buildFrom(input);

        expect(Object.keys(list).length).to.equal(input.length + 2);
        for (let i = 0; i < input.length; i++) {
            let value = input[i];
            let increment = value > 0 ? +1 : -1;
            let max = pushCount(value, input.length);
            for (let count = 0; count !== max; count += increment) {
                if (value > 0) { pushRight(list, i); } else { pushLeft(list, i); }
            }
        }
        let message = asArray(list);
        let total = fingerPrints(message).reduce(add);

        expect(total).to.equal(17490);
    });


});

const pushRight = (list, index) => {
    let a = list[index];
    let b = list[a.next];
    let around = {
        previous: list[a.key].previous,
        next: list[b.key].next,
    };
    b.next = a.key;
    a.previous = b.key;
    b.previous = around.previous;
    a.next = around.next;
    list[around.previous].next = b.key;
    list[around.next].previous = a.key;

    return list;
};

const pushLeft = (list, index) => {
    let b = list[nodeKey(index)];
    let a = list[b.previous];
    let around = {
        previous: list[a.key].previous,
        next: list[b.key].next,
    };
    b.next = a.key;
    a.previous = b.key;
    b.previous = around.previous;
    a.next = around.next;
    list[around.previous].next = b.key;
    list[around.next].previous = a.key;

    return list;
};

const asArray = (list) => {
    let size = Object.values(list).length - 2;
    let current = list[list.first];
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(current.value);
        current = list[current.next];
    }
    return array;
};

const buildFrom = (incoming) => {
    let key = nodeKey(0);
    let list = {};
    list[key] = { key, value: incoming[0], next: key, previous: key };
    list.first = key;
    list.last = key;

    for (let i = 1; i < incoming.length; i++) {
        let value = incoming[i];
        list = pushNode(i, value, list);
    }

    return list;
};
const nodeKey = (index) => {
    return `${index}`;
};
const pushNode = (index, value, list) => {
    let key = nodeKey(index);
    let node = { key, value, next: list.first, previous: list.last };
    list[list.last].next = key;
    list[list.first].previous = key;
    list[key] = node;
    list.last = key;

    return list;
}