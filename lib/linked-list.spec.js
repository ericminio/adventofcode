const { expect } = require('chai');
const { asArray, buildFromArray, pushLeft, pushRight } = require('./linked-list');

describe('linked list', () => {

    describe('build from array', () => {

        it('works with a single element', () => {
            let list = buildFromArray([1]);

            expect(list['0']).to.deep.equal({
                key: '0',
                value: 1,
                next: '0',
                previous: '0',
            });
        })

        it('works with two elements', () => {
            let list = buildFromArray([1, 2]);

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
    });

    describe('recreate array', () => {

        it('works', () => {
            let list = buildFromArray([1, 2, 3]);
            let array = asArray(list);

            expect(array).to.deep.equal([1, 2, 3]);
        });
    });

    describe('inversion', () => {

        it('can mean push right', () => {
            let incoming = [1, 2, 3, 4, 5];
            let list = buildFromArray(incoming);
            let inverted = asArray(pushRight(list, 1))

            expect(inverted).to.deep.equal([1, 3, 2, 4, 5]);
        });

        it('can mean push left', () => {
            let incoming = [1, 2, 3, 4, 5];
            let list = buildFromArray(incoming);
            let inverted = asArray(pushLeft(list, 3))

            expect(inverted).to.deep.equal([1, 2, 4, 3, 5]);
        });
    });

});
