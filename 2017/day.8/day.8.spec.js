var expect = require('chai').expect;

var conditions = [
    { operator:'>', applies:function(candidate, value) { return candidate > value; }},
    { operator:'>=', applies:function(candidate, value) { return candidate >= value; }},
    { operator:'<', applies:function(candidate, value) { return candidate < value; }},
    { operator:'<=', applies:function(candidate, value) { return candidate <= value; }},
    { operator:'==', applies:function(candidate, value) { return candidate == value; }},
    { operator:'!=', applies:function(candidate, value) { return candidate != value; }}
];
var actions = {
    inc: function(base, value) { return base + value; },
    dec: function(base, value) { return base - value; }
};
var digest = function(instruction, registers) {
    var parts = instruction.split(' ');

    var name = parts[0];
    if (!registers[name]) { registers[name]=0; }
    var conditionSource = parts[4];
    if (!registers[conditionSource]) { registers[conditionSource]=0; }

    var conditionOperator = parts[5];
    var conditionValue = parseInt(parts[6]);
    var active = false;
    for (var i=0; i<conditions.length; i++) {
        var condition = conditions[i];
        if (condition.operator == conditionOperator
         && condition.applies(registers[conditionSource], conditionValue)) {
                active = true;
                break;
        }
    }
    if (active) {
        var operation = parts[1];
        var operand = parseInt(parts[2]);
        registers[name] = actions[operation](registers[name], operand);
    }
};
var maxIn = function(registers, currentMax) {
    var max = currentMax;
    var keys = Object.keys(registers);
    for (var i=0; i<keys.length; i++) {
        if (registers[keys[i]] > max) {
            max = registers[keys[i]];
        }
    }
    return max;
};
describe('day 8 challenge', function() {
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.8/input.txt').toString().trim();
        var lines = content.split('\n');

        var registers = {};
        for (var i=0; i<lines.length; i++) {
            var line = lines[i];
            digest(line, registers);
        }
        var max = maxIn(registers, 0);
        expect(max).to.equal(3089);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.8/input.txt').toString().trim();
        var lines = content.split('\n');

        var registers = {};
        var max = 0
        for (var i=0; i<lines.length; i++) {
            var line = lines[i];
            digest(line, registers);
            max = maxIn(registers, max);
        }
        expect(max).to.equal(5391);
    });
});
