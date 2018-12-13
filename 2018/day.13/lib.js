var crash = (carts, map)=>{
    for (var i = 0; i < carts.length; i++) {
        carts[i].move(map)
    }

    return inspect(carts)
}
var Cart = function(options) {
    this.position = options ? { x:options.x, y:options.y } : { x:0, y:0 }
    this.heading = options? options.heading : { x:0, y:0 }
}
Cart.prototype.collide = function(other) {
    return this.position.x == other.position.x && this.position.y == other.position.y
}
Cart.prototype.move = function(map) {
    this.position = {
        x:this.position.x + this.heading.x,
        y:this.position.y + this.heading.y
    }
}
var inspect = (carts)=>{
    sort(carts)
    var collision
    for (var i = 0; i < carts.length-1; i++) {
        if (carts[i].collide(carts[i+1])) {
            collision = carts[i].position
        }
    }

    return collision
}
var sort = (carts)=>{
    carts.sort((a, b)=>{
        if (b.position.y < a.position.y) { return 1 }
        if (b.position.x < a.position.x) { return 1 }
        return -1
    })
}

module.exports = {
    crash:crash,
    Cart:Cart,
    inspect:inspect,
    sort:sort
}
