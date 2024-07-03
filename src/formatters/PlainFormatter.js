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

const toPlain = (data) => {
  const iter = (obj, path) => Object.values(obj).flatMap(({
    key, oldValue, value, result,
  }) => {
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
        return '';
    }
  }).filter((item) => item !== undefined).join('\n');
  return iter(data, '');
};

export default toPlain;
