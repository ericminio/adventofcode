module.exports = {
    allows: function(position) {
        return this.digitOf(position) != undefined;
    },
    digitOf: function(position) {
        if (position.x == 2 && position.y == 2) { return '1'; }
        if (position.x == 1 && position.y == 1) { return '2'; }
        if (position.x == 2 && position.y == 1) { return '3'; }
        if (position.x == 3 && position.y == 1) { return '4'; }
        if (position.x == 0 && position.y == 0) { return '5'; }
        if (position.x == 1 && position.y == 0) { return '6'; }
        if (position.x == 2 && position.y == 0) { return '7'; }
        if (position.x == 3 && position.y == 0) { return '8'; }
        if (position.x == 4 && position.y == 0) { return '9'; }
        if (position.x == 1 && position.y == -1) { return 'A'; }
        if (position.x == 2 && position.y == -1) { return 'B'; }
        if (position.x == 3 && position.y == -1) { return 'C'; }
        if (position.x == 2 && position.y == -2) { return 'D'; }
    }
};
