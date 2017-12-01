var expect = require('chai').expect;
var equal = require('deep-equal');
var clone = function(o) {
    return JSON.parse(JSON.stringify(o));
};
var byFloorAndType = function(e1, e2) {
    if (e1.floor < e2.floor) { return -1; }
    if (e1.floor > e2.floor) { return +1; }
    if (e1.type < e2.type) { return -1}
    if (e1.type > e2.type) { return +1}
};
var reAssignTypes = function(items) {
    var count = 0;
    for (var i=0; i<items.length; i++) {
        if (items[i].type > 0) {
            for (var j=0; j<items.length; j++) {
                if (items[j].type == -items[i].type) {
                    count ++;
                    items[i].type = count;
                    items[j].type = -count;
                }
            }
        }
    }
}
var positionsAreSimilar = function(a1, a2) {
    var p1 = clone(a1);
    var p2 = clone(a2);
    p1.items.sort(byFloorAndType);
    p2.items.sort(byFloorAndType);
    reAssignTypes(p1.items);
    reAssignTypes(p2.items);

    return equal(p1, p2);
};

module.exports = positionsAreSimilar;
