#!/usr/bin/env node
import { gendiff } from '../src/gendiff.js';
import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format')
  .argument('<first-file-path>', 'path to first file')
  .argument('<second-file-path>', 'path to second file')
  .action((filePath1, filePath2) => {
    gendiff(filePath1, filePath2);
  });

program.parse();