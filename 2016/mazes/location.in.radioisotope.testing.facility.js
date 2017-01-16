var Location = function(floors) {

};

Location.prototype.neighbours = function() {
    return [
        [
            'F4 .  .  .  .  .  ',
            'F3 .  .  .  LG .  ',
            'F2 E  HG HM  .  .  ',
            'F1    .  .   .  LM '
        ]
    ];
};

module.exports = Location;
