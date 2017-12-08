var expect = require('chai').expect;
var equal = require('deep-equal');
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
var clone = function(o) {
    return JSON.parse(JSON.stringify(o));
};
var positionsAreSimilar = function(a1, a2) {
    if (a1.elevator != a2.elevator) return false;
    var clone1 = clone(a1.items);
    var clone2 = clone(a2.items);
    reAssignTypes(clone1);
    reAssignTypes(clone2);

    return equal(clone1, clone2);
};

module.exports = positionsAreSimilar;
