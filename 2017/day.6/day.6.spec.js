var expect = require('chai').expect;
var hasher = require('node-object-hash')();

var buildFrom= function(content) {
    var banks = [];
    var values = content.split('\t');
    for (var i=0; i<values.length; i++) {
        var bank = { id:i, blocks:parseInt(values[i]), next:i+1 };
        banks.push(bank);
    }
    banks[banks.length-1].next = 0;
    return banks;
};
var nextBankId = function(data) {
    var candidate = 0;
    var value = 0;
    for (var i=0; i<data.length; i++) {
        if (value < data[i].blocks) {
            candidate = i;
            value = data[i].blocks;
        }
    }
    return candidate;
};
var redistribute = function(data, index) {
    var i = index;
    var count = data[i].blocks;
    data[i].blocks = 0;
    while (count > 0) {
        i = data[i].next;
        data[i].blocks ++;
        count --;
    }
};
var clone = function(data) {
    return JSON.parse(JSON.stringify(data));
};

describe('day 6 challenge', function() {
    it('exploration of part 1', function() {
        var data = buildFrom('0\t2\t7\t0');
        var visited = {};
        var inifiniteLoopDetected = 0;
        while (!visited[hasher.hash(data)] == 1) {
            visited[hasher.hash(data)] = 1;
            redistribute(data, nextBankId(data));
            inifiniteLoopDetected ++;
        }

        expect(inifiniteLoopDetected).to.equal(5);
    });
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.6/input.txt').toString().trim();
        var data = buildFrom(content);
        var visited = {};
        var inifiniteLoopDetected = 0;
        while (!visited[hasher.hash(data)]) {
            visited[hasher.hash(data)] = 1;
            redistribute(data, nextBankId(data));
            inifiniteLoopDetected ++;
        }

        expect(inifiniteLoopDetected).to.equal(14029);
    });
    it('exploration of part 2', function() {
        var data = buildFrom('0\t2\t7\t0');
        var visited = {};
        var cycleCount = 0;
        while (!visited[hasher.hash(data)]) {
            cycleCount ++;
            visited[hasher.hash(data)] = cycleCount;
            redistribute(data, nextBankId(data));
        }

        expect(cycleCount - visited[hasher.hash(data)] + 1).to.equal(4);
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.6/input.txt').toString().trim();
        var data = buildFrom(content);
        var visited = {};
        var cycleCount = 0;
        while (!visited[hasher.hash(data)]) {
            cycleCount ++;
            visited[hasher.hash(data)] = cycleCount;
            redistribute(data, nextBankId(data));
        }

        expect(cycleCount - visited[hasher.hash(data)] + 1).to.equal(2765);
    });
});
