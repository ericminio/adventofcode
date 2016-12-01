var expect = require('chai').expect;
var request = require('request');
var credentialsFor = require('../me');

describe.only('2016 day 1 challenge', function() {

    var url = 'http://adventofcode.com/2016/day/1/input';

    it('includes part 1', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            expect(howManyBlocksAway(input)).to.equal(209);
            done();
        });
    });

    it('includes part 2', function(done) {
        request({url: url, jar: credentialsFor(url)}, function(error, response, input) {
            expect(howManyBlocksAwayIsFirstPositionVisitedTwice(input)).to.equal(136);
            done();
        });
    });
});

var O = { x:0, y:0 };
var north = { xoffset:0, yoffset:1 };

var howManyBlocksAwayIsFirstPositionVisitedTwice = function(input) {
    var moves = input.split(',');
    var positions = [];
    var position = O;
    var direction = north;
    var found;
    for (var i=0; !found && i<moves.length; i++) {
        var step = moves[i].trim();
        direction = turn({ direction:direction }, step[0]);
        for (var footstep = 1; !found && footstep <= step.substring(1); footstep++) {
            position = move({position:position, direction:direction}, 1);
            if (positions.indexOf(JSON.stringify(position)) != -1) {
                found = position;
            }
            else {
                positions.push(JSON.stringify(position));
            }
        }
    }
    return distance(found);
};

var howManyBlocksAway = function(input) {

    var destination = walk({
        position : O,
        direction : north,
        moves: input.split(',')
    });
    return distance(destination.position);
};

var distance = function(position) {
    return Math.abs(position.x) + Math.abs(position.y);;
};

var walk = function(options) {
    if (options.moves.length == 0) {
        return options;
    }
    var step = options.moves[0].trim();
    options.direction = turn(options, step[0]);
    options.position = move(options, step.substring(1));
    options.moves.splice(0,1);

    return walk(options);
};

var move = function(options, footsteps) {
    return {
        x: options.position.x + options.direction.xoffset * footsteps,
        y: options.position.y + options.direction.yoffset * footsteps
    };
};

var turn = function(options, code) {
    if (code == 'L') { return turnLeft(options.direction); }
    if (code == 'R') { return turnRight(options.direction); }
};

var turnLeft = function(direction) {
    return {
        xoffset : -direction.yoffset,
        yoffset : direction.xoffset
    };
};

var turnRight = function(direction) {
    return {
        xoffset : direction.yoffset,
        yoffset : -direction.xoffset
    };
};

describe('turning', function() {

    var east = { xoffset:1, yoffset:0 };

    describe('left', function() {

        it('works', function() {
            expect(turnLeft(east)).to.deep.equal({ xoffset:-0, yoffset:1 });
        });
    });

    describe('right', function() {

        it('works', function() {
            expect(turnRight(east)).to.deep.equal({ xoffset:0, yoffset:-1 });
        });
    });
});

describe('Figuring out destination', function() {

    it('works when turning right', function() {
        expect(howManyBlocksAway('R2')).to.equal(2);
    });

    it('works when turning left', function() {
        expect(howManyBlocksAway('L3')).to.equal(3);
    });

    it('works when turning left twice', function() {
        expect(howManyBlocksAway('L1, L2')).to.equal(3);
    });

    it('works when going far', function() {
        expect(howManyBlocksAway('L100')).to.equal(100);
    });

    it('works when turning both left and right', function() {
        expect(howManyBlocksAway('R2, L3')).to.equal(5);
        expect(howManyBlocksAway('R2, R2, R2')).to.equal(2);
        expect(howManyBlocksAway('R5, L5, R5, R3')).to.equal(12);
        expect(howManyBlocksAway('L3, R2, L5, R1, L1, L2, L2, R1')).to.equal(7);
    });
});

describe('Finding position visited twice', function() {

    it('works', function() {
        expect(howManyBlocksAwayIsFirstPositionVisitedTwice('R8, R4, R4, R8')).to.equal(4);
    });
});
