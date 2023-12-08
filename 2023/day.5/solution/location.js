export const location = (seed, garden, transform) =>
    garden.mappings.reduce((previous, mapping) => {
        const { destination, range } = transform(previous, mapping);
        garden.board[mapping.id] = range;
        return destination;
    }, seed);
