import pkg from 'yaml-js';

const { load: loadYaml } = pkg;

const parse = (fileData, type) => {
  if (type === '.json') {
    return JSON.parse(fileData);
  } if (type === '.yaml' || type === '.yml') {
    return loadYaml(fileData);
  }
  return {};
};

export default parse;
