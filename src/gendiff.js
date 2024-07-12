import _ from 'lodash';

const compare = (obj1, obj2) => {
  const uniqKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return uniqKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!Object.hasOwn(obj1, key)) {
      return { key, value: value2, result: 'added' };
    } if (!Object.hasOwn(obj2, key)) {
      return { key, value: value1, result: 'deleted' };
    } if (value1 === value2) {
      return { key, value: value1, result: 'unchanged' };
    } if (typeof value1 === 'object' && typeof value2 === 'object') {
      return { key, value: compare(value1, value2), result: 'hasInner' };
    }
    return {
      key,
      oldValue: value1,
      value: value2,
      result: 'changed',
    };
  });
};

export default compare;
