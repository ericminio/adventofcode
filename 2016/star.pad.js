module.exports = {
    layout: [
        '  1  ',
        ' 234 ',
        '56789',
        ' ABC ',
        '  D  '
    ],

    allows: function(position) {
        return this.digitOf(position) != undefined;
    },
    digitOf: function(position) {
        var line = this.layout[2-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[position.x];
        if (digit == ' ') { return undefined; }

        return digit;
    }
};
