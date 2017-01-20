var expect = require('chai').expect;

var equals = function(o) { return this.value == o.value; };
var root = {
    equals:equals, value:0,
    children: function() { return [
        {
            equals:equals, value:1,
            children: function() { return [
                { equals:equals, value:11, children: function() { return []; } },
                { equals:equals, value:12, children: function() { return []; } },
            ];}
        },
        {
            equals:equals, value:2, parent:root,
            children: function() { return [
                { equals:equals, value:21, children: function() { return []; } },
                { equals:equals, value:22, children: function() { return []; } },
            ];}
        },
    ];}
};

describe('Depth first maze path finder', function() {

    it('finds quickly when target is in first branch', function() {
        var find = new PathFinder();
        var data = find.findPath(root, root.children()[0].children()[0]);

        expect(data.visited).to.deep.equal([0, 1, 11]);
    });
    it('takes more iterations when target is in second branch', function() {
        var find = new PathFinder();
        var data = find.findPath(root, root.children()[1]);

        expect(data.visited).to.deep.equal([0, 1, 11, 12, 2]);
    });
    it('returns the path to found item', function() {
        var find = new PathFinder();
        var data = find.findPath(root, root.children()[1]);

        expect(data.path).to.deep.equal([0, 2]);
    });
});

var PathFinder = function() {};
PathFinder.prototype.findPath = function(current, target, visited) {
    if (!visited) { visited = [current.value]; }
    if (current.equals(target)) { return true; }

    var children = current.children();
    for (var i=0; i<children.length; i++) {
        var child = children[i];
        visited.push(child.value);
        if (this.findPath(child, target, visited) ) {
            var path = [];
            while (child.parent) {
                path.push(child.value);
                child = child.parent;
            }
            path.push(child.value);
            return {
                visited:visited,
                path: path.reverse()
            };
        }
    }
};
