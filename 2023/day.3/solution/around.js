export const around = (candidate) => {
    const around = [];
    for (let x = candidate.startIndex - 1; x <= candidate.endIndex + 1; x++) {
        around.push({ x, y: candidate.lineIndex - 1 });
        around.push({ x, y: candidate.lineIndex + 1 });
    }
    around.push({ x: candidate.startIndex - 1, y: candidate.lineIndex });
    around.push({ x: candidate.endIndex + 1, y: candidate.lineIndex });

    return around;
};
