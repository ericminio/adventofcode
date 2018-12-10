var Pool = function(size) {
    this.size = size
    this.next = -1
}
Pool.prototype.marble = function() {
    this.next ++
    return (this.next == this.size) ? null : this.next
}

var Circle = function() {
    this.current = 0
    this.marbles = []
}
Circle.prototype.play = function(marble) {
    if (marble > 1 && marble % 23 == 0) {
        if (this.current < 7) {
            var minus7index = this.marbles.length - (7-this.current)
        }
        else {
            var minus7index = this.current - 7
        }
        var removed = this.marbles[minus7index]
        this.marbles.splice(minus7index, 1)
        this.current = minus7index
        if (this.current > this.marbles.length-1) {
            this.current = 0
        }
        return removed
    }
    else {
        if (this.marbles.length == 0 || this.marbles.length == 1) {
            this.marbles.push(marble)
            this.current = this.marbles.length - 1
        }
        else {
            if (this.current < this.marbles.length-1) {
                this.marbles.splice(this.current+2, 0, marble);
                this.current += 2
            }
            else {
                this.marbles.splice(1, 0, marble);
                this.current = 1
            }
        }
    }
}

var Game = function(playerCount, pool) {
    this.pool = pool
    this.highscore = 0
    this.circle = new Circle()
    this.playerCount = playerCount
    this.player = 0
    this.score = {}
}
Game.prototype.start = function() {
    var marble = this.pool.marble()
    this.circle.play(marble)

    marble = this.pool.marble()
    while (marble != null) {
        // if (marble % 1000 == 0) { console.log(marble) }

        var chip = this.circle.play(marble)
        this.player ++
        if (this.player > this.playerCount) { this.player = 1}

        if (marble > 1 && marble % 23 == 0) {
            if (this.score[this.player] == undefined) {
                this.score[this.player] = 0
            }
            this.score[this.player] += marble+chip
        }

        marble = this.pool.marble()
    }

    Object.keys(this.score).forEach((key)=>{
        if (this.score[key] > this.highscore) {
            this.highscore = this.score[key]
        }
    })
    return this.highscore
}

module.exports = {
    Pool:Pool,
    Game:Game,
    Circle:Circle
}
