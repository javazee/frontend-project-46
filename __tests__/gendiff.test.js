import { join } from 'path';
import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const expected = `{
- follow = false
  host = hexlet.io
- proxy = 123.234.53.22
- timeout = 50
+ timeout = 20
+ verbose = true
}
`;

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
  const expected = `{
- follow = false
- host = hexlet.io
- proxy = 123.234.53.22
- timeout = 50
}
`;

  const existed = '__fixtures__/file1.json';
  const unexisted = '__fixtures__/unexisted.json';
  expect(gendiff(existed, unexisted)).toEqual(expected);
});
