var Location = function(floors) {
    this.floors = floors;
    this.elevatorFloor = 3;
};

Location.prototype.neighbours = function() {
    var values = [];
    values.push(this.move(-1, [1]));
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
    target = target.substring(0, 3) + 'E' + target.substring(4);
    var source = this.floors[this.elevatorFloor];
    source = source.substring(0, 3) + '.' + source.substring(4);

    var itemCount = 0;
    var itemIndex = 6;
    for (var item=0; item<items.length; item++) {
        while (itemCount != items[item]) {
            while (source[itemIndex] == ' ' || source[itemIndex] == '.') {
                itemIndex ++;
            }
            itemCount ++;
            if (itemCount != items[item]) {
                itemIndex += 3;
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
