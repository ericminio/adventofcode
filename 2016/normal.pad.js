module.exports = {
    layout:[
        '123',
        '456',
        '789'
    ],
    allows: function(position) {
        return this.digitOf(position) != undefined;
    },
    digitOf: function(position) {
        var line = this.layout[1-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[1+position.x];

        return digit;
    }
};
