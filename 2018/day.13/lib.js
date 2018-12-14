var crash = (carts, map)=>{
    var count = 100
    var impact = inspect(carts)
    while (impact === undefined && count > 0) {
        for (var i = 0; i < carts.length; i++) {
            carts[i].move(map)
        }
        impact = inspect(carts)
        count --
    }

    return impact
}
var displayCart = function(carts, index) {
    var cart
    for (var i=0; i<carts.length; i++){
        if (carts[i].id == index) {
            cart = carts[i]
        }
    }
    console.log(cart.id, cart.position, cart.heading);
}
var id = 0
var Cart = function(options) {
    this.position = options ? { x:options.x, y:options.y } : { x:0, y:0 }
    this.heading = options? options.heading? options.heading : { x:0, y:0 }: { x:0, y:0 }
    this.nextTurn = 'left'
    this.id = id++
}
Cart.prototype.collide = function(other) {
    return this.position.x == other.position.x && this.position.y == other.position.y
}
Cart.prototype.move = function(map) {
    this.position = {
        x:this.position.x + this.heading.x,
        y:this.position.y + this.heading.y
    }
    this.modifyHeading(map)
}
Cart.prototype.modifyHeading = function(map) {
    var turn
    var youAreHere
    for (var i=0; i<map.length; i++) {
        var node = map[i]
        if (node.position.x == this.position.x && node.position.y == this.position.y) {
            youAreHere = node
            break
        }
    }
    // console.log('you are here:', youAreHere);
    // console.log('heading:', this.heading);
    if (youAreHere.exits.length == 4) {
        if (this.nextTurn == 'left' && this.canTurn(youAreHere, this.left())) {
            turn = this.left()
            this.nextTurn = 'straight'
        }
        else if (this.nextTurn == 'straight' && this.canTurn(youAreHere, this.straight())) {
            turn = this.straight()
            this.nextTurn = 'right'
        }
        else if (this.nextTurn == 'right' && this.canTurn(youAreHere, this.right())) {
            turn = this.right()
            this.nextTurn = 'left'
        }
        // console.log('intersection', this.heading, turn);
    }
    else {
        for (var i=0; i<youAreHere.exits.length; i++) {
            var exit = youAreHere.exits[i]
            // console.log('exit', exit);
            if (exit.x + this.heading.x != 0 || exit.y + this.heading.y !=0 ) {
                turn = exit
                // console.log('this one');
            }
        }
    }
    this.heading = turn
    // console.log('new heading:', this.heading);
}
Cart.prototype.isNextTurn = function(to) {
    return this.nextTurn.x == to.x && this.nextTurn.y == to.y
}
Cart.prototype.canTurn = function(node, to) {
    var found
    node.exits.forEach((exit)=>{
        if (exit.x == to.x && exit.y == to.y) {
            found = true
        }
    })
    return found
}
Cart.prototype.left = function() {
    var turn = { x:this.heading.y, y:-this.heading.x }
    if (turn.y == -0) { turn.y = 0 }
    return turn
}
Cart.prototype.right = function() {
    var turn = { x:-this.heading.y, y:this.heading.x }
    if (turn.x == -0) { turn.x = 0 }
    return turn
}
Cart.prototype.straight = function() {
    return { x:this.heading.x, y:this.heading.y }
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
