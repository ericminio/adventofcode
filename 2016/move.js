module.exports = function(options, footsteps) {
    return {
        x: options.position.x + options.direction.xoffset * footsteps,
        y: options.position.y + options.direction.yoffset * footsteps
    };
};
