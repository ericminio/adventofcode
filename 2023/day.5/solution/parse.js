const seeds = (line) =>
    /seeds:\s(.*)/
        .exec(line)[1]
        .split(' ')
        .map((e) => parseInt(e));

const mappings = (groups) =>
    groups.map((group) => {
        const mapping = group.split('\n');
        return {
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
        };
    });

export const parse = (input) => {
    const groups = input.split('\n\n');

    return { seeds: seeds(groups[0]), mappings: mappings(groups.splice(1)) };
};
