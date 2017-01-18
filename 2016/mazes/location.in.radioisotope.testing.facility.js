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
    var itemCount = this.itemCountInElevatorFloor();
    for (var i=1; i<=itemCount; i++) {
        if (this.elevatorFloor > 0) { values.push(this.move(-1, [i])); }
        if (this.elevatorFloor < this.floors.length-1) { values.push(this.move(1, [i])); }
    }
    for (var i=1; i<=itemCount; i++) {
        for (var j=i+1; j<=itemCount; j++) {
            if (this.elevatorFloor > 0) { values.push(this.move(-1, [i, j])); }
            if (this.elevatorFloor < this.floors.length-1) { values.push(this.move(1, [i, j])); }
        }
    }
    return values;
};
Location.prototype.move = function(direction, items) {
    var moving = {
        source: this.floors[this.elevatorFloor],
        target: this.floors[this.elevatorFloor + direction]
    };
    for (var item=0; item<items.length; item++) {
        moving.index = this.indexOfItemInElevatorFloor(items[item]);
        moving = this.moveItemAtGivenIndex(moving);
    }
    moving.index = 3;
    var moved = this.moveItemAtGivenIndex(moving);

    var locations = this.floors.slice(0);
    locations[this.elevatorFloor] = moved.source;
    locations[this.elevatorFloor+direction] = moved.target;
    return locations;
};

Location.prototype.moveItemAtGivenIndex = function(options) {
    return {
        source: options.source.substring(0, options.index) + '.  ' + options.source.substring(options.index+3),
        target: options.target.substring(0, options.index) + options.source.substring(options.index, options.index+3) + options.target.substring(options.index+3)
    };
};

Location.prototype.indexOfItemInElevatorFloor = function(searchedItem) {
    return this.scanElevatorFloorUntil(function(data) {
        return data.itemCount == searchedItem;
    }).cursor;
};
Location.prototype.itemCountInElevatorFloor = function() {
    return this.scanElevatorFloorUntil(function(data) {
        return data.source[data.cursor] === undefined;
    }).itemCount;
};
Location.prototype.scanElevatorFloorUntil = function(stop) {
    var data = {
        source: this.floors[this.elevatorFloor],
        cursor: 3,
        itemCount: 0
    };
    while (!stop(data)) {
        data.cursor += 3;
        var char = data.source[data.cursor];
        if (char && char != ' ' && char != '.') {
            data.itemCount ++;
        }
    }

    return data;
};

module.exports = Location;
