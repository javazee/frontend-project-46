import { cwd } from 'node:process';
import { resolve, extname } from 'node:path';
import { readFileSync, existsSync } from 'node:fs';
import parse from './parser.js';
import compare from './gendiff.js';
import toString from './formatters/index.js';

const readfile = (path) => {
  const filePath = resolve(cwd(), path);
  if (!existsSync(filePath)) {
    return {};
  }
  const data = readFileSync(filePath, 'utf-8');
  const type = extname(filePath);
  return parse(data, type);
};

const gendiff = (file1, file2, format = 'stylish') => {
  const firstObject = readfile(file1);
  const secondObject = readfile(file2);
  const diff = compare(firstObject, secondObject);
  return toString(diff, format);
};

export default gendiff;
