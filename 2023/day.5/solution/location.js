export const location = (seed, garden, transform) =>
    garden.mappings.reduce(
        (previous, mapping) => transform(previous, mapping).destination,
        seed,
    );
