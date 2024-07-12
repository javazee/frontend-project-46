/* eslint no-use-before-define: 0 */
import _ from 'lodash';

const toString = (data) => {
  if (_.isObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return data;
};

const compareOne = (obj, path) => {
  const {
    key, oldValue, value, result,
  } = obj;
  const newPath = path === '' ? `${key}` : `${path}.${key}`;
  switch (result) {
    case 'added':
      return `Property '${newPath}' was added with value: ${toString(value)}`;
    case 'deleted':
      return `Property '${newPath}' was removed`;
    case 'changed':
      return `Property '${newPath}' was updated. From ${toString(oldValue)} to ${toString(value)}`;
    case 'unchanged':
      return [];
    case 'hasInner':
      return iter(value, newPath);
    default:
      throw new Error('unknown type for comparison result');
  }
};

const iter = (obj, path) => Object.values(obj)
  .flatMap((innerObj) => compareOne(innerObj, path))
  .filter((item) => item !== undefined).join('\n');

const toPlain = (data) => iter(data, '');

export default toPlain;
