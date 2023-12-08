export const isMatchingRange = (source, range) =>
    source >= range.source && source <= range.source + range.size;
