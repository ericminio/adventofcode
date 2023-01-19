class Chronos {
    constructor() {
        this.start();
    }
    start() {
        this.tops = [];
        this.timestamp = new Date().getTime();
    }
    top(label) {
        const top = { delay: this.delay(), label };
        this.tops.push(top);

        console.log(`${top.delay}: ${top.label}`);
    }

    delay() {
        let ms = new Date().getTime();
        return ms - this.timestamp;
    }
}

module.exports = { Chronos };