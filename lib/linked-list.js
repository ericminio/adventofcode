const pushRight = (list, key) => {
    let a = list[key];
    let b = list[a.next];
    return invert(a, b, list);
};

const pushLeft = (list, key) => {
    let b = list[key];
    let a = list[b.previous];
    return invert(a, b, list);
};

const invert = (a, b, list) => {
    let around = {
        previous: list[a.key].previous,
        next: list[b.key].next,
    };
    b.next = a.key;
    a.previous = b.key;
    b.previous = around.previous;
    a.next = around.next;
    list[around.previous].next = b.key;
    list[around.next].previous = a.key;

    return list;
};

const asArray = (list) => {
    let size = Object.values(list).length;
    let current = list[nodeKey(0)];
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(current.value);
        current = list[current.next];
    }
    return array;
};

const buildFromArray = (incoming) => {
    const pushNode = (index, value, list) => {
        let key = nodeKey(index);
        let node = { key, value, next: list.first, previous: list.last };
        list[list.last].next = key;
        list[list.first].previous = key;
        list[key] = node;
        list.last = key;

        return list;
    };
    let key = nodeKey(0);
    let list = {};
    list[key] = { key, value: incoming[0], next: key, previous: key };
    list.first = key;
    list.last = key;

    for (let i = 1; i < incoming.length; i++) {
        let value = incoming[i];
        list = pushNode(i, value, list);
    }

    delete list.first;
    delete list.last;
    return list;
};
const nodeKey = (index) => {
    return `${index}`;
};

module.exports = { asArray, buildFromArray, pushLeft, pushRight };