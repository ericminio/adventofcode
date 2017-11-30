var expect = require('chai').expect;
var clone = function(o) {
    return JSON.parse(JSON.stringify(o));
};
var isFloorSafe = function(floor, position) {
    var chips = [];
    var generators = [];
    for (var i=0; i<position.items.length; i++) {
        var item = position.items[i];
        if (item.floor == floor ) {
            if (item.type > 0) {
                chips.push(item);
            } else {
                generators.push(item);
            }
        }
    }
    if (generators.length == 0) { return true; }
    for (var i=0; i<chips.length; i++) {
        var isChipSafe = false;
        for (var j=0; j<generators.length; j++) {
            if (generators[j].type + chips[i].type == 0) {
                isChipSafe = true;
            }
        }
        if (!isChipSafe) { return false; }
    }
    return true;
}
var isValid = function(position) {
    if (position.elevator > position.floorCount
        || position.elevator < 1) {
        return false;
    }
    for (var i=1; i<=position.elevator; i++) {
        if (!isFloorSafe(i, position)) {
            return false;
        }
    }
    return true;
}
var singleMoves = function(position, itemOnFloorIndexes, targetFloor) {
    var moves = [];
    for (var i=0; i<itemOnFloorIndexes.length; i++) {
        var move = clone(position);
        move.elevator = targetFloor;
        move.items[itemOnFloorIndexes[i]].floor = targetFloor;
        if (isValid(move)) { moves.push(move); }
    }
    return moves;
}
var doubleMoves = function(position, itemOnFloorIndexes, targetFloor) {
    var moves = [];
    for (var i=0; i<itemOnFloorIndexes.length; i++) {
        for (var j=i+1; j<itemOnFloorIndexes.length; j++) {
            var move = clone(position);
            move.elevator = targetFloor;
            move.items[itemOnFloorIndexes[i]].floor = targetFloor;
            move.items[itemOnFloorIndexes[j]].floor = targetFloor;
            if (isValid(move)) { moves.push(move); }
        }
    }
    return moves;
}
var around = function(position) {
    var moves = [];
    var itemOnFloorIndexes = [];
    for (var i=0; i<position.items.length; i++) {
        if (position.items[i].floor == position.elevator) {
            itemOnFloorIndexes.push(i);
        }
    }
    moves = moves.concat(singleMoves(position, itemOnFloorIndexes, position.elevator + 1));
    moves = moves.concat(doubleMoves(position, itemOnFloorIndexes, position.elevator + 1));
    moves = moves.concat(singleMoves(position, itemOnFloorIndexes, position.elevator - 1));
    moves = moves.concat(doubleMoves(position, itemOnFloorIndexes, position.elevator - 1));

    return moves;
}

describe('around', function() {

    var position;
    var neighbours;

    beforeEach(function() {
        position = {
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 },
                { floor:1, type:-1 }
            ]
        };
        neighbours = around(position);
    });
    it('can move chip', function() {
        expect(neighbours).to.deep.include({
            floorCount:2,
            elevator:2,
            items: [
                { floor:2, type:1 },
                { floor:1, type:-1 }
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
                { floor:2, type:1 },
                { floor:2, type:-1 }
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
                    { floor:2, type:1 },
                    { floor:2, type:-1 }
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
                    { floor:1, type:1 },
                    { floor:1, type:-1 }
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
