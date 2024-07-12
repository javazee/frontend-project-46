import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import path from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('gendiff test', () => {
  const testForFormat = ((format) => {
    const expected = readFileSync(`__fixtures__/comparison12_${format}.txt`, { encoding: 'utf8', flag: 'r' });

    const json1 = '__fixtures__/file1.json';
    const json2 = '__fixtures__/file2.json';
    const yml1 = '__fixtures__/file1.yml';
    const yml2 = '__fixtures__/file2.yml';
    const fullPathJson = path.join(__dirname, '..', '__fixtures__/file1.json');

    expect(gendiff(json1, json2, `${format}`)).toEqual(expected);
    expect(gendiff(yml1, yml2, `${format}`)).toEqual(expected);
    expect(gendiff(yml1, json2, `${format}`)).toEqual(expected);
    expect(gendiff(fullPathJson, json2, `${format}`)).toEqual(expected);
  });

  test('gendiff stylish', () => testForFormat('stylish'));
  test('gendiff plain', () => testForFormat('plain'));
  test('gendiff json', () => testForFormat('json'));
});

test('gendiff if only one file exists', () => {
  const expected = readFileSync('__fixtures__/comparisonToUnexisted_stylish.txt', { encoding: 'utf8', flag: 'r' });

  const existed = '__fixtures__/file1.json';
  const unexisted = '__fixtures__/unexisted.json';
  expect(gendiff(existed, unexisted, 'stylish')).toEqual(expected);
});

test('gendiff with unknown formatter', () => {
  const json = '__fixtures__/file1.json';
  expect(() => gendiff(json, json, 'unknown')).toThrow("Format unknown is not supported. Possible formats: 'stylish', 'plain'");
});
