module.exports = {
    allows: function(position) {
        return Math.abs(position.y) < 2 && Math.abs(position.x) < 2;
    },
    digitOf: function(position) {
        if (position.x == -1 && position.y == 1) { return '1'; }
        if (position.x == 0 && position.y == 1) { return '2'; }
        if (position.x == 1 && position.y == 1) { return '3'; }
        if (position.x == -1 && position.y == 0) { return '4'; }
        if (position.x == 0 && position.y == 0) { return '5'; }
        if (position.x == 1 && position.y == 0) { return '6'; }
        if (position.x == -1 && position.y == -1) { return '7'; }
        if (position.x == 0 && position.y == -1) { return '8'; }
        if (position.x == 1 && position.y == -1) { return '9'; }
    }
};
