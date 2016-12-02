var pad = {
    layout:[
        '123',
        '456',
        '789'
    ],

    digitOf: function(position) {
        var line = this.layout[1-position.y];
        if (line == undefined) { return undefined; }
        var digit = line[1+position.x];

        return digit;
    }
};

pad.allows = require('./pad.allows.position');
module.exports = pad;
