/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import parse from './parser.js';

const SPACE = '    ';
const EQUAL = '    ';
const SUBSTRACT = '  - ';
const PLUS = '  + ';

const compare = (obj1, obj2, format, deep = 0) => {
  const uniqKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const diff = uniqKeys.sort(((a, b) => a.localeCompare(b)))
    .reduce((acc, key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (isObject(value1) && isObject(value2)) {
        acc += `${SPACE.repeat(deep)}${EQUAL}${key}: ${compare(value1, value2, format, deep + 1)}\n`;
      } else if (isObject(obj1[key]) && !isObject(obj2[key])) {
        acc += `${SPACE.repeat(deep)}${SUBSTRACT}${key}: ${stringify(value1, deep + 1)}`;
        if (value2 !== undefined) {
          acc += `${SPACE.repeat(deep)}${PLUS}${key}: ${value2}\n`;
        }
      } else if (!isObject(obj1[key]) && isObject(obj2[key])) {
        acc += `${SPACE.repeat(deep)}${PLUS}${key}: ${stringify(value2, deep + 1)}`;
        if (value1 !== undefined) {
          acc += `${SPACE.repeat(deep)}${SUBSTRACT}${key}: ${value1}\n`;
        }
      } else if (obj1[key] === obj2[key]) {
        acc += `${SPACE.repeat(deep)}${EQUAL}${key}: ${value1}\n`;
      } else {
        if (value1 !== undefined) {
          acc += `${SPACE.repeat(deep)}${SUBSTRACT}${key}: ${value1}\n`;
        }
        if (value2 !== undefined) {
          acc += `${SPACE.repeat(deep)}${PLUS}${key}: ${value2}\n`;
        }
      }
      return acc;
    }, '{\n')
    .concat(`${SPACE.repeat(deep)}}`);
  return diff;
};

const gendiff = (file1, file2, format) => {
  const firstObject = parse(file1);
  const secondObject = parse(file2);
  const diff = compare(firstObject, secondObject, format);
  return diff;
};

const isObject = (obj) => obj !== undefined && obj !== null && typeof obj === 'object';

const stringify = (obj, deep) => Object.keys(obj)
  .sort((a, b) => a.localeCompare(b))
  .reduce((acc, key) => {
    if (isObject(obj[key])) {
      acc += `${SPACE.repeat(deep)}${EQUAL}${key}: ${stringify(obj[key], deep + 1)}`;
    } else {
      acc += `${SPACE.repeat(deep)}${EQUAL}${key}: ${obj[key]}\n`;
    }
    return acc;
  }, '{\n').concat(`${SPACE.repeat(deep)}}\n`);

export default gendiff;
