import { parse } from './parser.js'

const gendiff = (file1, file2) => {
    const firstObject = parse(file1);
    const secondObject = parse(file2);
};

export {
    gendiff
};