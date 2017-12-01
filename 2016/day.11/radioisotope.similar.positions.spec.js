var expect = require('chai').expect;

describe('similar positions', function() {

    it('detects strict equality', function() {
        expect(positionsAreSimilar({
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:-1 }
            ]
        },{
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:-1 }
            ]
        })).to.equal(true);
    });
    it('resists unsorted items', function() {
        expect(positionsAreSimilar({
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:-1 },
                { floor:2, type:2 }, { floor:2, type:-2 }
            ]
        },{
            floorCount:2,
            elevator:1,
            items: [
                { floor:2, type:2 }, { floor:2, type:-2 },
                { floor:1, type:-1 }, { floor:1, type:1 }
            ]
        })).to.equal(true);
    });
    it('distinguishes floors', function() {
        expect(positionsAreSimilar({
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:1, type:-1 }
            ]
        },{
            floorCount:2,
            elevator:1,
            items: [
                { floor:2, type:1 }, { floor:2, type:-1 }
            ]
        })).to.equal(false);
    });
    it('works for a single couple', function() {
        expect(positionsAreSimilar({
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:1 }, { floor:2, type:-1 }
            ]
        },{
            floorCount:2,
            elevator:1,
            items: [
                { floor:1, type:2 }, { floor:2, type:-2 }
            ]
        })).to.equal(true);
    });
});
