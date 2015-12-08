var Elf = function() {};

Elf.prototype.paperSurfaceFor = function(present) {
    return 2*present.length*present.width + 2*present.length*present.height + 2*present.width*present.height
            + Math.min(present.length*present.width, present.length*present.height, present.width*present.height)
};

module.exports = Elf;
