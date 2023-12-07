export const transform = (source, mapping) => {
    const range = mapping.ranges.find(
        (r) => source >= r.source && source <= r.source + r.size,
    );
    if (!!range) {
        return range.destination + source - range.source;
    }

    return source;
};
