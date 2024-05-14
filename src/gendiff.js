import { Command } from 'commander';

const gendiff = (file1, file2) => {
    const program = new Command();

    program
        .name('gendiff')
        .description('Compares two configuration files and shows a difference')
        .version('1.0.0');

    program.parse();
    console.log('No differences for a while. Code is in development');
};

export {
    gendiff
};