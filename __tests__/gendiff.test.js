import { join } from 'path';
import { readFileSync } from 'node:fs';
import gendiff from '../src/gendiff.js';

test('gendiff stylish', () => {
  const expected = readFileSync('__fixtures__/comparison12_stylish.txt', { encoding: 'utf8', flag: 'r' });

  const json1 = '__fixtures__/file1.json';
  const json2 = '__fixtures__/file2.json';
  const yml1 = '__fixtures__/file1.yml';
  const yml2 = '__fixtures__/file2.yml';
  const fullPathJson = join(__dirname, '..', '__fixtures__/file1.json');

  expect(gendiff(json1, json2, 'stylish')).toEqual(expected);
  expect(gendiff(yml1, yml2, 'stylish')).toEqual(expected);
  expect(gendiff(yml1, json2, 'stylish')).toEqual(expected);
  expect(gendiff(fullPathJson, json2, 'stylish')).toEqual(expected);
});

test('gendiff plain', () => {
  const expected = readFileSync('__fixtures__/comparison12_plain.txt', { encoding: 'utf8', flag: 'r' });

  const json1 = '__fixtures__/file1.json';
  const json2 = '__fixtures__/file2.json';
  const yml1 = '__fixtures__/file1.yml';
  const yml2 = '__fixtures__/file2.yml';
  const fullPathJson = join(__dirname, '..', '__fixtures__/file1.json');

  expect(gendiff(json1, json2, 'plain')).toEqual(expected);
  expect(gendiff(yml1, yml2, 'plain')).toEqual(expected);
  expect(gendiff(yml1, json2, 'plain')).toEqual(expected);
  expect(gendiff(fullPathJson, json2, 'plain')).toEqual(expected);
});

test('gendiff if only one file exists', () => {
  const expected = readFileSync('__fixtures__/comparisonToUnexisted_stylish.txt', { encoding: 'utf8', flag: 'r' });

  const existed = '__fixtures__/file1.json';
  const unexisted = '__fixtures__/unexisted.json';
  expect(gendiff(existed, unexisted, 'stylish')).toEqual(expected);
});

test('gendiff with unknown formatter', () => {
  const expected = readFileSync('__fixtures__/comparisonToUnexisted_stylish.txt', { encoding: 'utf8', flag: 'r' });

  const existed = '__fixtures__/file1.json';
  const unexisted = '__fixtures__/unexisted.json';
  expect(() => gendiff(existed, unexisted, 'unknown')).toThrow("Format 'unknown' is not supported. Possible formats: 'stylish', 'plain'")
});
