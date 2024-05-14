import { parse } from './parser.js';
import _ from 'lodash'

const gendiff = (file1, file2) => {
    const firstObject = parse(file1);
    const secondObject = parse(file2);
    const result = compare(firstObject, secondObject);
    console.log(result);
};

const compare = (obj1, obj2) => {
    return _.union(Object.keys(obj1), Object.keys(obj2))
        .sort(((a, b) => a.localeCompare(b)))
        .reduce((acc, key) => {
            if (obj1[key] === obj2[key]) {
                acc += `  ${key} = ${obj1[key]}\n`;
            } else {
                if (obj1[key] !== undefined) {
                    acc += `- ${key} = ${obj1[key]}\n`;
                };
                if (obj2[key] !== undefined) {
                    acc += `+ ${key} = ${obj2[key]}\n`;
                }
            };
        return acc;
        }, '{\n')
        .concat('}\n');
}

export {
    gendiff
};