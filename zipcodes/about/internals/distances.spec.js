import { expect } from 'chai';

export const distances = (distribution, zipcodes) => {
    return Object.keys(distribution).map((a) => {
        return Object.keys(distribution).map((b) => {
            return (
                zipcodes[b].x - zipcodes[a].x + zipcodes[b].y - zipcodes[a].y
            );
        });
    });
};

describe('distances', () => {
    it('works for two nodes', () => {
        const distribution = { 111: 15, 222: 42 };
        const zipcodes = { 111: { x: 1, y: 1 }, 222: { x: 10, y: 10 } };

        expect(distances(distribution, zipcodes)).to.deep.equal({
            111: { distances: { 222: 18 } },
            222: { distances: { 111: 18 } },
        });
    });
});
