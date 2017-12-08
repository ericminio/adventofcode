var expect = require('chai').expect;

var root = function(lines) {
    var holding = []
    for (var i=0; i<lines.length; i ++) {
        if (lines[i].indexOf('->') != -1) {
            holding.push(lines[i]);
        }
    }
    var bottom = undefined;
    for (var i=0; i<holding.length; i ++) {
        var candidate = holding[i].split(' ')[0];
        var found = false;
        for (var j=0; j<holding.length; j ++) {
            var list = holding[j].substring(holding[j].indexOf('->'));
            if (list.indexOf(candidate) != -1) {
                found = true;
            }
        }
        if (!found) {
            bottom = candidate;
        }
    }
    return { name: bottom, lines:lines };
};
var lineOf = function(node) {
    if (node.lines == undefined) { console.log('!!!'); console.log(node); }
    for (var i=0; i<node.lines.length; i ++) {
        if (node.lines[i].indexOf(node.name) == 0) {
            return node.lines[i];
        }
    }
};
var childrenOf = function(node) {
    var nodeLine = lineOf(node);
    if (nodeLine.indexOf('->') == -1) { return []; }
    var childrenNames = nodeLine.substring(nodeLine.indexOf('->')+2).split(',');
    var children = [];
    for (var i=0; i<childrenNames.length; i++) {
        children.push ({
            name: childrenNames[i].trim(),
            lines: node.lines
        });
    }
    return children;
};
var weightOf = function(node) {
    var line = lineOf(node);
    if (line == undefined) { console.log(node); }
    var start = line.indexOf('(');
    var end = line.indexOf(')');

    return parseInt(line.substring(start+1, end));
};
var calculateWeight = function(node) {
    node.weight = weightOf(node);
    var children = childrenOf(node);
    for (var i=0; i<children.length; i++) {
        calculateWeight(children[i]);
        node.weight += children[i].weight;
    }
};
var balance = function(node) {
    var children = childrenOf(node);
    if (children.length == 0) { return 0; }

    for (var i=0; i<children.length; i++) {
        calculateWeight(children[i]);
    }
    var weight = children[0].weight;
    for (var i=0; i<children.length; i++) {
        if (children[i].weight != weight) {
            return children[i].weight - weight;
        }
    }
    return 0;
};
var suspiciousChildOf = function(node) {
    var children = childrenOf(node);
    for (var i=0; i<children.length; i++) {
        calculateWeight(children[i]);
    }
    var weight = children[0].weight;
    var index = 0;
    for (var i=0; i<children.length; i++) {
        if (children[i].weight != weight) {
            index = i;
        }
    }
    return children[index];
};
describe('day 7 challenge', function() {
    it('contains part 1', function() {
        var content = require('fs').readFileSync('./2017/day.7/input.txt').toString().trim();
        var lines = content.split('\n');
        
        expect(root(lines).name).to.equal('eqgvf');
    });
    it('exploration of part 2', function() {
        var content = require('fs').readFileSync('./2017/day.7/input.txt').toString().trim();
        var lines = content.split('\n');
        var node = root(lines);

        node.name = 'exrud';
        console.log(node.name);
        console.log(weightOf(node));
        console.log(balance(node));

        var children = childrenOf(node);
        for (var i=0; i<children.length; i++) {
            calculateWeight(children[i]);
            console.log(children[i].name + '-' + children[i].weight);
        }

        node.name = 'gozhrsf';
        console.log(node.name);
        console.log(weightOf(node));
        console.log(balance(node));
    });
    it('contains part 2', function() {
        var content = require('fs').readFileSync('./2017/day.7/input.txt').toString().trim();
        var lines = content.split('\n');
        var node = root(lines);
        var suspect = suspiciousChildOf(node);
        while (balance(node) != 0 && balance(suspect) !=0) {
            node = suspect;
            suspect = suspiciousChildOf(node);
        }
        expect(weightOf(suspect)-balance(node)).to.equal(757);
    });
});
