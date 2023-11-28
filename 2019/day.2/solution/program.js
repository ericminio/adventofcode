class Program {
    constructor(input) {
        this.values = input.split(',').map((e) => parseInt(e));
        this.cursor = 0;
    }

    run() {
        while (this.values[this.cursor] !== 99) {
            this.runAtCursor();
            this.cursor += 4;
        }
        return this.values;
    }

    runAtCursor() {
        if (this.values[this.cursor] === 1) {
            this.values[this.values[this.cursor + 3]] =
                this.values[this.values[this.cursor + 1]] +
                this.values[this.values[this.cursor + 2]];
        } else if (this.values[this.cursor] === 2) {
            this.values[this.values[this.cursor + 3]] =
                this.values[this.values[this.cursor + 1]] *
                this.values[this.values[this.cursor + 2]];
        }
        return this.values;
    }
}

module.exports = Program;
