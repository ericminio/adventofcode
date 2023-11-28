const floorOfAddress = (address) => {
    return address.split('(').length - address.split(')').length;
};

module.exports = { floorOfAddress };
