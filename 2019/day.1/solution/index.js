const fuel = (mass) => Math.floor(mass / 3) - 2;

export const solvepartone = (masses) =>
    masses.reduce((total, mass) => total + fuel(mass), 0)

export const solveparttwo = (masses) =>
    masses.reduce((total, mass) => {
        let moduleFuel = fuel(mass);
        while (moduleFuel > 0) {
            total += moduleFuel;
            moduleFuel = fuel(moduleFuel);
        }
        return total;
    }, 0)

