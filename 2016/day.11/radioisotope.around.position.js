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
};
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

module.exports = around;
module.exports.isValid = isValid;
