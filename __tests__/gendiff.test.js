import { join } from 'path';
import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const expected = readFileSync('__fixtures__/comparison12.txt', { encoding: 'utf8', flag: 'r' });

  const json1 = '__fixtures__/file1.json';
  const json2 = '__fixtures__/file2.json';
  const yml1 = '__fixtures__/file1.yml';
  const yml2 = '__fixtures__/file2.yml';
  const fullPathJson = join(__dirname, '..', '__fixtures__/file1.json');

  expect(gendiff(json1, json2)).toEqual(expected);
  expect(gendiff(yml1, yml2)).toEqual(expected);
  expect(gendiff(yml1, json2)).toEqual(expected);
  expect(gendiff(fullPathJson, json2)).toEqual(expected);
});

test('gendiff if only one file exists', () => {
  const expected = readFileSync('__fixtures__/comparisonToUnexisted.txt', { encoding: 'utf8', flag: 'r' });

  const existed = '__fixtures__/file1.json';
  const unexisted = '__fixtures__/unexisted.json';
  expect(gendiff(existed, unexisted)).toEqual(expected);
});
