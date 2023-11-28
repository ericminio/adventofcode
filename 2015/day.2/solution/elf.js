var Elf = function () {};

Elf.prototype.paperSurfaceFor = function (present) {
    return (
        2 * present.length * present.width +
        2 * present.length * present.height +
        2 * present.width * present.height +
        Math.min(
            present.length * present.width,
            present.length * present.height,
            present.width * present.height
        )
    );
};

Elf.prototype.ribbonLengthFor = function (present) {
    return (
        present.length * present.width * present.height +
        2 *
            Math.min(
                present.length + present.width,
                present.length + present.height,
                present.width + present.height
            )
    );
};

Elf.prototype.paperSurfaceForDimensions = function (data) {
    const dimensions = data.split('x').map((v) => parseInt(v));
    return this.paperSurfaceFor({
        length: dimensions[0],
        width: dimensions[1],
        height: dimensions[2],
    });
};

Elf.prototype.totalSurfaceForDimensions = function (set) {
    return set
        .split('\n')
        .filter((entry) => entry.length > 0)
        .reduce(
            (total, present) => total + this.paperSurfaceForDimensions(present),
            0
        );
};

Elf.prototype.ribonLength = function (data) {
    const dimensions = data.split('x').map((v) => parseInt(v));
    return this.ribbonLengthFor({
        length: dimensions[0],
        width: dimensions[1],
        height: dimensions[2],
    });
};

Elf.prototype.totalRibonLength = function (set) {
    return set
        .split('\n')
        .filter((entry) => entry.length > 0)
        .reduce((total, present) => total + this.ribonLength(present), 0);
};

module.exports = Elf;
