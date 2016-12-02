var pad = {
    layout: [
        '  1  ',
        ' 234 ',
        '56789',
        ' ABC ',
        '  D  '
    ],

    digitOf: function(position) {
        var line = this.layout[2-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[position.x];
        if (digit == ' ') { return undefined; }

        return digit;
    }
};

pad.allows = require('./pad.allows.position');
module.exports = pad;
