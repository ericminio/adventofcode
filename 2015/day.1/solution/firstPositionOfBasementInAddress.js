const { floorOfAddress } = require('./floorOfAddress');

const firstPositionOfBasementInAddress = (address) => {
    for (var size = 1; size <= address.length; size++) {
        var stop = address.substring(0, size);
        if (floorOfAddress(stop) == -1) {
            return size;
        }
    }
};

module.exports = { firstPositionOfBasementInAddress };
