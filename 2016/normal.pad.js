module.exports = {
    allows: function(position) {
        return this.digitOf(position) != undefined;
    },
    digitOf: function(position) {
        var pad = [
            '123',
            '456',
            '789'
        ];
        var line = pad[1-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[1+position.x];
        if (digit == undefined || digit == ' ') { return undefined; }

        return digit;
    }
};
