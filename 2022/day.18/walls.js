const setWall = (id, map) => {
    Object.keys(map).forEach(key => {
        let neighbours = map[key].neighbours;
        let index = neighbours.indexOf(id);
        if (index !== -1) {
            neighbours.splice(index, 1);
        }
    });
    delete map[id];
};

module.exports = { setWall };
