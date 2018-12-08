const { expect } = require('chai')
const { line } = require('../puzzle.input')

describe('day 8 challenge', ()=> {

    var buildNode = (input, current)=> {
        var node = { metadata: [], children: [] }
        if (input[current] == 0) {
            for (var index = current + 2; index < current + 2 + input[current + 1]; index++) {
                 node.metadata.push(input[index])
            }
            if (current > 1) {
                input[current - 2] --
                input.splice(current, 2 + input[current+1])
            }
        }
        else {
            var count = input[current]
            for (var i=0; i < count ; i++) {
                node.children.push(buildNode(input, current + 2))
            }
            var tmp = buildNode(input, current)
            node.metadata = tmp.metadata
        }
        return node
    }
    var buildTree = (input)=> {
        return buildNode(input, 0)
    }
    describe('part 1', ()=>{

        var computeValue = (node)=>{
            var value = 0
            for (var i=0; i < node.metadata.length; i++) {
                value += node.metadata[i]
            }
            for (var i=0; i < node.children.length; i++) {
                value += computeValue(node.children[i])
            }
            return value
        }
        var digest = (input)=> {
            var root = buildTree(input)
            return computeValue(root)
        }
        describe('exploration', ()=>{
            it('handles a single node with one metadata', ()=>{
                expect(digest([0, 1, 7])).to.equal(7)
            })
            it('handles a single node with several metadata', ()=>{
                expect(digest([0, 3, 3, 5, 7])).to.equal(15)
            })
            it('handles one child', ()=>{
                expect(digest([1, 1, 0, 1, 2, 3])).to.equal(5)
            })
            it('handles two children', ()=>{
                expect(digest([2, 2, 0, 1, 2, 0, 1, 3, 5, 5])).to.equal(15)
            })
        })

        it('handles the example', ()=>{
            expect(digest([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2,])).to.equal(138)
        })
        it('is solved', ()=>{
            input = line('day.8').split(' ').map((x)=> parseInt(x))
            expect(digest(input)).to.equal(45865)
        })
    })

    describe('part 2', ()=>{
        var computeValue = (node)=>{
            var value = 0
            if (node.children.length == 0) {
                for (var i=0; i < node.metadata.length; i++) {
                    value += node.metadata[i]
                }
            } else {
                for (var i=0; i < node.metadata.length; i++) {
                    var child = node.children[node.metadata[i]-1]
                    if (child !== undefined) {
                        value += computeValue(child)
                    }
                }
            }
            return value
        }
        var digest = (input)=> {
            var root = buildTree(input)
            return computeValue(root)
        }

        describe('tree', ()=>{
            it('handles a single node with one metadata', ()=>{
                expect(buildTree([0, 1, 7])).to.deep.equal({
                    metadata: [7],
                    children: []
                })
            })
            it('handles a single node with several metadata', ()=>{
                expect(buildTree([0, 3, 3, 5, 7])).to.deep.equal({
                    metadata: [3, 5, 7],
                    children: []
                })
            })
            it('handles one child', ()=>{
                expect(buildTree([1, 1, 0, 1, 2, 3])).to.deep.equal({
                    metadata: [3],
                    children: [
                        {
                            metadata: [2],
                            children: []
                        }
                    ]
                })
            })
            it('handles two children', ()=>{
                expect(buildTree([2, 2, 0, 1, 2, 0, 1, 3, 5, 5])).to.deep.equal({
                    metadata: [5, 5],
                    children: [
                        {
                            metadata: [2],
                            children: []
                        },
                        {
                            metadata: [3],
                            children: []
                        }
                    ]
                })
            })
        })
        describe('exploration', ()=>{
            it('handles a single node with one metadata', ()=>{
                expect(digest([0, 1, 7])).to.equal(7)
            })
            it('handles one child', ()=>{
                expect(digest([1, 1, 0, 1, 2, 1])).to.equal(2)
            })
            it('handles two children', ()=>{
                expect(digest([2, 2, 0, 1, 2, 0, 1, 3, 1, 2])).to.equal(5)
            })
            it('resists inexisting child', ()=>{
                expect(digest([2, 3, 0, 1, 2, 0, 1, 3, 1, 2, 3])).to.equal(5)
            })
            it('handles two generations', ()=>{
                expect(digest([2, 2, 0, 1, 2, 1, 1, 0, 1, 3, 1, 1, 2])).to.equal(2+3)
            })
            it('resists metadata entry of 0', ()=>{
                expect(digest([2, 3, 0, 1, 2, 0, 1, 3, 1, 0, 0])).to.equal(2)
            })
        })
        it('handles the example', ()=>{
            expect(digest([2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2])).to.equal(66)
        })
        it('is solved', ()=>{
            input = line('day.8').split(' ').map((x)=> parseInt(x))
            expect(digest(input)).to.equal(22608)
        })
    })
})
