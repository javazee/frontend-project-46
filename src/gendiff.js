/* eslint-disable no-param-reassign */
import _ from 'lodash';
import parse from './parser.js';

const compare = (obj1, obj2) => {
  const uniqKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = uniqKeys.sort(((a, b) => a.localeCompare(b)))
    .reduce((acc, key) => {
      if (obj1[key] === obj2[key]) {
        acc += `  ${key} = ${obj1[key]}\n`;
      } else {
        if (obj1[key] !== undefined) {
          acc += `- ${key} = ${obj1[key]}\n`;
        }
        if (obj2[key] !== undefined) {
          acc += `+ ${key} = ${obj2[key]}\n`;
        }
      }
      return acc;
    }, '{\n')
    .concat('}\n');
  return diff;
};

const gendiff = (file1, file2) => {
  const firstObject = parse(file1);
  const secondObject = parse(file2);
  const diff = compare(firstObject, secondObject);
  return diff;
};

export default gendiff;
