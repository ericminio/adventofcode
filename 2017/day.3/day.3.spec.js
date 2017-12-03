var expect = require('chai').expect;

var turn = function(position) {
    if (position.counts.half==0) {
        position.direction = {
            dx: position.direction.dy == 0? 0: -position.direction.dy,
            dy: position.direction.dx
        };
        position.counts.times --;
        if (position.counts.times == 0) {
            position.counts.stepCount ++;
            position.counts.times = 2;
        }
        position.counts.half = position.counts.stepCount;
    }
    return position;
};
var move = function(position) {
    var next = {
        x: position.x + position.direction.dx,
        y: position.y + position.direction.dy,
        value: position.value + 1,
        direction: position.direction,
        counts: position.counts
    };
    next.counts.half --;
    next = turn(next);
    return next;
};
var move2 = function(position, encryptedPositions) {
    var next = {
        x: position.x + position.direction.dx,
        y: position.y + position.direction.dy,
        direction: position.direction,
        counts: position.counts
    };
    next.value = encript(next, encryptedPositions);
    next.counts.half --;
    next = turn(next);
    return next;
};
var encript = function(position, positions) {
    var value =
        valueAt(position.x-1, position.y, positions)
        + valueAt(position.x-1, position.y+1, positions)
        + valueAt(position.x, position.y+1, positions)
        + valueAt(position.x+1, position.y+1, positions)
        + valueAt(position.x+1, position.y, positions)
        + valueAt(position.x+1, position.y-1, positions)
        + valueAt(position.x, position.y-1, positions)
        + valueAt(position.x-1, position.y-1, positions)
        ;
    return value;
};
var valueAt = function(x, y, positions) {
    for (var i=0; i<positions.length; i++) {
        if (x == positions[i].x && y == positions[i].y) {
            return positions[i].value;
        }
    }
    return 0;
};

describe('day 3 challenge', function() {
    it('exploration of part 1', function() {
        var position = {
            x:0, y:0, value:1, direction: { dx:1, dy:0 },
            counts: {
                stepCount:1,
                times:2,
                half:1
            }
        };
        for (var i=0; i<15; i++) {
            position = move(position);
        }
        expect(position).to.deep.equal({
            x:-1, y:2, value:16,
            direction: { dx:-1, dy:0 },
            counts: {
                stepCount:4,
                times:2,
                half:1
            }
        });
    });
    it('contains part 1', function() {
        var position = {
            x:0, y:0, value:1, direction: { dx:1, dy:0 },
            counts: {
                stepCount:1,
                times:2,
                half:1
            }
        };
        while (position.value != 277678) {
            position = move(position);
        }
        expect(Math.abs(position.x)+Math.abs(position.y)).to.equal(475);
    });
    it('exploration of part 2', function() {
        var position = {
            x:0, y:0, value:1, direction: { dx:1, dy:0 },
            counts: {
                stepCount:1,
                times:2,
                half:1
            }
        };
        var encryptedPositions = [{x:0, y:0, value:1}];
        for (var i=0; i<5; i++) {
            position = move2(position, encryptedPositions);
            encryptedPositions.push({ x:position.x, y:position.y, value:position.value });
        }

        expect(encryptedPositions[encryptedPositions.length-1]).to.deep.equal(
            {x:-1, y:0, value:10 }
        );
    });
    it('contains part 2', function() {
        var position = {
            x:0, y:0, value:1, direction: { dx:1, dy:0 },
            counts: {
                stepCount:1,
                times:2,
                half:1
            }
        };
        var encrypted = {x:0, y:0, value:1};
        var encryptedPositions = [encrypted];
        while (encrypted.value < 277678) {
            position = move2(position, encryptedPositions);
            encrypted = { x:position.x, y:position.y, value:position.value };
            encryptedPositions.push(encrypted);
        }

        expect(encrypted.value).to.equal(279138);
    });
});
