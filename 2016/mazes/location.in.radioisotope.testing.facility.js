var Location = function(floors) {
    this.floors = floors;
    for (var floor=0; floor<this.floors.length; floor++) {
        if (floors[floor].indexOf('E') != -1) {
            this.elevatorFloor = floor;
        }
    }
};

Location.prototype.neighbours = function() {
    var values = [];
    values.push(this.move(-1, [1]));
    values.push(this.move(-1, [2]));
    values.push(this.move(-1, [1, 2]));
    return values;
};
Location.prototype.move = function(direction, items) {
    var location = [];
    for (var floor=0; floor<this.floors.length; floor++) {
        if (floor != this.elevatorFloor && floor != (this.elevatorFloor+direction)) {
            location.push(this.floors[floor]);
        }
    }
    var target = this.floors[this.elevatorFloor + direction];
    var source = this.floors[this.elevatorFloor];
    target = target.substring(0, 3) + 'E' + target.substring(4);
    source = source.substring(0, 3) + '.' + source.substring(4);

    var itemCount = 0;
    var itemIndex = 3;
    for (var item=0; item<items.length; item++) {
        var searchedItem = items[item];
        while (itemCount != searchedItem) {
            itemIndex += 3;
            if (source[itemIndex] != ' ' && source[itemIndex] != '.') {
                itemCount ++;
            }
        }
        target = target.substring(0, itemIndex) + source.substring(itemIndex, itemIndex+3) + target.substring(itemIndex+3);
        source = source.substring(0, itemIndex) + '.  ' + source.substring(itemIndex+3);
    }

    location.push(target);
    location.push(source);

    return location;
};

module.exports = Location;
