export const seeds = (line) =>
    /seeds:\s(.*)/
        .exec(line)[1]
        .split(' ')
        .map((e) => parseInt(e));

export const parse = (input) => {
    const groups = input.split('\n\n');
    const garden = {};
    garden.seeds = seeds(groups[0]);
    garden.mappings = [];

    for (let i = 1; i < groups.length; i++) {
        const group = groups[i];
        const mapping = group.split('\n');
        garden.mappings.push({
            id: /(.*)\smap:/.exec(mapping[0].trim())[1],
            ranges: mapping
                .splice(1)
                .map((e) => e.trim())
                .filter((e) => e.length > 0)
                .map((e) => {
                    const values = e.split(' ');
                    return {
                        size: parseInt(values[2]),
                        source: parseInt(values[1]),
                        destination: parseInt(values[0]),
                    };
                }),
        });
    }

    return garden;
};
