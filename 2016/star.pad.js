module.exports = {
    allows: function(position) {
        return this.digitOf(position) != undefined;
    },
    digitOf: function(position) {
        var pad = [
            '  1  ',
            ' 234 ',
            '56789',
            ' ABC ',
            '  D  '
        ];
        var line = pad[2-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[position.x];
        if (digit == undefined || digit == ' ') { return undefined; }

        return digit;
    }
};
