/* eslint no-use-before-define: 0 */
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

const compareOne = (obj, currentTab, deep) => {
  const {
    key, oldValue, value, result,
  } = obj;
  switch (result) {
    case 'added':
      return `${currentTab}${plus}${key}: ${toString(value, deep)}`;
    case 'deleted':
      return `${currentTab}${sub}${key}: ${toString(value, deep)}`;
    case 'unchanged':
      return `${currentTab}${eq}${key}: ${toString(value, deep)}`;
    case 'changed':
      return `${currentTab}${sub}${key}: ${toString(oldValue, deep)}\n${currentTab}${plus}${key}: ${toString(value, deep)}`;
    case 'hasInner':
      return `${currentTab}${eq}${key}: ${iter(value, deep)}`;
    default:
      throw new Error('unknown type for comparison result');
  }
};

const iter = (obj, deep) => {
  const currentTab = tab.repeat(deep);
  const currentDeep = deep + 1;
  const comparisonResult = obj.flatMap((objInner) => compareOne(objInner, currentTab, currentDeep));
  return `{\n${comparisonResult.join('\n')}\n${currentTab}}`;
};

const toStylish = (data) => iter(data, 0);

export default toStylish;
