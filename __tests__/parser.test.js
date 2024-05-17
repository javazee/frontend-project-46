import { readFileSync } from 'node:fs';
import { load } from 'yaml-js';
import { join } from 'path';
import parse from '../src/parser.js';

test('parse json', () => {
  const file = '__fixtures__/file1.json';
  const path = join(__dirname, '..', file);
  const expected = JSON.parse(readFileSync(path));
  expect(parse(file)).toEqual(expected);
  expect(parse('non-existed.file')).toEqual({});
});

test('parse yml', () => {
  const file = '__fixtures__/file1.yml';
  const path = join(__dirname, '..', file);
  const expected = load(readFileSync(path));
  expect(parse(file)).toEqual(expected);
  expect(parse('non-existed.file')).toEqual({});
});

test('parse txt', () => {
  const file = '__fixtures__/file.txt';
  expect(parse(file)).toEqual({});
});
