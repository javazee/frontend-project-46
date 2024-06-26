import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import pkg from 'yaml-js';

const { load: loadYaml } = pkg;

const parse = (path) => {
  const filePath = resolve(cwd(), path);
  if (!existsSync(path)) {
    return {};
  }
  const fileData = readFileSync(filePath);
  const type = extname(path);
  if (type === '.json') {
    return JSON.parse(fileData);
  } if (type === '.yaml' || type === '.yml') {
    return loadYaml(fileData);
  }
  return {};
};

export default parse;
