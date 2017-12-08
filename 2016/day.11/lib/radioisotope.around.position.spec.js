var expect = require('chai').expect;
var around = require('./radioisotope.around.position');
var isValid = around.isValid;
var reAssignTypes = around.reAssignTypes;

describe.only('reAssignTypes', function() {
    it('works', function() {
        var items = [
            { id:1, type:-2 },
            { id:2, type:2 },
            { id:3, type:-1 },
            { id:4, type:1 }
        ];
        reAssignTypes(items);

        expect(items).to.deep.equal([
            { id:1, type:-1 },
            { id:2, type:1 },
            { id:3, type:-2 },
            { id:4, type:2 }
        ]);
    });
});

describe('around', function() {

    var position;
    var neighbours;

    beforeEach(function() {
        position = {
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:-1 },
                { floor:1, type:1 }
            ]
        };
        neighbours = around(position);
    });
    it('can move chip', function() {
        expect(neighbours).to.deep.include({
            floorCount:2,
            elevator:2,
            items: [
                { floor:1, type:-1 },
                { floor:2, type:1 }
            ]
        });
    });
    it('can move generator', function() {
        expect(neighbours).to.deep.include({
            floorCount:2,
            elevator:2,
            items: [
                { floor:1, type:1 },
                { floor:2, type:-1 }
            ]
        });
    });
    it('can move chip and generator together', function() {
        expect(neighbours).to.deep.include({
            floorCount:2,
            elevator:2,
            items: [
                { floor:2, type:-1 },
                { floor:2, type:1 }
            ]
        });
    });
    it('does not make extra strange moves', function() {
        expect(neighbours.length).to.equal(3);
    });
    describe('moving down', function() {
        beforeEach(function() {
            position = {
                floorCount:2,
                elevator:2,
                items: [
                    { floor:2, type:-1 },
                    { floor:2, type:1 }
                ]
            };
            neighbours = around(position);
        });
        it('can move generator', function() {
            expect(neighbours).to.deep.include({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 },
                    { floor:2, type:-1 }
                ]
            });
        });
    });
    describe('is valid', function() {
        it('when alone', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 }
                ]
            })).to.equal(true);
        });
        it('when connected', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:-1 },
                    { floor:1, type:1 }
                ]
            })).to.equal(true);
        });
        it('when connected and with another RTG', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 },
                    { floor:1, type:-1 },
                    { floor:1, type:-2 }
                ]
            })).to.equal(true);
        });
        it('when away from RTG', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 },
                    { floor:1, type:2 }
                ]
            })).to.equal(true);
        });
    });
    describe('is not valid', function() {
        it('when with another RTG', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 },
                    { floor:1, type:-2 }
                ]
            })).to.equal(false);
        });
        it('when with another connected RTG', function() {
            expect(isValid({
                floorCount:2,
                elevator:1,
                items: [
                    { floor:1, type:1 },
                    { floor:1, type:2 },
                    { floor:1, type:-2 }
                ]
            })).to.equal(false);
        });
    });
});
