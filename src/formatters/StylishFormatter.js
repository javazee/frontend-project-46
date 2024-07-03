import _ from 'lodash';

const tab = '    ';
const eq = tab;
const sub = '  - ';
const plus = '  + ';

const toString = (data, deep) => {
  if (_.isObject(data)) {
    const currentTab = tab.repeat(deep);
    const strings = Object.entries(data).map(([key, value]) => `${currentTab}${tab}${key}: ${toString(value, deep + 1)}`);
    return `{\n${strings.join('\n')}\n${currentTab}}`;
  }
  return `${data}`;
};

const toStylish = (data) => {
  const iter = (obj, deep) => {
    const currentTab = tab.repeat(deep);
    const currentDeep = deep + 1;
    const comparisonResult = obj.flatMap(({
      key, oldValue, value, result,
    }) => {
      switch (result) {
        case 'added':
          return `${currentTab}${plus}${key}: ${toString(value, currentDeep)}`;
        case 'deleted':
          return `${currentTab}${sub}${key}: ${toString(value, currentDeep)}`;
        case 'unchanged':
          return `${currentTab}${eq}${key}: ${toString(value, currentDeep)}`;
        case 'changed':
          const added = `${currentTab}${sub}${key}: ${toString(oldValue, currentDeep)}`;
          const deleted = `${currentTab}${plus}${key}: ${toString(value, currentDeep)}`;
          return `${added}\n${deleted}`;
        case 'hasInner':
          return `${currentTab}${eq}${key}: ${iter(value, currentDeep)}`;
        default:
          return '';
      }
    });
    return `{\n${comparisonResult.join('\n')}\n${currentTab}}`;
  };
  return iter(data, 0);
};

export default toStylish;