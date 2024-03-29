const powerDecomposition = (base, number) => {
    let max = 1;
    while (Math.floor(number / Math.pow(base, max)) > 1) {
        max ++;
    }
    let decomposition = [];
    for (let power = max ; power >= 0; power --) {
        let factor = Math.floor(number / Math.pow(base, power));
        decomposition.push(factor);
        number = number - factor * Math.pow(base, power);
    }

    return decomposition;
};

module.exports = { powerDecomposition };