var Elf = function() {};

Elf.prototype.paperSurfaceFor = function(present) {
    return 2*present.length*present.width + 2*present.length*present.height + 2*present.width*present.height
            + Math.min(present.length*present.width, present.length*present.height, present.width*present.height)
};

Elf.prototype.paperSurfaceForDimensions = function(data) {
    var dimensions = data.split('x');
    return this.paperSurfaceFor({ length:dimensions[0], width:dimensions[1], height:dimensions[2] });
};

Elf.prototype.totalSurfaceForDimensions = function(set) {
    var presents = set.split('\n');
    var total = 0;
    for (var i=0; i<presents.length; i++) {
        if (presents[i].length >0) {
            total += this.paperSurfaceForDimensions(presents[i]);
        }
    }
    
    return total;
};

module.exports = Elf;
